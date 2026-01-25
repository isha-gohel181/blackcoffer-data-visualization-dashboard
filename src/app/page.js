'use client'

import { useState, useEffect } from 'react'
import Filters from '@/components/Filters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { IntensityLikelihoodAreaChart } from '@/components/IntensityLikelihoodAreaChart'
import {
  TopicDistributionChart,
} from '@/components/Charts'
import {
  RelevanceByTopicChart,
  IntensityByRegionChart,
} from '@/components/BarCharts'
import { StatisticsCards } from '@/components/StatisticsCards'
import { IntensityChart, LikelihoodChart, RelevanceChart } from '@/components/MetricsCharts'
import { YearTrendChart, CountryChart, TopicsDistributionChart, RegionAnalysisChart } from '@/components/AdditionalCharts'
import { SectorChart, PESTLEChart, SourceChart } from '@/components/CategoryCharts'
import { Skeleton } from '@/components/ui/skeleton'


export default function Home() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    region: '',
    pestle: '',
    sector: '',
    country: '',
    source: '',
  })

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/insights')
        const result = await response.json()
        if (result.success) {
          setData(result.data)
          setFilteredData(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle filter changes
  const handleFilterChange = async (newFilters) => {
    setFilters(newFilters)
    setLoading(true)

    try {
      const params = new URLSearchParams()
      if (newFilters.end_year) params.append('end_year', newFilters.end_year)
      if (newFilters.topic) params.append('topic', newFilters.topic)
      if (newFilters.region) params.append('region', newFilters.region)
      if (newFilters.pestle) params.append('pestle', newFilters.pestle)
      if (newFilters.sector) params.append('sector', newFilters.sector)
      if (newFilters.country) params.append('country', newFilters.country)
      if (newFilters.source) params.append('source', newFilters.source)

      const url = params.toString() ? `/api/insights?${params.toString()}` : '/api/insights'
      const response = await fetch(url)
      const result = await response.json()

      if (result.success) {
        setFilteredData(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch filtered data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="bg-[#0B0B0B]">
        {/* Header */}
        <header className="relative border-b border-[rgba(255,255,255,0.05)] bg-[#0B0B0B] overflow-hidden">
          {/* Subtle Grayscale Grid Background */}
          <div 
            className="absolute inset-0 z-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.4 ) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px',
            }}
          />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Insights Dashboard
                </h1>
                <p className="mt-2 text-slate-400 font-medium">
                  Explore and analyze business intelligence data
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <Filters onFilterChange={handleFilterChange} data={data} loading={loading} />

          {/* Stats */}
          <div className="mt-8">
            <StatisticsCards data={filteredData} loading={loading} />
          </div>

          {/* Charts */}
          {loading ? (
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
                  <CardHeader>
                    <Skeleton className="h-6 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-[300px] w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredData.length === 0 ? (
            <Card className="mt-8 border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <CardContent className="p-12 text-center">
                <p className="text-slate-400">No data available for the selected filters.</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Charts Grid */}
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Primary Charts */}
                <IntensityLikelihoodAreaChart data={filteredData} />
                <TopicDistributionChart data={filteredData} />

                {/* Key Metrics */}
                <IntensityChart data={filteredData} />
                <LikelihoodChart data={filteredData} />

                {/* Geographic & Temporal Analysis */}
                <YearTrendChart data={filteredData} />
                <CountryChart data={filteredData} />
                <RegionAnalysisChart data={filteredData} />

                {/* Advanced Analysis */}
                <SectorChart data={filteredData} hoveredItem={hoveredItem} onHover={setHoveredItem} />
                <PESTLEChart data={filteredData} hoveredItem={hoveredItem} onHover={setHoveredItem} />
                <SourceChart data={filteredData} hoveredItem={hoveredItem} onHover={setHoveredItem} />

                {/* Additional Analysis */}
                <IntensityByRegionChart data={filteredData} />
                <TopicsDistributionChart data={filteredData} />

                {/* Relevance Analysis (Moved to end) */}
                <RelevanceChart data={filteredData} />
                <RelevanceByTopicChart data={filteredData} />
              </div>
            </>
          )}

        </main>

        {/* Footer */}
        <footer className="mt-12 border-t border-[rgba(255,255,255,0.05)] bg-[#0B0B0B] py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-slate-400">
            <p>© 2025 Blackcoffer Insights Dashboard. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
