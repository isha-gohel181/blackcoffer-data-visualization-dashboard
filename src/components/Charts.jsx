'use client'

import { TrendingUp } from 'lucide-react'
import { Pie, PieChart, Sector } from 'recharts'

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
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#6B5FED', '#7D6FE6', '#8B7FE8', '#9D4AC8', '#574AE2', '#6B5FED', '#7D6FE6', '#8B7FE8']



export function TopicDistributionChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.02)]">
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-slate-600 dark:text-slate-400">No data available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = data
    .filter(d => d.topic)
    .reduce((acc, d) => {
      const existing = acc.find(item => item.topic === d.topic)
      if (existing) {
        existing.value += 1
      } else {
        acc.push({ topic: d.topic, value: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => b.value - a.value)
    .slice(0, 8)

  const chartConfig = {
    value: { label: 'Count' },
    ...chartData.reduce((acc, item, index) => {
      acc[item.topic] = { 
        label: item.topic, 
        color: COLORS[index % COLORS.length] 
      }
      return acc
    }, {})
  }

  const processedData = chartData.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length]
  }))

  return (
    <Card className="flex flex-col dark:border-[rgba(255,255,255,0.05)] dark:bg-[rgba(255,255,255,0.02)]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Topic Distribution</CardTitle>
        <CardDescription>Distribution across topics</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />

            <Pie
              data={processedData}
              dataKey="value"
              nameKey="topic"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={(props) => {
                const { outerRadius = 0 } = props
                return <Sector {...props} outerRadius={outerRadius + 10} />
              }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Top topics <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing distribution of top 8 topics
        </div>
      </CardFooter>
    </Card>

  )
}


