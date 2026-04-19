import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

let _writeClient: SanityClient | null = null;

/** Server-only. Requires `SANITY_API_WRITE_TOKEN` (token with create permissions). */
export function getSanityWriteClient(): SanityClient | null {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) return null;
  if (!_writeClient) {
    _writeClient = createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
    });
  }
  return _writeClient;
}
