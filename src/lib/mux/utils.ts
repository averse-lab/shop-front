"server-only";

import sharp from "sharp";

const getMuxThumbnail = async (playbackId: string): Promise<ArrayBuffer> => {
  const url = `https://image.mux.com/${playbackId}/thumbnail.png?time=0`;

  const response = await fetch(url);

  if (response.status === 403) {
    throw new Error(`Error fetching thumbnail. 403: Forbidden`);
  } else if (response.status >= 400) {
    throw new Error(
      `Error fetching thumbnail. ${response.status}: ${response.statusText}`,
    );
  }

  return await response.arrayBuffer();
};

type GetPlaceholderParams = {
  playbackId: string;
  width: number;
};

export const getPlaceholder: (
  params: GetPlaceholderParams,
) => Promise<string> = async (params) => {
  const { playbackId, width } = params;

  const arrayBufferThumbnail = await getMuxThumbnail(playbackId);

  const image = await sharp(arrayBufferThumbnail)
    .resize({ width, fit: "inside" })
    .webp({
      quality: 40,
    })
    .toBuffer();

  return `data:image/webp;base64,${image.toString("base64")}`;
};
