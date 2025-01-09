import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env_Vars } from "../config/envVars.js";

const client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: env_Vars.ACCESSKEYID,
    secretAccessKey: env_Vars.SECRETACCESSKEY,
  },
});

export const getSignedUrlHandler = async (req, res) => {
  try {
    const { bucket, key } = req.body;
    console.log({ bucket, key });
    const getObjectParams = {
      Bucket: bucket,
      Key: key,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });

    res.status(200).json({
      url: url,
    });
  } catch (error) {
    console.error("Error generating GET signed URL:", error);
    res.status(500).json({
      error: "Failed to generate GET signed URL",
    });
  }
};

export const putSignedUrlHandler = async (req, res) => {
  try {
    const { bucket, key, contentType } = req.body;
    const putObjectParams = {
      Bucket: bucket,
      Key: key,
      ContentType: contentType,
    };
    const command = new PutObjectCommand(putObjectParams);
    const presignedUrl = await getSignedUrl(client, command, {
      expiresIn: 3600,
    });

    console.log({ presignedUrl });

    res.status(200).json({
      presignedUrl: presignedUrl,
    });
  } catch (error) {
    console.error("Error generating PUT signed URL:", error);
    res.status(500).json({
      error: "Failed to generate PUT signed URL",
    });
  }
};
