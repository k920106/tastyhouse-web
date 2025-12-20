import { PrizeItem } from '@/types/api/rank'
import Image from 'next/image'

interface TopPrizesListProps {
  prizes: PrizeItem[]
}

export default function TopPrizesList({ prizes }: TopPrizesListProps) {
  return (
    <>
      {prizes.map((product) => (
        <div key={product.id} className="flex flex-col flex-1 items-center min-w-0">
          <div className="relative w-full max-w-[144px] mb-[15px] aspect-square">
            <div className="absolute top-0 left-0 z-10 w-[25%]">
              <Image
                src={`/images/rank/icon-rank-0${product.prizeRank}.png`}
                alt={`${product.prizeRank}등`}
                width={70}
                height={70}
                className="w-full h-auto"
              />
            </div>
            <div className="flex items-center justify-center w-full h-full bg-white border border-[#eeeeee] rounded-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={80}
                height={80}
                className="w-[55%] h-auto"
              />
            </div>
          </div>
          <div className="flex flex-col gap-0.5 w-full text-center">
            <p className="text-[11px] truncate">{product.brand}</p>
            <p className="text-[11px] truncate">{product.name}</p>
          </div>
        </div>
      ))}
    </>
  )
}
