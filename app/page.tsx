"use client"

import { DepartmentGrid } from "@/components/department-grid"
import { HeroSection } from "@/components/hero-section"
// import { AskAIComponent } from "@/components/AskAIComponent"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <HeroSection />
      {/* <div className="my-8 flex justify-center">
        <AskAIComponent autoCollapse />
      </div> */}
      <DepartmentGrid />
    </div>
  )
}

