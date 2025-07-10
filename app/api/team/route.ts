import { NextResponse } from "next/server"

// Mock data for team members
const teamMembers = [
  {
    name: "John Doe",
    position: "CEO",
    bio: "John is an experienced leader...",
    imageUrl: "/placeholder-user.jpg",
  },
  {
    name: "Jane Smith",
    position: "Creative Director",
    bio: "Jane is an award-winning designer...",
    imageUrl: "/placeholder-user.jpg",
  },
  // ... more team members
]

export async function GET(request: Request) {
  try {
    return NextResponse.json(teamMembers)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}

