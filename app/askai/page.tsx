import { AskAIComponent } from "@/components/AskAIComponent"

export default function AskAIPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          AI Assistant
        </h1>
        <p className="text-xl mb-10 text-center text-blue-200">
          Explore our services and get instant answers with our advanced AI.
        </p>
        <div className="max-w-4xl mx-auto">
          <AskAIComponent />
        </div>
      </div>
    </div>
  )
}

