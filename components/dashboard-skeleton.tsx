import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface DashboardSkeletonProps {
  count?: number
}

export function DashboardSkeleton({ count = 5 }: DashboardSkeletonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-32 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-9 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
