"use client"

import { DepartmentGrid } from "@/components/department-grid"
import { HeroSection } from "@/components/hero-section"
// import { AskAIComponent } from "@/components/AskAIComponent"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <HeroSection />
      {/* <div className="my-8 flex justify-center">
        <AskAIComponent autoCollapse />
      </div> */}
      <DepartmentGrid />
    </div>
  )
}

