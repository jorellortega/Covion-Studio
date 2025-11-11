import { DepartmentDetails } from "@/components/department-details"

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ department: string }>
}) {
  const { department } = await params
  return (
    <div className="w-full mx-auto px-4 py-12">
      {" "}
      {/* Updated to use full width */}
      <DepartmentDetails department={department} />
    </div>
  )
}

