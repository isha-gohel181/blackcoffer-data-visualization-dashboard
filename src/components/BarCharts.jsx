'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export function RelevanceByTopicChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-slate-600 dark:text-slate-400">No data available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = data
    .filter(d => d.topic && d.relevance !== undefined)
    .reduce((acc, d) => {
      const existing = acc.find(item => item.topic === d.topic)
      if (existing) {
        existing.relevance = (existing.relevance * existing.count + d.relevance) / (existing.count + 1)
        existing.count += 1
      } else {
        acc.push({ topic: d.topic, relevance: d.relevance, count: 1 })
      }
      return acc
    }, [])
    .map(({ count, ...rest }) => rest)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, 8)

  const chartConfig = {
    relevance: {
      label: 'Relevance',
      color: '#6B5FED',
    },
  }

  return (
    <Card className="dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>Relevance by Topic</CardTitle>
        <CardDescription>Top topics by relevance score</CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
            <XAxis
              dataKey="topic"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 11 }}
            />
            <Bar
              dataKey="relevance"
              fill="var(--color-relevance)"
              radius={[8, 8, 0, 0]}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Top topics <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing top 8 topics by relevance
        </div>
      </CardFooter>
    </Card>
  )
}

export function IntensityByRegionChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col">
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-slate-600 dark:text-slate-400">No data available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = data
    .filter(d => d.region && d.intensity !== undefined)
    .reduce((acc, d) => {
      const existing = acc.find(item => item.region === d.region)
      if (existing) {
        existing.intensity = (existing.intensity * existing.count + d.intensity) / (existing.count + 1)
        existing.count += 1
      } else {
        acc.push({ region: d.region, intensity: d.intensity, count: 1 })
      }
      return acc
    }, [])
    .map(({ count, ...rest }) => rest)
    .sort((a, b) => b.intensity - a.intensity)
    .slice(0, 8)

  const chartConfig = {
    intensity: {
      label: 'Intensity',
      color: '#9D4AC8',
    },
  }

  return (
    <Card className="dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>Intensity by Region</CardTitle>
        <CardDescription>Top regions by intensity score</CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
            <XAxis
              dataKey="region"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 11 }}
            />
            <Bar
              dataKey="intensity"
              fill="var(--color-intensity)"
              radius={[8, 8, 0, 0]}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Top regions <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing top 8 regions by intensity
        </div>
      </CardFooter>
    </Card>
  )
}
