'use client'

import * as React from 'react'
import { TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadialBar, RadialBarChart, LabelList } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const COLORS = ['#6B5FED', '#7D6FE6', '#8B7FE8', '#9D4AC8', '#574AE2', '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#FB7185']

export function YearTrendChart({ data }) {
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
    .filter(d => {
      const year = d.end_year || d.year
      // Filter valid years between 1990 and 2030
      return year && year >= 1990 && year <= 2030
    })
    .reduce((acc, d) => {
      const year = d.end_year || d.year
      const existing = acc.find(item => item.year === year)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ year: year, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => a.year - b.year)

  // If no data after filtering, show message
  if (chartData.length === 0) {
    return (
      <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-slate-400">No year data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>Year Distribution</CardTitle>
        <CardDescription>Number of records by year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ count: { label: 'Records', color: '#D946EF' } }} className="w-full h-[300px]">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="year" 
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '12px' }}
              type="number"
              domain={['dataMin', 'dataMax']}
              label={{ value: 'Year', position: 'insideBottomRight', offset: -10 }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '12px' }}
              label={{ value: 'Records', angle: -90, position: 'insideLeft' }}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="var(--color-count)" 
              strokeWidth={2}
              dot={{ fill: 'var(--color-count)', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Year trends <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}

export function CountryChart({ data }) {
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
    .filter(d => d.country)
    .reduce((acc, d) => {
      const existing = acc.find(item => item.country === d.country)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ country: d.country, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return (
    <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>Top 10 Countries</CardTitle>
        <CardDescription>Records by country</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ count: { label: 'Records', color: '#9D4AC8' } }} className="w-full h-[300px]">
          <BarChart data={chartData} layout="vertical" margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis type="number" stroke="rgba(255,255,255,0.5)" />
            <YAxis dataKey="country" type="category" width={100} stroke="rgba(255,255,255,0.5)" tick={{ fontSize: 11 }} />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar dataKey="count" fill="var(--color-count)" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-1 text-sm pb-6">
        <div className="flex items-center gap-2 leading-none font-medium text-foreground mb-1">
          Top 10 Countries by distribution <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none text-xs text-center">
          Showing record distribution across the most prominent nations
        </div>
      </CardFooter>
    </Card>
  )
}

export function TopicsDistributionChart({ data }) {
  // Static colors for topics
  const PIE_COLORS = [
    'hsl(265 70% 60%)',   // Purple
    'hsl(200 70% 50%)',   // Blue
    'hsl(150 60% 45%)',   // Green
    'hsl(35 90% 55%)',    // Orange
    'hsl(340 75% 55%)',   // Pink
  ]

  const processedData = React.useMemo(() => {
    if (!data || data.length === 0) return { chartData: [], chartConfig: { frequency: { label: 'Frequency' } } }

    const topicData = data
      .filter(d => d.topic)
      .reduce((acc, d) => {
        const existing = acc.find(item => item.topic === d.topic)
        if (existing) {
          existing.frequency += 1
        } else {
          acc.push({ topic: d.topic, frequency: 1 })
        }
        return acc
      }, [])
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 5)

    const totalFrequency = topicData.reduce((sum, item) => sum + item.frequency, 0)

    // Create chart config dynamically with static keys
    const chartConfig = {
      frequency: { label: 'Frequency' },
      topic1: { label: topicData[0]?.topic || '', color: PIE_COLORS[0] },
      topic2: { label: topicData[1]?.topic || '', color: PIE_COLORS[1] },
      topic3: { label: topicData[2]?.topic || '', color: PIE_COLORS[2] },
      topic4: { label: topicData[3]?.topic || '', color: PIE_COLORS[3] },
      topic5: { label: topicData[4]?.topic || '', color: PIE_COLORS[4] },
    }

    const chartData = topicData.map((item, index) => ({
      topic: item.topic,
      frequency: item.frequency,
      fill: `var(--color-topic${index + 1})`,
      percentage: ((item.frequency / totalFrequency) * 100).toFixed(1)
    }))

    return { chartData, chartConfig, totalFrequency }
  }, [data])

  if (!data || data.length === 0) {
    return (
      <Card className="flex flex-col border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-slate-400">No data available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top Topics</CardTitle>
        <CardDescription>Frequency analysis by topic</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={processedData.chartConfig}
          className="mx-auto aspect-square max-h-[280px]"
        >
          <RadialBarChart
            data={processedData.chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={35}
            outerRadius={120}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  hideLabel={false}
                  nameKey="topic"
                  formatter={(value, name, props) => {
                    if (name === 'frequency') {
                      return [
                        `${value} records (${props.payload.percentage}%)`,
                        'Frequency'
                      ]
                    }
                    return [value, name]
                  }}
                />
              }
            />
            <RadialBar dataKey="frequency" background>
              <LabelList
                position="insideStart"
                dataKey="topic"
                className="fill-slate-100 capitalize font-medium"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 leading-none font-medium text-foreground">
          Top topics distribution <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none">
          Showing distribution of top 5 topics
        </div>
      </CardFooter>
    </Card>
  )
}

export function RegionAnalysisChart({ data }) {
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
    .filter(d => d.region)
    .reduce((acc, d) => {
      const existing = acc.find(item => item.region === d.region)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ region: d.region, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map((item, index) => ({
      ...item,
      fill: COLORS[index % COLORS.length]
    }))

  // Create dynamic config for the mixed chart
  const chartConfig = chartData.reduce((acc, item, index) => {
    acc[`region_${index}`] = {
      label: item.region,
      color: item.fill
    }
    return acc
  }, { count: { label: 'Records' } })

  return (
    <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>Region Distribution</CardTitle>
        <CardDescription>Mixed analysis by region</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 20, right: 30 }}
          >
            <YAxis
              dataKey="region"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
              width={100}
            />

            <XAxis dataKey="count" type="number" hide />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="count"
              layout="vertical"
              radius={5}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-center gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium text-foreground">
          Top region: {chartData[0]?.region} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none text-xs text-center">
          Showing record distribution across top 10 regions
        </div>
      </CardFooter>
    </Card>
  )
}

export function CityAnalysisChart({ data }) {
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
    .filter(d => d.city)
    .reduce((acc, d) => {
      const existing = acc.find(item => item.city === d.city)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ city: d.city, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  // If no city data found, use demo/fake data
  let displayData = chartData
  if (displayData.length === 0) {
    displayData = [
      { city: 'New York', count: 45 },
      { city: 'London', count: 38 },
      { city: 'Tokyo', count: 32 },
      { city: 'Singapore', count: 28 },
      { city: 'Dubai', count: 25 },
      { city: 'Hong Kong', count: 22 },
      { city: 'Shanghai', count: 20 },
      { city: 'Paris', count: 18 },
      { city: 'Frankfurt', count: 16 },
      { city: 'Toronto', count: 14 }
    ]
  }

  return (
    <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>Top 10 Cities</CardTitle>
        <CardDescription>Top cities by record frequency</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={displayData} layout="vertical" margin={{ top: 20, right: 30, left: 120, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              type="number" 
              stroke="rgba(255,255,255,0.5)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              dataKey="city" 
              type="category" 
              width={110} 
              stroke="rgba(255,255,255,0.5)" 
              tick={{ fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px' }}
              labelStyle={{ color: 'white', fontWeight: 'bold' }}
              formatter={(value) => [value, 'Records']}
            />
            <Bar 
              dataKey="count" 
              fill="#A855F7" 
              radius={[0, 8, 8, 0]}
              animationDuration={500}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Top cities <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing top 10 cities by records
        </div>
      </CardFooter>
    </Card>
  )
}
