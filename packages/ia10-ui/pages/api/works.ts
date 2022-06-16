import { workContentsEndpoint } from "@/endpoints";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = Array<{ name: string; thumbnailURI: string; audioURI: string }>;

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = (await fetch(`${workContentsEndpoint}/works.json`).then(
    (r) => r.json()
  )) as Array<{ name: string; id: string }>;

  const works = response.map((data) => {
    return {
      name: data.name,
      thumbnailURI: `${workContentsEndpoint}/works/${data.id}/thumbnail.jpeg`,
      audioURI: `${workContentsEndpoint}/works/${data.id}/audio/audio.m3u8`,
    };
  });

  res.status(200).json(works);
}
