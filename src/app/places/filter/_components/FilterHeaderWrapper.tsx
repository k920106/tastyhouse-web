'use client'

import FilterHeaderSection from './FilterHeaderSection'
import { useFilterState } from './FilterStateProvider'

export default function FilterHeaderWrapper() {
  const { handleReset } = useFilterState()
  return <FilterHeaderSection onReset={handleReset} />
}
