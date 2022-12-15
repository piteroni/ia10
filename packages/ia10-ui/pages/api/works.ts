import { WorkData } from "@/components/pages/top/state";
import { workContentsEndpoint } from "@/endpoints";
import type { NextApiRequest, NextApiResponse } from "next";

type DataInS3Object = Array<{ name: string; id: string; duration: number }>;

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<WorkData[]>
) {
  const response = await fetch(`${workContentsEndpoint}/works.json`)
    .then((response) => response.json() as unknown as DataInS3Object)
    .catch((e) => {
      throw new Error(`failed fatch works.json, reason = ${e}`);
    });

  const works = response.map((data) => {
    return {
      title: data.name,
      duration: data.duration,
      thumbnailURL: `${workContentsEndpoint}/works/${data.id}/thumbnail.jpeg`,
      audioURL: `${workContentsEndpoint}/works/${data.id}/audio/audio.m3u8`,
    };
  });

  res.status(200).json(works);
}
