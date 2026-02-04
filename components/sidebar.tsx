"use client"

import { Home, Library, Heart, Clock, ListMusic, Radio, Mic2, Disc3 } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "library", label: "Library", icon: Library },
  { id: "liked", label: "Liked Songs", icon: Heart },
  { id: "recent", label: "Recently Played", icon: Clock },
]

const playlistItems = [
  { id: "playlist-1", label: "Synthwave Nights", icon: ListMusic },
  { id: "playlist-2", label: "Lo-Fi Focus", icon: ListMusic },
  { id: "playlist-3", label: "Electronic Beats", icon: ListMusic },
]

const browseItems = [
  { id: "radio", label: "Radio", icon: Radio },
  { id: "podcasts", label: "Podcasts", icon: Mic2 },
  { id: "new-releases", label: "New Releases", icon: Disc3 },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-border bg-sidebar h-full flex flex-col">
      <div className="flex-1 overflow-y-auto py-4">
        {/* Main Menu */}
        <nav className="px-3 mb-6">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Menu
          </p>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    activeTab === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Playlists */}
        <nav className="px-3 mb-6">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Playlists
          </p>
          <ul className="space-y-1">
            {playlistItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    activeTab === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Browse */}
        <nav className="px-3">
          <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Browse
          </p>
          <ul className="space-y-1">
            {browseItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                    activeTab === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Storage indicator */}
      <div className="p-4 border-t border-border">
        <div className="p-3 rounded-lg bg-secondary/30">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground">Storage Used</span>
            <span className="text-foreground font-medium">2.4 GB / 5 GB</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full w-[48%] bg-gradient-to-r from-primary to-primary/70 rounded-full" />
          </div>
        </div>
      </div>
    </aside>
  )
}
