"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, ShoppingCart } from "lucide-react"

interface Beat {
  id: number
  name: string
  genre: string
  bpm: number
  price: number
  audioUrl: string
}

const beats: Beat[] = [
  { id: 1, name: "Urban Groove", genre: "Hip Hop", bpm: 95, price: 29.99, audioUrl: "/beats/urban-groove.mp3" },
  { id: 2, name: "Electro Pulse", genre: "Electronic", bpm: 128, price: 34.99, audioUrl: "/beats/electro-pulse.mp3" },
  { id: 3, name: "Chill Wave", genre: "Lo-fi", bpm: 80, price: 24.99, audioUrl: "/beats/chill-wave.mp3" },
  { id: 4, name: "Trap Fusion", genre: "Trap", bpm: 140, price: 39.99, audioUrl: "/beats/trap-fusion.mp3" },
  { id: 5, name: "Smooth Jazz", genre: "Jazz", bpm: 90, price: 29.99, audioUrl: "/beats/smooth-jazz.mp3" },
  { id: 6, name: "Rock Anthem", genre: "Rock", bpm: 120, price: 34.99, audioUrl: "/beats/rock-anthem.mp3" },
]

export default function BeatsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("All")
  const [bpmRange, setBpmRange] = useState([0, 200])
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)

  const filteredBeats = beats.filter(
    (beat) =>
      beat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (genreFilter === "All" || beat.genre === genreFilter) &&
      beat.bpm >= bpmRange[0] &&
      beat.bpm <= bpmRange[1],
  )

  const genres = ["All", ...new Set(beats.map((beat) => beat.genre))]

  const togglePlay = (id: number) => {
    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null)
      // Stop the audio
    } else {
      setCurrentlyPlaying(id)
      // Play the audio
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Beat Marketplace</h1>

      <div className="mb-8 space-y-4">
        <Input
          type="text"
          placeholder="Search beats..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={genreFilter === genre ? "default" : "outline"}
              onClick={() => setGenreFilter(genre)}
            >
              {genre}
            </Button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            BPM Range: {bpmRange[0]} - {bpmRange[1]}
          </label>
          <Slider min={0} max={200} step={1} value={bpmRange} onValueChange={setBpmRange} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBeats.map((beat) => (
          <Card key={beat.id}>
            <CardHeader>
              <CardTitle>{beat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Genre: {beat.genre}</p>
              <p className="mb-2">BPM: {beat.bpm}</p>
              <p className="mb-4">Price: ${beat.price.toFixed(2)}</p>
              <div className="flex justify-between">
                <Button onClick={() => togglePlay(beat.id)}>
                  {currentlyPlaying === beat.id ? (
                    <Pause className="mr-2 h-4 w-4" />
                  ) : (
                    <Play className="mr-2 h-4 w-4" />
                  )}
                  {currentlyPlaying === beat.id ? "Pause" : "Play"}
                </Button>
                <Button>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

