import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface DashboardCardProps {
  title: string
  category: string
  value: number
  change: number
  description: string
  image: string
  color: string
  trend: 'up' | 'down'
}

const gradientByColor: Record<string, string> = {
  blue: 'from-chart-1/70 to-chart-2/70',
  green: 'from-chart-2/70 to-chart-3/70',
  purple: 'from-chart-3/70 to-chart-4/70',
  orange: 'from-chart-4/70 to-chart-5/70',
  pink: 'from-chart-1/70 to-chart-3/70',
  cyan: 'from-chart-2/70 to-chart-4/70',
  emerald: 'from-chart-3/70 to-chart-5/70',
  violet: 'from-chart-1/70 to-chart-4/70',
  amber: 'from-chart-2/70 to-chart-5/70',
  rose: 'from-chart-1/70 to-chart-5/70',
}

export function DashboardCard({
  title,
  category,
  value,
  change,
  description,
  image,
  color,
  trend,
}: DashboardCardProps) {
  const isPositive = change > 0
  const gradient = gradientByColor[color] ?? 'from-chart-1/70 to-chart-2/70'

  return (
    <Card className="group overflow-hidden p-0 border border-border/70 bg-card/95 text-card-foreground shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
      <div className="relative h-40 w-full overflow-hidden bg-muted">
        <Image
          src={image || '/placeholder.svg'}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-tr opacity-80 mix-blend-soft-light',
            gradient
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        <Badge className="absolute top-3 right-3 bg-background/80 text-foreground border border-border/40 backdrop-blur-md">
          {category}
        </Badge>
      </div>

      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-base md:text-lg">{title}</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-5">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-3xl font-bold text-foreground">
              {value.toLocaleString()}
            </div>
            <div
              className={cn(
                'mt-1 flex items-center gap-1.5 text-sm font-medium',
                isPositive
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-600 dark:text-red-400'
              )}
            >
              {trend === 'up' ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>
                {isPositive ? '+' : ''}
                {change}%
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
