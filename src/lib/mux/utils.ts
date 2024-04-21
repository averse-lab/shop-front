"server-only";

import { getPlaceholder } from "@lib/server-utils";

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

export const getMuxPlaceholder: (
  params: GetPlaceholderParams,
) => Promise<string> = async (params) => {
  const { playbackId, width } = params;

  const arrayBufferThumbnail = await getMuxThumbnail(playbackId);

  return await getPlaceholder({
    arrayBufferSource: arrayBufferThumbnail,
    width,
  });
};
