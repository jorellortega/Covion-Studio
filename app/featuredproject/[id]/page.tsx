"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FeaturedProjectPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center py-20 px-4">
      <div className="max-w-2xl w-full bg-gradient-to-br from-blue-900/60 via-purple-900/60 to-cyan-900/60 rounded-2xl p-10 border border-blue-400/30 shadow-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 text-transparent bg-clip-text drop-shadow-lg">
          Featured Project: {id}
        </h1>
        <p className="text-lg text-blue-100 mb-8">
          This is a placeholder for the details of the featured project with ID <span className="font-mono text-cyan-300">{id}</span>.<br/>
          You can display project images, description, technologies used, and more here.
        </p>
        <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:from-blue-500 hover:to-cyan-300 transition-all duration-300 text-lg">
          <Link href="/webdevelopment">Back to Web Development</Link>
        </Button>
      </div>
    </div>
  );
} 