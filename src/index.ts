import fs from "fs";
import { type IndexingApiResponse, type ServiceAccount } from "@/types";
import axios, { type AxiosError } from "axios";
import express from "express";
import { type Credentials } from "google-auth-library";
import { google } from "googleapis";
import { type ZodError } from "zod";
import { env } from "./env";
import {
  indexingApiRequestSchema,
  type IndexingApiRequest,
} from "./lib/schema";

const app = express();

const key = JSON.parse(
  fs.readFileSync("./service_account.json", "utf-8"),
) as ServiceAccount;

const jwtClient = new google.auth.JWT(
  key.client_email,
  undefined,
  key.private_key,
  ["https://www.googleapis.com/auth/indexing"],
  undefined,
);

app.use(express.static("public"));

app.use(express.json());

app.post("/api/send", (req, res) => {
  let requestBody: IndexingApiRequest;
  try {
    requestBody = indexingApiRequestSchema.parse(req.body);
  } catch (err) {
    return res
      .status(400)
      .json({ error: (err as ZodError<IndexingApiRequest>).errors });
  }

  const { url, type } = requestBody;

  (async () => {
    const credentials: Credentials = await new Promise((resolve, reject) => {
      jwtClient.authorize((err, credentials) => {
        if (err || !credentials)
          return reject(new Error("Something went wrong!"));
        resolve(credentials);
      });
    });

    const { data } = await axios.post<IndexingApiResponse>(
      "https://indexing.googleapis.com/v3/urlNotifications:publish",
      { url, type },
      {
        headers: {
          Authorization: `Bearer ${credentials.access_token}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.json(data);
  })().catch((error: AxiosError) => {
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { error: "Something went wrong!" });
  });
});

app.listen(env.PORT, () => {
  console.log(`Example app listening at http://127.0.0.1:${env.PORT}`);
});
