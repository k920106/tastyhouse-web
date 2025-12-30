'use client'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/shadcn/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/shadcn/popover'
import { PlaceStation } from '@/types/api/place'
import { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'

interface StationSelectorProps {
  stations: PlaceStation[]
  selectedStationId: number | undefined
  onSelect: (stationId: number | undefined) => void
}

export default function StationSelector({
  stations,
  selectedStationId,
  onSelect,
}: StationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="px-4 py-5 bg-white border-b border-[#eeeeee] box-border">
      <h2 className="mb-[15px] text-sm leading-[14px]">지하철역</h2>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="w-full h-10 px-3 text-[15px] text-left border border-[#eeeeee] rounded focus:outline-none focus:border-[#666666] flex items-center justify-between">
            <span className={selectedStationId ? 'text-[#333333]' : 'text-[#cccccc]'}>
              {selectedStationId
                ? stations.find((station) => station.id === selectedStationId)?.name
                : '지하철역을 선택해 주세요.'}
            </span>
            <IoChevronDown size={20} color="#999999" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-32px)] p-0" align="start">
          <Command
            defaultValue={
              selectedStationId
                ? stations.find((station) => station.id === selectedStationId)?.name
                : undefined
            }
          >
            <CommandInput placeholder="지하철역 검색..." />
            <CommandList>
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              <CommandGroup>
                {stations.map((station) => (
                  <CommandItem
                    key={station.id}
                    value={station.name}
                    onSelect={() => {
                      onSelect(station.id)
                      setIsOpen(false)
                    }}
                  >
                    {station.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </section>
  )
}
