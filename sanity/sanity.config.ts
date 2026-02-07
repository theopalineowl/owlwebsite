import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "opaline-owl",
  title: "The Opaline Owl",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.listItem()
              .title("Blog Posts")
              .child(S.documentTypeList("post").title("Blog Posts")),
            S.listItem()
              .title("Book Reviews")
              .child(S.documentTypeList("review").title("Book Reviews")),
          ]),
    }),
    // Optional: add visionTool() and install @sanity/vision for GROQ playground
  ],
  schema: { types: schemaTypes },
});
