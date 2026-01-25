'use client'

import { TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export function IntensityChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-slate-400">No data available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = data
    .filter(d => d.intensity !== undefined)
    .reduce((acc, d) => {
      const existing = acc.find(item => item.intensity === d.intensity)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ intensity: d.intensity, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => a.intensity - b.intensity)

  const chartConfig = {
    count: {
      label: 'Count',
      color: '#6B5FED',
    },
  }

  return (
    <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>Intensity Distribution</CardTitle>
        <CardDescription>Distribution of intensity scores across data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="intensity" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar dataKey="count" fill="var(--color-count)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Intensity analysis <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}

export function LikelihoodChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-slate-400">No data available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = data
    .filter(d => d.likelihood !== undefined)
    .reduce((acc, d) => {
      const existing = acc.find(item => item.likelihood === d.likelihood)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ likelihood: d.likelihood, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => a.likelihood - b.likelihood)

  const chartConfig = {
    count: {
      label: 'Count',
      color: '#9D4AC8',
    },
  }

  return (
    <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>Likelihood Distribution</CardTitle>
        <CardDescription>Distribution of likelihood scores across data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="likelihood" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar dataKey="count" fill="var(--color-count)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Likelihood analysis <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}

export function RelevanceChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-slate-400">No data available</p>
        </CardContent>
      </Card>
    )
  }

  const chartData = data
    .filter(d => d.relevance !== undefined)
    .reduce((acc, d) => {
      const existing = acc.find(item => item.relevance === d.relevance)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ relevance: d.relevance, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => a.relevance - b.relevance)

  const chartConfig = {
    count: {
      label: 'Count',
      color: '#7D6FE6',
    },
  }

  return (
    <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>Relevance Distribution</CardTitle>
        <CardDescription>Distribution of relevance scores across data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="relevance" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar dataKey="count" fill="var(--color-count)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Relevance analysis <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
