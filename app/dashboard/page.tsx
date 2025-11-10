'use client'

import { useQuery } from '@tanstack/react-query'
import { DashboardCard } from '@/components/dashboard-card'
import { DashboardSkeleton } from '@/components/dashboard-skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function DashboardPage() {
  const { data: userData, isLoading: isUserLoading } = useQuery<UserData>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/user')
      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }
      return response.json()
    },
    staleTime: 60000,
  })

  const { data, isLoading, isError, error, refetch, isFetching } =
    useQuery<DashboardData>({
      queryKey: ['dashboard-cards'],
      queryFn: async () => {
        const response = await fetch('/api/dashboard/cards')

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized')
          }
          throw new Error('Failed to fetch cards')
        }

        return response.json()
      },
      retry: 1,
      staleTime: 30000,
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted dark:from-background dark:via-background dark:to-background relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative z-10">
        {userData && <Navbar user={userData} />}

        <div className="max-w-6xl mx-auto px-6 pb-10 pt-6 md:pt-10">
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                Overview
              </h2>
              {data && (
                <p className="text-sm md:text-base text-muted-foreground mt-1">
                  Showing{' '}
                  <span className="font-semibold text-foreground">
                    {data.cards.length}
                  </span>{' '}
                  cards for{' '}
                  <span className="font-semibold capitalize text-primary">
                    {data.role}
                  </span>{' '}
                  role
                </p>
              )}
            </div>
            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              variant="outline"
              size="sm"
              className="border-border bg-card/80 text-foreground hover:bg-accent hover:text-accent-foreground backdrop-blur-sm"
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isFetching ? 'animate-spin' : ''}`}
              />
              Refresh
            </Button>
          </div>

          {(isLoading || isUserLoading) && <DashboardSkeleton count={5} />}

          {isError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="flex items-center justify-between gap-4">
                <span className="text-sm">
                  {error instanceof Error && error.message === 'Unauthorized'
                    ? 'Your session has expired. Please log in again.'
                    : 'Failed to load dashboard data. Please check your connection and try again.'}
                </span>
                <Button onClick={() => refetch()} variant="outline" size="sm">
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {data && data.cards.length === 0 && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Cards Found</AlertTitle>
              <AlertDescription>
                There are no cards to display at the moment.
              </AlertDescription>
            </Alert>
          )}

          {data && data.cards.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.cards.map((card) => (
                <DashboardCard
                  key={card.id}
                  title={card.title}
                  category={card.category}
                  value={card.value}
                  change={card.change}
                  description={card.description}
                  image={card.image}
                  color={card.color}
                  trend={card.trend}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
