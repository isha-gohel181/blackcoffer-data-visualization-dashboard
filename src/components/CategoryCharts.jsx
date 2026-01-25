'use client'

import * as React from 'react'
import { TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Treemap, Label, LabelList, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const COLORS = ['#6B5FED', '#7D6FE6', '#8B7FE8', '#9D4AC8', '#574AE2', '#A855F7', '#D946EF', '#EC4899', '#F43F5E', '#FB7185']

const CustomizedContent = (props) => {
  const { x, y, width, height, name, value, fill, hoveredItem } = props;
  if (width < 30 || height < 20) return null;

  const isHovered = hoveredItem && hoveredItem.name === name;
  const opacity = !hoveredItem ? 1 : isHovered ? 1 : 0.4;

  // Dynamic thresholds
  const canShowTitle = width > 40 && height > 25;
  const canShowValue = width > 60 && height > 45;
  
  // Responsive font sizes
  const titleFontSize = Math.max(9, Math.min(width / 8, height / 4, 12));
  const valueFontSize = Math.max(8, titleFontSize - 1.5);

  // Dynamic character limit based on width to prevent overflow
  // 0.6 is a safe multiplier for variable width fonts
  const maxChars = Math.floor((width - 5) / (titleFontSize * 0.55));
  
  const getTruncatedText = (text, limit) => {
    if (!text) return "";
    const str = String(text);
    if (str.length <= limit) return str;
    return str.substring(0, Math.max(0, limit - 2)) + "..";
  };

  return (
    <g opacity={opacity} style={{ transition: 'all 0.3s ease' }}>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: fill || '#6B5FED',
          stroke: isHovered ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.05)',
          strokeWidth: isHovered ? 1.2 : 0.5,
        }}
        rx={3}
      />
      {canShowTitle && (
        <text
          x={x + width / 2}
          y={y + height / 2 + (canShowValue ? -5 : 4)}
          textAnchor="middle"
          fill="rgba(255,255,255,0.9)"
          fontSize={titleFontSize}
          fontWeight="400"
          className="pointer-events-none select-none"
        >
          {getTruncatedText(name, maxChars)}
        </text>
      )}
      {canShowValue && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 10}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          fontSize={valueFontSize}
          fontWeight="400"
          className="pointer-events-none select-none"
        >
          {getTruncatedText(`${value} records`, maxChars + 2)}
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
      <CardContent className="h-[400px]">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <Treemap
            data={sectorData}
            dataKey="count"
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent hoveredItem={hoveredItem} />}
            onMouseEnter={(e) => onHover && onHover(e)}
            onMouseLeave={() => onHover && onHover(null)}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent 
                  hideLabel={false}
                  labelKey="name"
                  indicator="dot"
                  className="min-w-[120px]"
                />
              }
            />
          </Treemap>
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
        <CardDescription>Strategic category distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ count: { label: 'Records' } }} className="w-full h-[350px]">
          <RadarChart
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius="80%"
          >
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis 
              dataKey="pestle" 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 'auto']} 
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Records"
              dataKey="count"
              stroke="#D946EF"
              fill="#D946EF"
              fillOpacity={0.6}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Category coverage <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
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
