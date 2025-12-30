'use client'

import FilterApplyButton from './FilterApplyButton'
import { useFilterState } from './FilterStateProvider'

export default function FilterApplyButtonWrapper() {
  const { hasSelection, handleApplyFilter } = useFilterState()

  return <FilterApplyButton hasSelection={hasSelection} onApply={handleApplyFilter} />
}
