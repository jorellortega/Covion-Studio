interface ActivityFeedProps {
  activities: string[]
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="space-y-2">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <p className="text-sm">{activity}</p>
        </div>
      ))}
    </div>
  )
}

