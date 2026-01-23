'use client'

import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export default function Filters({ onFilterChange, data }) {
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    region: '',
    pestle: '',
  })

  const [options, setOptions] = useState({
    years: [],
    topics: [],
    regions: [],
    pestles: [],
  })

  useEffect(() => {
    if (data && data.length > 0) {
      const uniqueYears = [...new Set(data.map(d => d.end_year).filter(Boolean))].sort((a, b) => b - a)
      const uniqueTopics = [...new Set(data.map(d => d.topic).filter(Boolean))].sort()
      const uniqueRegions = [...new Set(data.map(d => d.region).filter(Boolean))].sort()
      const uniquePestles = [...new Set(data.map(d => d.pestle).filter(Boolean))].sort()

      setOptions({
        years: uniqueYears,
        topics: uniqueTopics,
        regions: uniqueRegions,
        pestles: uniquePestles,
      })
    }
  }, [data])

  const handleFilterChange = (key, value) => {
    // Convert "all" to empty string for API query
    const filterValue = value === 'all' ? '' : value
    const newFilters = { ...filters, [key]: filterValue }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const emptyFilters = { end_year: '', topic: '', region: '', pestle: '' }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const getSelectValue = (key) => {
    return filters[key] === '' ? 'all' : filters[key]
  }

  return (
    <div className="rounded-lg border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <Button
          onClick={clearFilters}
          variant="ghost"
          className="text-slate-400 hover:text-slate-300"
        >
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Year Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            End Year
          </label>
          <Select value={getSelectValue('end_year')} onValueChange={(value) => handleFilterChange('end_year', value)}>
            <SelectTrigger className="w-full border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] text-white">
              <SelectValue placeholder="All Years" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[rgba(255,255,255,0.1)] text-white">
              <SelectItem value="all">All Years</SelectItem>
              {options.years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Topic Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Topic
          </label>
          <Select value={getSelectValue('topic')} onValueChange={(value) => handleFilterChange('topic', value)}>
            <SelectTrigger className="w-full border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] text-white">
              <SelectValue placeholder="All Topics" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[rgba(255,255,255,0.1)] text-white">
              <SelectItem value="all">All Topics</SelectItem>
              {options.topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Region Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Region
          </label>
          <Select value={getSelectValue('region')} onValueChange={(value) => handleFilterChange('region', value)}>
            <SelectTrigger className="w-full border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] text-white">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[rgba(255,255,255,0.1)] text-white">
              <SelectItem value="all">All Regions</SelectItem>
              {options.regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* PESTLE Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-300">
            Pastle
          </label>
          <Select value={getSelectValue('pestle')} onValueChange={(value) => handleFilterChange('pestle', value)}>
            <SelectTrigger className="w-full border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] text-white">
              <SelectValue placeholder="All PESTLE" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-[rgba(255,255,255,0.1)] text-white">
              <SelectItem value="all">All Pastle</SelectItem>
              {options.pestles.map((pestle) => (
                <SelectItem key={pestle} value={pestle}>
                  {pestle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
