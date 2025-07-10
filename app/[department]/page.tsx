import { DepartmentDetails } from "@/components/department-details"

export default function DepartmentPage({
  params,
}: {
  params: { department: string }
}) {
  return (
    <div className="w-full mx-auto px-4 py-12">
      {" "}
      {/* Updated to use full width */}
      <DepartmentDetails department={params.department} />
    </div>
  )
}

