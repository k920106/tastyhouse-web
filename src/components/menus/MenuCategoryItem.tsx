import { PlaceMenu } from '@/types/api/place-detail'
import { Skeleton } from '../ui/shadcn/skeleton'
import MenuItem, { MenuItemSkeleton } from './MenuItem'

export function MenuCategoryItemSkeleton() {
  return (
    <div className="pt-[30px] border-b border-[#eeeeee] box-border">
      <Skeleton className="w-20 h-[16px] mb-[5px]" />
      <div className="divide-y divide-[#eeeeee]">
        <MenuItemSkeleton />
        <MenuItemSkeleton />
        <MenuItemSkeleton />
      </div>
    </div>
  )
}

interface MenuCategoryItemProps {
  categoryName: string
  menus: PlaceMenu[]
}

export default function MenuCategoryItem({ categoryName, menus }: MenuCategoryItemProps) {
  return (
    <div className="pt-[30px] border-b border-[#eeeeee] box-border">
      <h3 className="mb-[5px] text-base leading-[16px] font-bold">{categoryName}</h3>
      <div className="divide-y divide-[#eeeeee]">
        {menus.map((menu) => (
          <MenuItem key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  )
}
