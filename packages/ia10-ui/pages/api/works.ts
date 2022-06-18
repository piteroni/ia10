import { workContentsEndpoint } from "@/endpoints";
import { WorkData } from "@/view/Top/state";
import type { NextApiRequest, NextApiResponse } from "next";

type DataInS3Object = Array<{ name: string; id: string; duration: number }>;

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<WorkData[]>
) {
  const response = (await fetch(`${workContentsEndpoint}/works.json`).then(
    (r) => r.json()
  )) as DataInS3Object;

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
