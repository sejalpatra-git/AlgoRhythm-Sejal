"use client"

import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface PlayerControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
  currentTime: number
  duration: number
  volume: number
  onVolumeChange: (value: number[]) => void
  onSeek: (value: number[]) => void
  isShuffled: boolean
  onShuffle: () => void
  repeatMode: "off" | "all" | "one"
  onRepeat: () => void
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function PlayerControls({
  isPlaying,
  onPlayPause,
  currentTime,
  duration,
  volume,
  onVolumeChange,
  onSeek,
  isShuffled,
  onShuffle,
  repeatMode,
  onRepeat,
}: PlayerControlsProps) {
  return (
    <div className="w-full bg-card/80 backdrop-blur-xl border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs text-muted-foreground w-10 text-right font-mono">
            {formatTime(currentTime)}
          </span>
          <Slider
            value={[currentTime]}
            max={duration}
            step={1}
            onValueChange={onSeek}
            className="flex-1 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_[role=slider]]:shadow-[0_0_10px_rgba(0,255,178,0.5)] [&_.relative]:bg-muted [&_[data-orientation=horizontal]>div:first-child]:bg-primary"
          />
          <span className="text-xs text-muted-foreground w-10 font-mono">
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          {/* Now Playing */}
          <div className="flex items-center gap-4 flex-1">
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-primary/30 animate-pulse" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Neon Dreams</h4>
              <p className="text-sm text-muted-foreground">Synthwave Collective</p>
            </div>
          </div>

          {/* Main Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 ${isShuffled ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              onClick={onShuffle}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:text-foreground"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              onClick={onPlayPause}
              size="icon"
              className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(0,255,178,0.4)] hover:shadow-[0_0_40px_rgba(0,255,178,0.6)] transition-all duration-300"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:text-foreground"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 ${repeatMode !== "off" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
              onClick={onRepeat}
            >
              <Repeat className="h-4 w-4" />
              {repeatMode === "one" && (
                <span className="absolute text-[10px] font-bold">1</span>
              )}
            </Button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3 flex-1 justify-end">
            <Volume2 className="h-5 w-5 text-muted-foreground" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={onVolumeChange}
              className="w-28 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_.relative]:bg-muted [&_[data-orientation=horizontal]>div:first-child]:bg-primary"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
