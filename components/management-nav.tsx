"use client"

import Link from "next/link"

export function ManagementNav() {
  return (
    <nav className="bg-gray-800 dark:bg-gray-700 text-white py-4">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-6">
          <li>
            <Link href="/management/animation/workflow" className="hover:text-gray-300">
              Animation Workflow
            </Link>
          </li>
          <li>
            <Link href="/management/cinema/workflow" className="hover:text-gray-300">
              Cinema Workflow
            </Link>
          </li>
          <li>
            <Link href="/management/cinema/call-sheets" className="hover:text-gray-300">
              Call Sheets
            </Link>
          </li>
          <li>
            <Link href="/management/cinema/equipment-manager" className="hover:text-gray-300">
              Equipment Manager
            </Link>
          </li>
          <li>
            <Link href="/management/cinema/storyboard" className="hover:text-gray-300">
              Storyboard
            </Link>
          </li>
          <li>
            <Link href="/management/cinema/scripts" className="hover:text-gray-300">
              Scripts
            </Link>
          </li>
          <li>
            <Link href="/management/cinema/lighting-plot" className="hover:text-gray-300">
              Lighting Plot
            </Link>
          </li>
          <li>
            <Link href="/management/cinema/shot-list" className="hover:text-gray-300">
              Shot List
            </Link>
          </li>
          <li>
            <Link href="/management/cinema/production-schedule" className="hover:text-gray-300">
              Production Schedule
            </Link>
          </li>
          <li>
            <Link href="/management/creative/workflow" className="hover:text-gray-300">
              Creative Workflow
            </Link>
          </li>
          <li>
            <Link href="/management/creative/writing" className="hover:text-gray-300">
              Writing
            </Link>
          </li>
          <li>
            <Link href="/management/creative/storyboards" className="hover:text-gray-300">
              Storyboards
            </Link>
          </li>
          <li>
            <Link href="/management/creative/cover-design" className="hover:text-gray-300">
              Cover Design
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

