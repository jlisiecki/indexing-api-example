import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  PORT: z.string().default("8080"),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
