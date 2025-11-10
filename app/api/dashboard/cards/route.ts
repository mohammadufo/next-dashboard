import { type NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

const cardCategories = [
  { category: 'Revenue', icon: '💰', color: 'blue' },
  { category: 'Users', icon: '👥', color: 'green' },
  { category: 'Orders', icon: '📦', color: 'purple' },
  { category: 'Products', icon: '🛍️', color: 'orange' },
  { category: 'Analytics', icon: '📊', color: 'pink' },
  { category: 'Traffic', icon: '🚀', color: 'cyan' },
  { category: 'Sales', icon: '💵', color: 'emerald' },
  { category: 'Customers', icon: '🎯', color: 'violet' },
  { category: 'Inventory', icon: '📋', color: 'amber' },
  { category: 'Growth', icon: '📈', color: 'rose' },
]

const generateCards = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const categoryData = cardCategories[i % cardCategories.length]
    const value = Math.floor(Math.random() * 10000) + 1000
    const change = (Math.random() * 40 - 10).toFixed(1)

    return {
      id: i + 1,
      title: `${categoryData.category} Analytics`,
      category: categoryData.category,
      value: value,
      change: Number.parseFloat(change),
      description: `Track and monitor your ${categoryData.category.toLowerCase()} performance in real-time`,
      image: `https://picsum.photos/400/200?random=${i}`,
      color: categoryData.color,
      trend: Number.parseFloat(change) > 0 ? 'up' : 'down',
      lastUpdated: new Date().toISOString(),
    }
  })
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session)
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const role = String(session.role || '')
      .trim()
      .toLowerCase()

    const highCountRoles = new Set(['owner'])
    const cardCount = highCountRoles.has(role) ? 10 : 5

    await new Promise((r) => setTimeout(r, 800))
    const cards = generateCards(cardCount)

    return NextResponse.json({
      cards,
      role,
    })
  } catch (error) {
    console.error('Cards API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
