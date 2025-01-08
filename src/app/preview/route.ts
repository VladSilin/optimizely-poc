import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { gql } from "@apollo/client/core";

import { apolloConfig } from "@/app/lib/apollo-client";

type ContentMetadata = {
  contentType?: string;
  url?: string;
};

async function getContentMetadata(
  previewToken?: string,
  key?: string,
  version?: string
): Promise<ContentMetadata> {
  const ContentType = gql`
    query getContentType($key: String!, $version: String) {
      content: _Content(
        where: {
          _or: [{ _metadata: { key: { eq: $key }, version: { eq: $version } } }]
        }
      ) {
        total
        items {
          _metadata {
            types
            url {
              hierarchical
            }
          }
        }
      }
    }
  `;

  const { data, error } = await apolloConfig(previewToken).query({
    query: ContentType,
    variables: { key, version },
  });

  if (error) {
    return {};
  }

  const metadata = data?.content?.items[0]._metadata;
  const contentTypes = metadata.types;

  // Get the concrete content type
  const contentType = contentTypes.find((t: string) => !t.startsWith("_"));
  const url = metadata?.url?.hierarchical;

  return { contentType, url };
}

type ContentURLParams = {
  key?: string;
  version?: string;
  previewToken?: string;
};

function getContentURLParams(request: Request): ContentURLParams {
  let key;
  let version;
  let previewToken;
  if (request.url.indexOf("/preview?key")) {
    const url = new URL(request.url);

    try {
      const urlPreviewToken = url.searchParams.get("preview_token");
      if (urlPreviewToken) {
        previewToken = urlPreviewToken;
      }
    } catch {
      previewToken = undefined;
    }

    try {
      const urlKey = url.searchParams.get("key");
      if (urlKey) {
        key = urlKey;
      }
    } catch {
      key = undefined;
    }

    try {
      const urlVer = url.searchParams.get("ver");
      if (urlVer) {
        version = urlVer;
      }
    } catch {
      version = undefined;
    }
  }

  return { previewToken, key, version };
}

type PathMap = {
  [key: string]: string;
};

export async function GET(request: Request) {
  const { previewToken, key, version } = getContentURLParams(request);

  const contentMetadata = await getContentMetadata(previewToken, key, version);
  const path = contentMetadata.url || "/";

  draftMode().enable();
  const cookieStore = cookies();
  const cookie = cookieStore.get("__prerender_bypass")!;

  // NOTE: If the preview environment is served in a public-facing manner,
  // a check like this is necessary to avoid exposing preview mode
  //const isRequestValid = secret === process.env.DRAFT_SECRET_TOKEN;
  //if (!isRequestValid) {
  //  return new Response("Invalid request", { status: 401 });
  //}

  // Enable Draft Mode by setting the cookie
  cookies().set({
    name: "__prerender_bypass",
    value: cookie?.value,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "none",
  });

  // We want pattern-matching logic here to
  //   1. Determine the content that should be checked/retrieved based on the preview request
  //   2. Detemine which path is the corresponding redirect for this content
  //
  // (DO NOT redirect to values from searchParams due to open redirect vulnerability risk).
  //
  // If hosting the preview server on a C1-private non-prod URL, we may not need this logic
  // and could even enable "draft mode" elsewhere

  const redirectWithPreviewToken = (path: string) => {
    redirect(
      `${path}?preview_token=${previewToken}&key=${key}&version=${version}`
    );
  };

  const PATH_MAP: PathMap = {
    "/cards/": "/",
  };

  if (path in PATH_MAP) {
    redirectWithPreviewToken(PATH_MAP[path]);
  }

  redirectWithPreviewToken(path);
}
