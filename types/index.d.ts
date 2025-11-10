type ApiError = {
  status: number
  message: string
}

interface Card {
  id: number
  title: string
  category: string
  value: number
  change: number
  description: string
  image: string
  color: string
  trend: 'up' | 'down'
}

interface DashboardData {
  cards: Card[]
  role: string
}

interface UserData {
  id: string
  name: string
  email: string
  username: string
  role: string
}

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}
