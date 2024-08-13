import z from "zod";

export const indexingApiRequestSchema = z.object({
  url: z.string(),
  type: z.enum(["URL_UPDATED", "URL_DELETED"]),
});

export type IndexingApiRequest = z.infer<typeof indexingApiRequestSchema>;
