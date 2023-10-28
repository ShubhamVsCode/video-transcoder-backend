import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Router } from "express";
import dotenv from "dotenv";
dotenv.config();

const uploadRouter = Router();

const s3Client = new S3Client({
  region: "ap-south-1",
  // IAM USER - video-transcoder-iam
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function getObjectURL(objectKey) {
  const command = new GetObjectCommand({
    Bucket: "video-transcoder-bucket",
    Key: objectKey,
  });
  console.log(command);

  const url = await getSignedUrl(s3Client, command);
  console.log(url);
  return url;
}

async function putObjectURL(objectKey) {
  const command = new PutObjectCommand({
    Bucket: "video-transcoder-bucket",
    Key: objectKey,
  });
  const url = await getSignedUrl(s3Client, command);
  console.log(url);
  return url;
}

uploadRouter.post("/file", async (req, res) => {
  const objectKey = req.body.objectKey;
  const url = await putObjectURL(objectKey);

  res.json({ url });
});

export default uploadRouter;
