"use client";

import { FC, lazy, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { clsx } from "clsx";

const MuxVideo = lazy(() => import("@mux/mux-video-react"));

interface IProps {
  className?: string;
  playbackId: string;
  placeholder: string;
}

export const VideoPlayer: FC<IProps> = (props) => {
  const { className, playbackId, placeholder } = props;

  const [canPlay, setCanPlay] = useState(false);

  const unblurVideoPlayer = () => {
    setCanPlay(true);
  };

  const backgroundImageSVG = (
    <svg
      style={{
        height: "100%",
        width: "100%",
      }}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <filter
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
        id='blur'
      >
        <feGaussianBlur edgeMode='duplicate' stdDeviation='20 20' />
        <feComponentTransfer>
          <feFuncA tableValues='1 1' type='discrete' />
        </feComponentTransfer>
      </filter>
      <image
        filter='url(#blur)'
        height='100%'
        preserveAspectRatio='xMidYMid slice'
        width='100%'
        x={0}
        xlinkHref={placeholder}
        y={0}
      />
    </svg>
  );

  return (
    <div
      className={clsx(className, "bg-cover bg-center bg-no-repeat")}
      style={{
        backgroundImage: `url('data:image/svg+xml;charset=utf-8,${encodeURIComponent(renderToStaticMarkup(backgroundImageSVG))}')`,
      }}
    >
      <MuxVideo
        autoPlay='muted'
        className={clsx(
          "h-full w-full",
          "object-cover object-center blur-[20px]",
          canPlay && "animate-unblur",
        )}
        controls={false}
        loop
        onCanPlay={unblurVideoPlayer}
        playbackId={playbackId}
        playsInline
        streamType='on-demand'
      />
    </div>
  );
};
