import { Skeleton } from "@/components/ui/skeleton"

export default function EditorLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Title bar skeleton */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Fields panel skeleton */}
        <div className="w-80 bg-white border-r border-gray-200 p-6">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-4 w-full mb-6" />
          <div className="space-y-3">
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>

        {/* Document area skeleton */}
        <div className="flex-1 bg-gray-100 p-8">
          <div className="flex justify-center">
            <Skeleton className="w-full max-w-4xl h-[800px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
