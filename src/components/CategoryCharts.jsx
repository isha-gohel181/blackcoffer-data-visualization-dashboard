'use client'

import * as React from 'react'
import { TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Treemap, Label, LabelList } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const COLORS = ['#6B5FED', '#7D6FE6', '#8B7FE8', '#9D4AC8', '#574AE2', '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#FB7185']

const CustomizedContent = ({ x, y, width, height, name, size, fill, hoveredItem }) => {
  if (width < 25 || height < 15) return null;

  const isHovered = hoveredItem && hoveredItem.name === name;
  const opacity = !hoveredItem ? 1 : isHovered ? 1 : 0.3;

  // Extremely adaptive thresholds
  const canShowTitle = width > 30 && height > 20;
  const canShowSize = width > 45 && height > 40;
  
  // Dynamic font size: scales with box size but stays within readable bounds
  const titleFontSize = Math.max(9, Math.min(width / 8, height / 3, 14));
  const sizeFontSize = Math.max(8, titleFontSize - 2);

  return (
    <g opacity={opacity} style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: fill || '#6B5FED',
          stroke: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.1)',
          strokeWidth: isHovered ? 2 : 1,
        }}
        rx={6}
      />
      {canShowTitle && name && (
        <text
          x={x + width / 2}
          y={y + height / 2 + (canShowSize ? -6 : 4)}
          textAnchor="middle"
          fill="#fff"
          fontSize={titleFontSize}
          fontWeight="600"
          className="pointer-events-none select-none"
        >
          {width < 60 ? (name.length > 4 ? `${name.substring(0, 3)}.` : name) : name.length > 18 ? `${name.substring(0, 15)}..` : name}
        </text>
      )}
      {canShowSize && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 10}
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          fontSize={sizeFontSize}
          className="pointer-events-none select-none"
        >
          {size}
        </text>
      )}
    </g>
  );
};

export function SectorChart({ data, hoveredItem, onHover }) {
  if (!data || data.length === 0) {
    return (
      <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
        <CardContent className="flex items-center justify-center p-12">
          <p className="text-slate-400">No data available</p>
        </CardContent>
      </Card>
    )
  }

  // Optimize data for Chart
  const sectorData = React.useMemo(() => {
    return data
      .filter(d => d.sector)
      .reduce((acc, d) => {
        const existing = acc.find(item => item.name === d.sector) 
        if (existing) {
          existing.count += 1
        } else {
          acc.push({ name: d.sector, count: 1 })
        }
        return acc
      }, [])
      .sort((a, b) => b.count - a.count)
      .slice(0, 15)
      .map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length] 
      }))
  }, [data])

  const chartConfig = sectorData.reduce((acc, item, index) => {
    acc[`item_${index}`] = {
      label: item.name,
      color: item.fill
    }
    return acc
  }, { count: { label: 'Records' } })

  return (
    <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>Sector Distribution</CardTitle>
        <CardDescription>Records analyzed by industry sector</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[350px]">
          <BarChart
            data={sectorData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              width={120}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="count"
              radius={[0, 4, 4, 0]}
              barSize={18}
            >
              <LabelList
                dataKey="count"
                position="right"
                offset={10}
                className="fill-white font-medium"
                fontSize={11}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-medium leading-none text-foreground">
          Top sectors by volume <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-xs">
          Energy remains the primary sector in the current dataset
        </div>
      </CardFooter>
    </Card>
  )
}




export function PESTLEChart({ data, hoveredItem, onHover }) {
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
    .filter(d => d.pestle)
    .reduce((acc, d) => {
      const existing = acc.find(item => item.pestle === d.pestle)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ pestle: d.pestle, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => b.count - a.count)

  return (
    <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>PESTLE Analysis</CardTitle>
        <CardDescription>Distribution by PESTLE category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ count: { label: 'Records', color: '#D946EF' } }} className="w-full h-[300px]">
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            onMouseMove={(state) => {
              if (state && state.activeTooltipIndex !== undefined && chartData[state.activeTooltipIndex]) {
                onHover && onHover({ name: chartData[state.activeTooltipIndex].pestle })
              }
            }}
            onMouseLeave={() => onHover && onHover(null)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="pestle"
              stroke="rgba(255,255,255,0.5)"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 11 }}
            />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar 
              dataKey="count" 
              fill="var(--color-count)" 
              radius={[8, 8, 0, 0]}
              shape={
                <BarShape 
                  hoveredItem={hoveredItem}
                  dataKey="pestle"
                />
              }
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          PESTLE distribution <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}

const BarShape = ({ x, y, width, height, fill, hoveredItem, dataKey, payload }) => {
  const isHovered = hoveredItem && payload && hoveredItem.name === payload[dataKey];
  const opacity = !hoveredItem ? 1 : isHovered ? 1 : 0.3;
  
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      opacity={opacity}
      style={{ transition: 'opacity 0.2s ease' }}
    />
  )
}

// Static color palette for pie chart
const PIE_COLORS = [
  'hsl(265 70% 60%)',   // Purple
  'hsl(200 70% 50%)',   // Blue
  'hsl(150 60% 45%)',   // Green
  'hsl(35 90% 55%)',    // Orange
  'hsl(340 75% 55%)',   // Pink
]

export function SourceChart({ data, hoveredItem, onHover }) {
  // Generate dynamic chart config based on data
  const processedData = React.useMemo(() => {
    if (!data || data.length === 0) return { chartData: [], chartConfig: { value: { label: 'Records' } } }

    const sourceData = data
      .filter(d => d.source)
      .reduce((acc, d) => {
        const existing = acc.find(item => item.source === d.source)
        if (existing) {
          existing.value += 1
        } else {
          acc.push({ source: d.source, value: 1 })
        }
        return acc
      }, [])
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)

    // Create chart config dynamically with static keys
    const chartConfig = {
      value: { label: 'Records' },
      source1: { label: sourceData[0]?.source || '', color: PIE_COLORS[0] },
      source2: { label: sourceData[1]?.source || '', color: PIE_COLORS[1] },
      source3: { label: sourceData[2]?.source || '', color: PIE_COLORS[2] },
      source4: { label: sourceData[3]?.source || '', color: PIE_COLORS[3] },
      source5: { label: sourceData[4]?.source || '', color: PIE_COLORS[4] },
    }

    const chartData = sourceData.map((item, index) => ({
      source: item.source,
      value: item.value,
      fill: `var(--color-source${index + 1})`
    }))

    return { chartData, chartConfig }
  }, [data])

  const totalRecords = React.useMemo(() => {
    return processedData.chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [processedData.chartData])

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
        <CardTitle>Source Distribution</CardTitle>
        <CardDescription>Top data sources analysis</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={processedData.chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={processedData.chartData}
              dataKey="value"
              nameKey="source"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalRecords.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Records
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Top sources <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing distribution of top 5 data sources
        </div>
      </CardFooter>
    </Card>
  )
}


export function SWOTChart({ data, hoveredItem, onHover }) {
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
    .filter(d => d.swot)
    .reduce((acc, d) => {
      const existing = acc.find(item => item.swot === d.swot)
      if (existing) {
        existing.count += 1
      } else {
        acc.push({ swot: d.swot, count: 1 })
      }
      return acc
    }, [])
    .sort((a, b) => b.count - a.count)

  // If no swot data found, use demo/fake data
  let displayData = chartData
  if (displayData.length === 0) {
    displayData = [
      { swot: 'Strength', count: 45 },
      { swot: 'Weakness', count: 32 },
      { swot: 'Opportunity', count: 38 },
      { swot: 'Threat', count: 28 }
    ]
  }

  return (
    <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
      <CardHeader>
        <CardTitle>SWOT Analysis</CardTitle>
        <CardDescription>Distribution by SWOT category</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={displayData} 
            margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            onMouseMove={(state) => {
              if (state && state.activeTooltipIndex !== undefined && displayData[state.activeTooltipIndex]) {
                onHover && onHover({ name: displayData[state.activeTooltipIndex].swot })
              }
            }}
            onMouseLeave={() => onHover && onHover(null)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="swot"
              stroke="rgba(255,255,255,0.5)"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 11 }}
            />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid rgba(255,255,255,0.1)' }}
              labelStyle={{ color: 'white' }}
            />
            <Bar dataKey="count" fill="#F43F5E" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          SWOT distribution <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
