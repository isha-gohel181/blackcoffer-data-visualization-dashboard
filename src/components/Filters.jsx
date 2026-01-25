'use client'

import { useState, useMemo } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'


const SelectFilterComponent = ({ label, filterKey, options: filterOptions, loading, value, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-slate-300">
      {label}
    </label>
    {loading ? (
      <Skeleton className="h-10 w-full" />
    ) : (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] text-white text-xs h-8 px-2">
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

  const options = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        years: [],
        topics: [],
        regions: [],
        pestles: [],
        sectors: [],
        countries: [],
        sources: [],
      }
    }

    return {
      years: [...new Set(data.map(d => d.end_year).filter(Boolean))].sort((a, b) => b - a),
      topics: [...new Set(data.map(d => d.topic).filter(Boolean))].sort(),
      regions: [...new Set(data.map(d => d.region).filter(Boolean))].sort(),
      pestles: [...new Set(data.map(d => d.pestle).filter(Boolean))].sort(),
      sectors: [...new Set(data.map(d => d.sector).filter(Boolean))].sort(),
      countries: [...new Set(data.map(d => d.country).filter(Boolean))].sort(),
      sources: [...new Set(data.map(d => d.source).filter(Boolean))].sort(),
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 text-xs">
        <SelectFilterComponent label="End Year" filterKey="end_year" options={options.years} loading={loading} value={getSelectValue('end_year')} onChange={(v) => handleFilterChange('end_year', v)} />
        <SelectFilterComponent label="Topic" filterKey="topic" options={options.topics} loading={loading} value={getSelectValue('topic')} onChange={(v) => handleFilterChange('topic', v)} />
        <SelectFilterComponent label="Region" filterKey="region" options={options.regions} loading={loading} value={getSelectValue('region')} onChange={(v) => handleFilterChange('region', v)} />
        <SelectFilterComponent label="PESTLE" filterKey="pestle" options={options.pestles} loading={loading} value={getSelectValue('pestle')} onChange={(v) => handleFilterChange('pestle', v)} />
        <SelectFilterComponent label="Sector" filterKey="sector" options={options.sectors} loading={loading} value={getSelectValue('sector')} onChange={(v) => handleFilterChange('sector', v)} />
        <SelectFilterComponent label="Country" filterKey="country" options={options.countries} loading={loading} value={getSelectValue('country')} onChange={(v) => handleFilterChange('country', v)} />
        <SelectFilterComponent label="Source" filterKey="source" options={options.sources} loading={loading} value={getSelectValue('source')} onChange={(v) => handleFilterChange('source', v)} />
      </div>
    </div>
  )
}

