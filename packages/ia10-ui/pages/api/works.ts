import { workContentsEndpoint } from "@/endpoints";
import { WorkData } from "@/view/works/state";
import type { NextApiRequest, NextApiResponse } from "next";

type DataInS3Object = { title: string; id: string };

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<WorkData[]>
) {
  const response = (await fetch(`${workContentsEndpoint}/works.json`).then(
    (r) => r.json()
  )) as DataInS3Object[];

  const works = response.map((data) => {
    return {
      title: data.title,
      thumbnailURI: `${workContentsEndpoint}/works/${data.id}/thumbnail.jpeg`,
      audioURI: `${workContentsEndpoint}/works/${data.id}/audio/audio.m3u8`,
    };
  });

  res.status(200).json(works);
}
