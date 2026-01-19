import { api } from "@/lib/api"
import { ApiResponse } from "@/types/api/api"
import { Banner, BannerQuery } from "./banner.type"

const ENDPOINT = '/api/banners'

export const bannerRepository = {
  async getBanners(params: BannerQuery) {
    return api.get<ApiResponse<Banner[]>>(`${ENDPOINT}/v1`, { params })
  },
}
