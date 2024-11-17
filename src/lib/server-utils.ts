"server-only";

import sharp from "sharp";

type GetPlaceholderParams = {
  arrayBufferSource: ArrayBuffer;
  width: number;
};

export const getPlaceholder: (params: GetPlaceholderParams) => Promise<string> = async (params) => {
  const { arrayBufferSource, width } = params;

  const image = await sharp(arrayBufferSource)
    .resize({ width, fit: "inside" })
    .webp({
      quality: 40,
    })
    .toBuffer();

  return `data:image/webp;base64,${image.toString("base64")}`;
};
