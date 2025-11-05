"use client"

import { useState } from "react"
import {
  Camera, Code, Film, Headphones, LineChart, Paintbrush, Shapes, Bot,
  Video, Image as ImageIcon, Music, Mic, Radio, Disc, Volume2,
  Palette, Brush, PenTool, Layers, Sparkles, Zap, Globe, Monitor,
  Smartphone, Tablet, Laptop, Server, Database, Cloud, Cpu, HardDrive,
  FileText, Folder, Upload, Download, Share2, Link2, Settings, Cog,
  BarChart3, TrendingUp, Users, User, Building, Briefcase, Mail, Phone,
  MessageSquare, Calendar, Clock, Timer, Star, Heart, ThumbsUp, Award,
  Target, Rocket, Lightbulb, Flame, Snowflake, Droplet, Sun, Moon
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search } from "lucide-react"

// Icon library - all available icons
const iconLibrary = [
  // Current icons in use
  { name: "Camera", icon: Camera, category: "Media" },
  { name: "Code", icon: Code, category: "Technology" },
  { name: "Film", icon: Film, category: "Media" },
  { name: "Headphones", icon: Headphones, category: "Audio" },
  { name: "LineChart", icon: LineChart, category: "Analytics" },
  { name: "Paintbrush", icon: Paintbrush, category: "Creative" },
  { name: "Shapes", icon: Shapes, category: "Creative" },
  { name: "Bot", icon: Bot, category: "Technology" },
  
  // Additional useful icons
  { name: "Video", icon: Video, category: "Media" },
  { name: "Image", icon: ImageIcon, category: "Media" },
  { name: "Music", icon: Music, category: "Audio" },
  { name: "Mic", icon: Mic, category: "Audio" },
  { name: "Radio", icon: Radio, category: "Audio" },
  { name: "Disc", icon: Disc, category: "Audio" },
  { name: "Volume2", icon: Volume2, category: "Audio" },
  { name: "Palette", icon: Palette, category: "Creative" },
  { name: "Brush", icon: Brush, category: "Creative" },
  { name: "PenTool", icon: PenTool, category: "Creative" },
  { name: "Layers", icon: Layers, category: "Creative" },
  { name: "Sparkles", icon: Sparkles, category: "Creative" },
  { name: "Zap", icon: Zap, category: "Technology" },
  { name: "Globe", icon: Globe, category: "Technology" },
  { name: "Monitor", icon: Monitor, category: "Technology" },
  { name: "Smartphone", icon: Smartphone, category: "Technology" },
  { name: "Tablet", icon: Tablet, category: "Technology" },
  { name: "Laptop", icon: Laptop, category: "Technology" },
  { name: "Server", icon: Server, category: "Technology" },
  { name: "Database", icon: Database, category: "Technology" },
  { name: "Cloud", icon: Cloud, category: "Technology" },
  { name: "Cpu", icon: Cpu, category: "Technology" },
  { name: "HardDrive", icon: HardDrive, category: "Technology" },
  { name: "FileText", icon: FileText, category: "Documents" },
  { name: "Folder", icon: Folder, category: "Documents" },
  { name: "Upload", icon: Upload, category: "Actions" },
  { name: "Download", icon: Download, category: "Actions" },
  { name: "Share2", icon: Share2, category: "Actions" },
  { name: "Link2", icon: Link2, category: "Actions" },
  { name: "Settings", icon: Settings, category: "Actions" },
  { name: "Cog", icon: Cog, category: "Actions" },
  { name: "BarChart3", icon: BarChart3, category: "Analytics" },
  { name: "TrendingUp", icon: TrendingUp, category: "Analytics" },
  { name: "Users", icon: Users, category: "Social" },
  { name: "User", icon: User, category: "Social" },
  { name: "Building", icon: Building, category: "Business" },
  { name: "Briefcase", icon: Briefcase, category: "Business" },
  { name: "Mail", icon: Mail, category: "Communication" },
  { name: "Phone", icon: Phone, category: "Communication" },
  { name: "MessageSquare", icon: MessageSquare, category: "Communication" },
  { name: "Calendar", icon: Calendar, category: "Time" },
  { name: "Clock", icon: Clock, category: "Time" },
  { name: "Timer", icon: Timer, category: "Time" },
  { name: "Star", icon: Star, category: "Symbols" },
  { name: "Heart", icon: Heart, category: "Symbols" },
  { name: "ThumbsUp", icon: ThumbsUp, category: "Symbols" },
  { name: "Award", icon: Award, category: "Symbols" },
  { name: "Target", icon: Target, category: "Symbols" },
  { name: "Rocket", icon: Rocket, category: "Symbols" },
  { name: "Lightbulb", icon: Lightbulb, category: "Symbols" },
  { name: "Flame", icon: Flame, category: "Symbols" },
  { name: "Snowflake", icon: Snowflake, category: "Symbols" },
  { name: "Droplet", icon: Droplet, category: "Symbols" },
  { name: "Sun", icon: Sun, category: "Symbols" },
  { name: "Moon", icon: Moon, category: "Symbols" },
]

// Helper function to get icon component by name
export function getIconByName(iconName: string) {
  const iconData = iconLibrary.find(icon => icon.name === iconName)
  return iconData?.icon || null
}

// Export icon names for reference
export const availableIcons = iconLibrary.map(icon => icon.name)

interface IconSelectorProps {
  selectedIcon?: string
  onSelect: (iconName: string) => void
  label?: string
}

export function IconSelector({ selectedIcon, onSelect, label = "Select Icon" }: IconSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(iconLibrary.map(icon => icon.category)))]

  const filteredIcons = iconLibrary.filter(icon => {
    const matchesSearch = icon.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || icon.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const selectedIconData = iconLibrary.find(icon => icon.name === selectedIcon)
  const SelectedIconComponent = selectedIconData?.icon

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedIcon && SelectedIconComponent ? (
              <>
                <SelectedIconComponent className="mr-2 h-4 w-4" />
                {selectedIcon}
              </>
            ) : (
              <>Select an icon...</>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Icon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>

            {/* Icon Grid */}
            <div className="grid grid-cols-6 md:grid-cols-8 gap-4">
              {filteredIcons.map(({ name, icon: IconComponent }) => (
                <Card
                  key={name}
                  className={`cursor-pointer transition-all hover:scale-110 ${
                    selectedIcon === name ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => {
                    onSelect(name)
                    setIsOpen(false)
                  }}
                >
                  <CardContent className="flex flex-col items-center justify-center p-4">
                    <IconComponent className="h-6 w-6 mb-2" />
                    <span className="text-xs text-center">{name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

