import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

// Single Studio can serve both sites: add a second workspace with dataset "vscuk" when that build starts.
export default defineConfig({
  name: "governance",
  title: "Governance Ministries",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: "governance",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
