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

export default function Home() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    region: '',
    pestle: '',
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
        <header className="border-b border-[rgba(255,255,255,0.05)] bg-[#0B0B0B]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Insights Dashboard
                </h1>
                <p className="mt-2 text-slate-400">
                  Explore and analyze business intelligence data
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <Filters onFilterChange={handleFilterChange} data={data} />

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-400">Total Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {filteredData.length}
                </div>
              </CardContent>
            </Card>
            <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-400">Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {new Set(filteredData.map(d => d.topic)).size}
                </div>
              </CardContent>
            </Card>
            <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-400">Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {new Set(filteredData.map(d => d.region)).size}
                </div>
              </CardContent>
            </Card>
            <Card className="border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-slate-400">Years Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">
                  {new Set(filteredData.map(d => d.end_year)).size}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          {loading ? (
            <Card className="mt-8 border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
              <CardContent className="flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[rgba(255,255,255,0.1)] border-t-blue-400"></div>
                  <p className="mt-4 text-slate-400">Loading data...</p>
                </div>
              </CardContent>
            </Card>
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
                {/* Area Chart */}
                <IntensityLikelihoodAreaChart data={filteredData} />

                {/* Pie Chart */}
                <TopicDistributionChart data={filteredData} />

                {/* Relevance Chart */}
                <RelevanceByTopicChart data={filteredData} />

                {/* Intensity by Region Chart */}
                <IntensityByRegionChart data={filteredData} />
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
