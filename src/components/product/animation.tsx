import { CSSProperties, FC } from "react";

import { VideoPlayer } from "@components/VideoPlayer/VideoPlayer";

interface IProps {
  playbackId: string;
  aspectRatio: CSSProperties["aspectRatio"];
}

export const Animation: FC<IProps> = ({ playbackId, aspectRatio }) => {
  return (
    <div className='relative border border-black overflow-hidden'>
      <VideoPlayer
        className='w-full h-full scale-105'
        playbackId={playbackId}
        aspectRatio={aspectRatio}
      />
    </div>
  );
};
