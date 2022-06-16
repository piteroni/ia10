import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const s3 = new S3();

  // const { $response } = await s3
  //   .listObjectsV2({ Bucket: process.env.BUCKET_NAME! })
  //   .promise();

  res.status(200).json("");
}
