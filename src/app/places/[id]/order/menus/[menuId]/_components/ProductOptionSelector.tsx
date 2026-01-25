'use client'

import AppButton from '@/components/ui/AppButton'
import { toast } from '@/components/ui/AppToaster'
import BorderedSection from '@/components/ui/BorderedSection'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import SectionStack from '@/components/ui/SectionStack'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { ProductOption, ProductOptionGroup } from '@/domains/product'
import { SelectedOption, addToCart } from '@/lib/cart'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { IoIosCheckbox, IoIosCheckboxOutline } from 'react-icons/io'
import { RiRadioButtonFill } from 'react-icons/ri'
import ProductReviewTab from './ProductReviewTab'

interface ProductOptionSelectorProps {
  productId: number
  placeId: number
  placeName: string
  productName: string
  imageUrl: string
  basePrice: number
  originalPrice: number
  optionGroups: ProductOptionGroup[]
  reviewCount: number
}

export default function ProductOptionSelector({
  productId,
  placeId,
  placeName,
  productName,
  imageUrl,
  basePrice,
  originalPrice,
  optionGroups,
  reviewCount,
}: ProductOptionSelectorProps) {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState('options')

  // 각 옵션 그룹별 선택 상태 관리
  // isMultipleSelect가 false면 단일 선택(number), true면 다중 선택(number[])
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number | number[]>>(() => {
    const initial: Record<number, number | number[]> = {}
    optionGroups.forEach((group) => {
      if (group.isMultipleSelect) {
        initial[group.id] = []
      } else {
        // 기본값으로 첫 번째 옵션 선택
        const firstOption = group.options.find((opt) => !opt.isSoldOut)
        initial[group.id] = firstOption?.id ?? -1
      }
    })
    return initial
  })

  // 단일 선택 (라디오)
  const handleRadioSelect = useCallback((groupId: number, optionId: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [groupId]: optionId,
    }))
  }, [])

  // 다중 선택 (체크박스)
  const handleCheckboxToggle = useCallback(
    (groupId: number, optionId: number, maxSelect: number) => {
      setSelectedOptions((prev) => {
        const current = prev[groupId] as number[]
        if (current.includes(optionId)) {
          // 이미 선택된 경우 해제
          return {
            ...prev,
            [groupId]: current.filter((id) => id !== optionId),
          }
        } else {
          // 최대 선택 개수 체크
          if (current.length >= maxSelect) {
            return prev
          }
          return {
            ...prev,
            [groupId]: [...current, optionId],
          }
        }
      })
    },
    [],
  )

  // 선택된 옵션 정보 추출
  const getSelectedOptionsData = useCallback((): SelectedOption[] => {
    const result: SelectedOption[] = []

    optionGroups.forEach((group) => {
      const selected = selectedOptions[group.id]

      if (group.isMultipleSelect) {
        const selectedIds = selected as number[]
        selectedIds.forEach((optionId) => {
          const option = group.options.find((opt) => opt.id === optionId)
          if (option) {
            result.push({
              groupId: group.id,
              groupName: group.name,
              optionId: option.id,
              optionName: option.name,
              additionalPrice: option.additionalPrice,
            })
          }
        })
      } else {
        const optionId = selected as number
        const option = group.options.find((opt) => opt.id === optionId)
        if (option) {
          result.push({
            groupId: group.id,
            groupName: group.name,
            optionId: option.id,
            optionName: option.name,
            additionalPrice: option.additionalPrice,
          })
        }
      }
    })

    return result
  }, [optionGroups, selectedOptions])

  // 장바구니에 담기
  const handleAddToCart = useCallback(() => {
    const selectedOptionsData = getSelectedOptionsData()

    // 필수 옵션 체크
    const missingRequired = optionGroups.filter((group) => {
      if (!group.isRequired) return false
      const selected = selectedOptions[group.id]
      if (group.isMultipleSelect) {
        return (selected as number[]).length < group.minSelect
      }
      return selected === -1
    })

    if (missingRequired.length > 0) {
      alert(`필수 옵션을 선택해주세요: ${missingRequired.map((g) => g.name).join(', ')}`)
      return
    }

    addToCart({
      productId,
      placeId,
      placeName,
      productName,
      imageUrl,
      basePrice,
      originalPrice,
      selectedOptions: selectedOptionsData,
    })

    toast('메뉴를 장바구니에 담았습니다.')

    router.back()
  }, [
    productId,
    placeId,
    placeName,
    productName,
    imageUrl,
    basePrice,
    originalPrice,
    optionGroups,
    selectedOptions,
    getSelectedOptionsData,
    router,
  ])

  return (
    <>
      <BorderedSection className="border-b-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-0">
          <TabsList className="sticky top-0 w-full h-[50px] rounded-none bg-white z-40 p-0">
            <TabsTrigger
              value="options"
              className="flex-1 h-full text-sm leading-[14px] text-[#333333]/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-[1.5px] data-[state=active]:border-black"
            >
              옵션
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="flex-1 h-full text-sm leading-[14px] text-[#333333]/40 border-0 border-b border-[#eeeeee] rounded-none shadow-none cursor-pointer data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-[1.5px] data-[state=active]:border-black"
            >
              리뷰 ({reviewCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="options" className="mt-0">
            <SectionStack>
              {optionGroups.map((group) => (
                <BorderedSection key={group.id}>
                  <div className="px-4 py-5">
                    <h3 className="text-base leading-[16px] font-bold">
                      {group.name}
                      {group.isRequired && <span className="text-main ml-1">*</span>}
                    </h3>
                    <div className="flex flex-col gap-[15px] mt-5">
                      {group.options.map((option) => (
                        <OptionItem
                          key={option.id}
                          option={option}
                          isMultiple={group.isMultipleSelect}
                          isSelected={
                            group.isMultipleSelect
                              ? (selectedOptions[group.id] as number[]).includes(option.id)
                              : selectedOptions[group.id] === option.id
                          }
                          onSelect={() =>
                            group.isMultipleSelect
                              ? handleCheckboxToggle(group.id, option.id, group.maxSelect)
                              : handleRadioSelect(group.id, option.id)
                          }
                        />
                      ))}
                    </div>
                  </div>
                </BorderedSection>
              ))}
            </SectionStack>
          </TabsContent>
          <TabsContent value="reviews" className="mt-0">
            <ProductReviewTab productId={productId} />
          </TabsContent>
        </Tabs>
      </BorderedSection>
      <FixedBottomSection className="p-4">
        <AppButton className="!bg-[#a91201]" onClick={handleAddToCart}>
          장바구니 담기
        </AppButton>
      </FixedBottomSection>
      <div className="h-[82px] bg-white" />
    </>
  )
}

interface OptionItemProps {
  option: ProductOption
  isMultiple: boolean
  isSelected: boolean
  onSelect: () => void
}

function OptionItem({ option, isMultiple, isSelected, onSelect }: OptionItemProps) {
  const isDisabled = option.isSoldOut

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isDisabled}
      className={`flex items-center gap-2.5 w-full text-left cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isMultiple ? (
        isSelected ? (
          <IoIosCheckbox size={28} className="text-main flex-shrink-0" />
        ) : (
          <IoIosCheckboxOutline size={28} className="text-[#dddddd] flex-shrink-0" />
        )
      ) : isSelected ? (
        <RiRadioButtonFill size={28} className="text-main flex-shrink-0" />
      ) : (
        <RiRadioButtonFill size={28} className="text-[#dddddd] flex-shrink-0" />
      )}
      <span className="flex-1 text-sm leading-[14px]">
        {option.name}
        {option.isSoldOut && <span className="text-[#aaaaaa] ml-2">(품절)</span>}
      </span>
      {option.additionalPrice > 0 && (
        <span className="text-sm leading-[14px]">+{option.additionalPrice.toLocaleString()}원</span>
      )}
    </button>
  )
}
