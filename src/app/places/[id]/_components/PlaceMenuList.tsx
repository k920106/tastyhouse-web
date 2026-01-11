import MenuCategoryItem from '@/components/menus/MenuCategoryItem'
import { PlaceMenuCategory } from '@/types/api/place-detail'

export function PlaceMenuListSkeleton() {}

interface PlaceMenuListProps {
  menus: PlaceMenuCategory[]
}

export default function PlaceMenuList({ menus }: PlaceMenuListProps) {
  if (menus.length === 0) {
    return <div className="py-10 bg-white text-center text-sm text-[#aaaaaa]">메뉴가 없습니다.</div>
  }

  return (
    <>
      {menus.map((menuCategory) => (
        <MenuCategoryItem
          key={menuCategory.categoryName}
          categoryName={menuCategory.categoryName}
          menus={menuCategory.menus}
        />
      ))}
    </>
  )
}
