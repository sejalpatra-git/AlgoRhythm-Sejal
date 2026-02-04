"use client"

import { Play, MoreHorizontal, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  plays: string
}

const tracks: Track[] = [
  { id: "1", title: "Neon Dreams", artist: "Synthwave Collective", album: "Digital Horizon", duration: "4:23", plays: "2.4M" },
  { id: "2", title: "Midnight Protocol", artist: "Cyber Pulse", album: "Code Runner", duration: "3:58", plays: "1.8M" },
  { id: "3", title: "Electric Sunrise", artist: "The Algorithm", album: "Binary Sunset", duration: "5:12", plays: "3.1M" },
  { id: "4", title: "Data Flow", artist: "Neon Bytes", album: "System Override", duration: "4:45", plays: "956K" },
  { id: "5", title: "Quantum Loop", artist: "Digital Dreams", album: "Infinite Loop", duration: "3:34", plays: "1.2M" },
]

export function TrackList() {
  return (
    <div className="bg-card/50 rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">Trending Now</h3>
        <p className="text-sm text-muted-foreground">Most played tracks this week</p>
      </div>
      <div className="divide-y divide-border">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="flex items-center gap-4 px-4 py-3 hover:bg-secondary/30 transition-colors group"
          >
            <span className="w-6 text-center text-sm text-muted-foreground group-hover:hidden">
              {index + 1}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 hidden group-hover:flex text-primary"
            >
              <Play className="h-4 w-4" />
            </Button>
            <div className="w-10 h-10 rounded bg-gradient-to-br from-primary/20 to-chart-3/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-primary/40" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{track.title}</p>
              <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
            </div>
            <span className="text-sm text-muted-foreground hidden md:block">{track.album}</span>
            <span className="text-sm text-muted-foreground w-16 text-right">{track.plays}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100">
              <Heart className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground w-12 text-right">{track.duration}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
