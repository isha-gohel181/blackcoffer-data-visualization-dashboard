'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function StatisticsCards({ data, loading }) {
  const stats = [
    {
      title: 'Total Records',
      value: data.length,
      description: 'Total data points',
    },
    {
      title: 'Avg Intensity',
      value: (
        data.reduce((sum, d) => sum + (d.intensity || 0), 0) / (data.length || 1)
      ).toFixed(2),
      description: 'Average intensity score',
    },
    {
      title: 'Avg Likelihood',
      value: (
        data.reduce((sum, d) => sum + (d.likelihood || 0), 0) / (data.length || 1)
      ).toFixed(2),
      description: 'Average likelihood score',
    },
    {
      title: 'Avg Relevance',
      value: (
        data.reduce((sum, d) => sum + (d.relevance || 0), 0) / (data.length || 1)
      ).toFixed(2),
      description: 'Average relevance score',
    },
    {
      title: 'Unique Topics',
      value: new Set(data.map(d => d.topic)).size,
      description: 'Number of topics',
    },
    {
      title: 'Unique Regions',
      value: new Set(data.map(d => d.region)).size,
      description: 'Number of regions',
    },
    {
      title: 'Unique Countries',
      value: new Set(data.map(d => d.country)).size,
      description: 'Number of countries',
    },
    {
      title: 'Unique Cities',
      value: new Set(data.map(d => d.city)).size,
      description: 'Number of cities',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <Card
              key={i}
              className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]"
            >
              <CardHeader className="pb-3">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-9 w-16" />
                <Skeleton className="mt-2 h-3 w-32" />
              </CardContent>
            </Card>
          ))
        : stats.map((stat) => (
            <Card
              key={stat.title}
              className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-400">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">{stat.value}</div>
                <p className="mt-2 text-xs text-slate-500">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
    </div>
  )
}

