"use client"

import { motion } from "framer-motion"
import { Camera, Code, Film, Headphones, LineChart, Paintbrush, Shapes, Bot } from "lucide-react"
import Link from "next/link"

const departments = [
  // Non-coming soon departments first
  {
    name: "Cinema",
    description: "Professional video production services",
    icon: Camera,
    href: "/cinema",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Technology",
    description: "Innovative tech solutions and software development",
    icon: Code,
    href: "/technology",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Audio",
    description: "Professional sound design and production",
    icon: Headphones,
    href: "/audio",
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Creative Services",
    description: "Innovative creative solutions",
    icon: Shapes,
    href: "/creative",
    color: "from-violet-500 to-purple-500",
  },
  // Coming soon departments after
  {
    name: "Animation",
    description: "Bringing stories to life through motion",
    icon: Film,
    href: "/animation",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Videography and Photography",
    description: "Capture moments with stunning visuals and professional editing",
    icon: Camera,
    href: "/videography-photography",
    color: "from-pink-500 to-yellow-500",
  },
  {
    name: "Digital Marketing",
    description: "Strategic online presence management",
    icon: LineChart,
    href: "/marketing",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "AI & Automation",
    description: "Cutting-edge AI solutions and automation services",
    icon: Bot,
    href: "/aicontent",
    color: "from-purple-600 to-fuchsia-500",
  },
]

export function DepartmentGrid() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24 bg-black">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept, i) => {
          // Determine if this department should have a 'Coming Soon' overlay
          const comingSoon = [
            "Animation",
            "Videography and Photography",
            "Digital Marketing",
            "AI & Automation"
          ].includes(dept.name);
          return (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={dept.href}
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
                  {/* Larger placeholder thumbnail on hover */}
                  <img
                    src="/placeholder.jpg"
                    alt="Department Thumbnail"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-24 rounded-xl object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg z-10"
                    style={{ pointerEvents: 'none' }}
                  />
                  <div
                    className={`inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${dept.color} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:opacity-0 group-hover:translate-y-4 opacity-100`}
                    style={{ transition: 'opacity 0.3s, transform 0.3s' }}
                  >
                    <dept.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg text-center">
                    {dept.name}
                  </h3>
                </div>
                {/* Description - hidden by default, appears on hover */}
                <p className="text-base text-blue-100 text-center font-light mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {dept.description}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  )
}

