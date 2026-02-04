"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { AudioVisualizer } from "@/components/audio-visualizer"
import { PlayerControls } from "@/components/player-controls"
import { TrackList } from "@/components/track-list"

export default function AlgoRhythmDashboard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(75)
  const [activeTab, setActiveTab] = useState("home")
  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off")
  const [coinBalance] = useState(12450)

  const duration = 263 // 4:23 in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => Math.min(prev + 1, duration))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTime, duration])

  const handlePlayPause = () => setIsPlaying(!isPlaying)
  const handleSeek = (value: number[]) => setCurrentTime(value[0])
  const handleVolumeChange = (value: number[]) => setVolume(value[0])
  const handleShuffle = () => setIsShuffled(!isShuffled)
  const handleRepeat = () => {
    const modes: ("off" | "all" | "one")[] = ["off", "all", "one"]
    const currentIndex = modes.indexOf(repeatMode)
    setRepeatMode(modes[(currentIndex + 1) % 3])
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header coinBalance={coinBalance} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6 space-y-8">
            {/* Hero Section with Visualizer */}
            <section className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent rounded-3xl" />
              <div className="relative bg-card/30 border border-border rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  {/* Visualizer */}
                  <div className="relative w-full lg:w-1/2 aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
                    <AudioVisualizer isPlaying={isPlaying} />
                  </div>

                  {/* Now Playing Info */}
                  <div className="flex-1 text-center lg:text-left space-y-4">
                    <div>
                      <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
                        Now Playing
                      </p>
                      <h1 className="text-4xl lg:text-5xl font-bold text-foreground text-balance">
                        Neon Dreams
                      </h1>
                      <p className="text-xl text-muted-foreground mt-2">
                        Synthwave Collective
                      </p>
                    </div>
                    <p className="text-muted-foreground">
                      From the album <span className="text-foreground">Digital Horizon</span>
                    </p>
                    <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                      <span>2024</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span>Electronic</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span>2.4M plays</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Track List */}
            <TrackList />

            {/* Quick Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-1">Listening Time</p>
                <p className="text-3xl font-bold text-foreground">42<span className="text-lg text-muted-foreground">h</span></p>
                <p className="text-xs text-primary mt-2">+12% this week</p>
              </div>
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-1">Tracks Played</p>
                <p className="text-3xl font-bold text-foreground">847</p>
                <p className="text-xs text-primary mt-2">+156 this week</p>
              </div>
              <div className="bg-card/50 border border-border rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-1">Earned Coins</p>
                <p className="text-3xl font-bold text-primary">+2,450</p>
                <p className="text-xs text-muted-foreground mt-2">This month</p>
              </div>
            </section>
          </div>
        </main>
      </div>

      <PlayerControls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        onSeek={handleSeek}
        isShuffled={isShuffled}
        onShuffle={handleShuffle}
        repeatMode={repeatMode}
        onRepeat={handleRepeat}
      />
    </div>
  )
}
