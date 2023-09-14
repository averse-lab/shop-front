"use client";

import VideoPlayer from "@averse/components/VideoPlayer";
import { FC, useEffect, useState } from "react";

interface IProps {
  animation: {
    name: string;
    playbackId: string;
  };
}

export const Animation: FC<IProps> = ({ animation }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (!isMobile) {
    return (
      <div className='relative border border-black overflow-hidden'>
        <VideoPlayer
          className='w-full h-full scale-105'
          playbackId={animation.playbackId}
        />
        {/*<h1>{animation.name}</h1>*/}
      </div>
    );
  }
};
