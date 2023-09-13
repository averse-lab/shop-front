'use client'

import MuxPlayer from '@mux/mux-player-react'
import { FC, useEffect, useRef } from 'react'
import style from '@averse/styles/VideoPlayer.module.scss'

interface Prop {
  className: string
  playbackId: string
  fullscreen?: boolean
}

const VideoPlayer: FC<Prop> = ({ playbackId, className, fullscreen }) => {
  const playerRef = useRef(null)

  return (
    <div className={className}>
      <MuxPlayer
        ref={playerRef}
        className={fullscreen ? style.fullWidthPlayer : style.player}
        streamType="on-demand"
        autoPlay="muted"
        playbackId={playbackId}
        nohotkeys
        loop
      />
    </div>
  )
}

export default VideoPlayer
