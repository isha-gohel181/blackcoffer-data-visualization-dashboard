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
import { Skeleton } from '@/components/ui/skeleton'


export default function Filters({ onFilterChange, data, loading }) {
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    region: '',
    pestle: '',
    sector: '',
    country: '',
    source: '',
  })

  const [options, setOptions] = useState({
    years: [],
    topics: [],
    regions: [],
    pestles: [],
    sectors: [],
    countries: [],
    sources: [],
  })

  useEffect(() => {
    if (data && data.length > 0) {
      const uniqueYears = [...new Set(data.map(d => d.end_year).filter(Boolean))].sort((a, b) => b - a)
      const uniqueTopics = [...new Set(data.map(d => d.topic).filter(Boolean))].sort()
      const uniqueRegions = [...new Set(data.map(d => d.region).filter(Boolean))].sort()
      const uniquePestles = [...new Set(data.map(d => d.pestle).filter(Boolean))].sort()
      const uniqueSectors = [...new Set(data.map(d => d.sector).filter(Boolean))].sort()
      const uniqueCountries = [...new Set(data.map(d => d.country).filter(Boolean))].sort()
      const uniqueSources = [...new Set(data.map(d => d.source).filter(Boolean))].sort()

      setOptions({
        years: uniqueYears,
        topics: uniqueTopics,
        regions: uniqueRegions,
        pestles: uniquePestles,
        sectors: uniqueSectors,
        countries: uniqueCountries,
        sources: uniqueSources,
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
    const emptyFilters = { end_year: '', topic: '', region: '', pestle: '', sector: '', country: '', source: '' }
    setFilters(emptyFilters)
    onFilterChange(emptyFilters)
  }

  const getSelectValue = (key) => {
    return filters[key] === '' ? 'all' : filters[key]
  }

  const SelectFilterComponent = ({ label, filterKey, options: filterOptions }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Select value={getSelectValue(filterKey)} onValueChange={(value) => handleFilterChange(filterKey, value)}>
          <SelectTrigger className="w-full border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] text-white">
            <SelectValue placeholder={`All ${label}`} />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1A1A] border-[rgba(255,255,255,0.1)] text-white">
            <SelectItem value="all">All {label}</SelectItem>
            {filterOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <SelectFilterComponent label="End Year" filterKey="end_year" options={options.years} />
        <SelectFilterComponent label="Topic" filterKey="topic" options={options.topics} />
        <SelectFilterComponent label="Region" filterKey="region" options={options.regions} />
        <SelectFilterComponent label="PESTLE" filterKey="pestle" options={options.pestles} />
        <SelectFilterComponent label="Sector" filterKey="sector" options={options.sectors} />
        <SelectFilterComponent label="Country" filterKey="country" options={options.countries} />
        <SelectFilterComponent label="Source" filterKey="source" options={options.sources} />
      </div>
    </div>
  )
}

