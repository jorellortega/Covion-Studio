"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { getIconByName } from "@/components/icon-selector"
import { Loader2 } from "lucide-react"

interface HomepageCard {
  id: string
  title: string
  description?: string
  icon_type?: string
  icon_url?: string
  thumbnail_url?: string
  department_slug?: string
  status: string
  sort_order?: number
  gradient_colors?: string[]
}

export function DepartmentGrid() {
  const [cards, setCards] = useState<HomepageCard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_cards')
        .select('*')
        .in('status', ['active', 'coming_soon'])
        .order('sort_order', { ascending: true })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('=== HOMEPAGE CARDS DEBUG ===')
      console.log('Total cards fetched:', data?.length || 0)
      if (data && data.length > 0) {
        data.forEach((card, index) => {
          console.log(`\nCard ${index + 1}:`, {
            id: card.id,
            title: card.title,
            icon_type: card.icon_type,
            icon_url: card.icon_url,
            thumbnail_url: card.thumbnail_url,
            department_slug: card.department_slug,
            status: card.status,
            has_icon_url: !!card.icon_url,
            has_thumbnail_url: !!card.thumbnail_url,
            icon_url_length: card.icon_url?.length || 0,
            thumbnail_url_length: card.thumbnail_url?.length || 0
          })
        })
      }
      console.log('=== END DEBUG ===')
      setCards(data || [])
    } catch (error) {
      console.error('Error fetching homepage cards:', error)
    } finally {
      setLoading(false)
    }
  }

  const getGradientClass = (colors?: string[]) => {
    if (colors && colors.length >= 2) {
      return `from-${colors[0]} to-${colors[1]}`
    }
    // Default gradient if no colors specified
    return "from-blue-500 to-purple-500"
  }

  const getGradientStyle = (colors?: string[]) => {
    if (colors && colors.length >= 2) {
      // If colors are hex/rgb values, use them directly
      // If they're Tailwind class names, we'll use a default gradient
      const color1 = colors[0].startsWith('#') || colors[0].startsWith('rgb') 
        ? colors[0] 
        : undefined
      const color2 = colors[1].startsWith('#') || colors[1].startsWith('rgb')
        ? colors[1]
        : undefined
      
      if (color1 && color2) {
        return {
          background: `linear-gradient(to bottom right, ${color1}, ${color2})`
        }
      }
      
      // If Tailwind classes, return undefined to use default
      // (You could map Tailwind classes to colors if needed)
    }
    return undefined
  }

  const renderIcon = (card: HomepageCard) => {
    // Handle icon type
    if (card.icon_type === 'icon' && card.icon_url) {
      const IconComponent = getIconByName(card.icon_url)
      if (IconComponent) {
        return <IconComponent className="h-10 w-10 text-white" />
      }
    }
    
    // Handle video type - use thumbnail for icon
    if (card.icon_type === 'video') {
      if (card.thumbnail_url) {
        return (
          <img 
            src={card.thumbnail_url} 
            alt={card.title}
            className="h-10 w-10 rounded-full object-cover"
            onError={(e) => {
              console.error('Error loading thumbnail:', card.thumbnail_url)
              e.currentTarget.style.display = 'none'
            }}
          />
        )
      } else if (card.icon_url) {
        // Fallback to icon_url if thumbnail not available
        return (
          <img 
            src={card.icon_url} 
            alt={card.title}
            className="h-10 w-10 rounded-full object-cover"
            onError={(e) => {
              console.error('Error loading video icon:', card.icon_url)
              e.currentTarget.style.display = 'none'
            }}
          />
        )
      }
    }
    
    // Handle image type
    if (card.icon_type === 'image' && card.icon_url) {
      console.log(`🖼️ Rendering image icon for "${card.title}":`, card.icon_url)
      return (
        <img 
          src={card.icon_url} 
          alt={card.title}
          className="h-10 w-10 rounded-full object-cover"
          onLoad={() => {
            console.log(`✅ Icon image loaded for "${card.title}"`)
          }}
          onError={(e) => {
            console.error(`❌ Error loading icon image for "${card.title}":`, {
              url: card.icon_url,
              icon_type: card.icon_type
            })
            // Show fallback on error
            e.currentTarget.src = '/placeholder.jpg'
          }}
        />
      )
    }

    // Fallback icon if nothing matches
    return <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
      <span className="text-white text-xs">?</span>
    </div>
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24 bg-black">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      </div>
    )
  }

  if (cards.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24 bg-black">
        <p className="text-center text-gray-400">No departments available at the moment.</p>
        <p className="text-center text-gray-500 text-sm mt-2">
          Add cards in the Services Settings page to see them here.
        </p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 bg-black">
      {/* Debug Panel - Remove this in production */}
      {process.env.NODE_ENV === 'development' && cards.length > 0 && (
        <div className="mb-4 p-4 bg-gray-900/50 rounded-lg border border-blue-500/30 text-xs">
          <h3 className="text-blue-400 font-bold mb-2">🐛 Debug Info:</h3>
          <div className="space-y-1 text-gray-300">
            <div>Total cards: {cards.length}</div>
            {cards.map((card, idx) => (
              <div key={card.id} className="ml-4 border-l-2 border-blue-500/30 pl-2">
                <div className="font-semibold text-white">{idx + 1}. {card.title}</div>
                <div>Icon Type: <span className="text-yellow-400">{card.icon_type || 'NOT SET'}</span></div>
                <div>Icon URL: <span className="text-cyan-400 break-all">{card.icon_url || 'NONE'}</span></div>
                <div>Thumbnail URL: <span className="text-cyan-400 break-all">{card.thumbnail_url || 'NONE'}</span></div>
                <div>Will show hover image: <span className="text-green-400">{(card.thumbnail_url || (card.icon_type === 'image' && card.icon_url)) ? 'YES' : 'NO'}</span></div>
                <div>Hover image URL: <span className="text-purple-400 break-all">{card.thumbnail_url || (card.icon_type === 'image' ? card.icon_url : 'N/A') || 'NONE'}</span></div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => {
          const comingSoon = card.status === 'coming_soon'
          const href = card.department_slug ? `/${card.department_slug}` : '#'
          
          // Debug logging for each card
          console.log(`Rendering card ${i + 1}:`, {
            title: card.title,
            icon_type: card.icon_type,
            icon_url: card.icon_url,
            thumbnail_url: card.thumbnail_url,
            willShowHoverImage: card.icon_type === 'image' && !!card.icon_url
          })
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={href}
                className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 p-8 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-300 ${comingSoon ? 'opacity-20 pointer-events-none' : 'hover:scale-105 hover:shadow-blue-400/30'} ${!comingSoon ? 'hover:border-gradient-to-r hover:from-blue-400 hover:to-purple-400 border-blue-900/40' : 'border-blue-900/20'}`}
                style={{ minHeight: '220px' }}
              >
                {/* Coming Soon Overlay */}
                {comingSoon && (
                  <span className="absolute top-3 right-3 z-20 bg-[#141414] text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 shadow-md opacity-90 pointer-events-none select-none">
                    Coming Soon
                  </span>
                )}
                
                {/* Icon and Title Centered */}
                <div className="flex flex-col items-center justify-center flex-1 w-full py-4 gap-6 relative">
                  {/* Thumbnail on hover - show if we have any image URL */}
                  {/* Priority: thumbnail_url > icon_url (when icon_type is image) */}
                  {(card.thumbnail_url || (card.icon_type === 'image' && card.icon_url)) && (
                    <img
                      src={card.thumbnail_url || card.icon_url}
                      alt={card.title}
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-24 rounded-xl object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-10"
                      style={{ pointerEvents: 'none' }}
                      onLoad={() => {
                        console.log(`✅ Hover image loaded successfully for "${card.title}":`, card.thumbnail_url || card.icon_url)
                      }}
                      onError={(e) => {
                        console.error(`❌ Error loading hover image for "${card.title}":`, {
                          thumbnail_url: card.thumbnail_url,
                          icon_url: card.icon_url,
                          icon_type: card.icon_type,
                          card_id: card.id
                        })
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  )}
                  
                  {/* Icon Circle */}
                  <div
                    className="inline-flex h-20 w-20 items-center justify-center rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:opacity-0 group-hover:translate-y-4 opacity-100"
                    style={getGradientStyle(card.gradient_colors) || {
                      background: 'linear-gradient(to bottom right, rgb(59, 130, 246), rgb(147, 51, 234))'
                    }}
                  >
                    {renderIcon(card)}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg text-center">
                    {card.title}
                  </h3>
                </div>
                
                {/* Description - hidden by default, appears on hover */}
                {card.description && (
                  <p className="text-base text-blue-100 text-center font-light mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {card.description}
                  </p>
                )}
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

