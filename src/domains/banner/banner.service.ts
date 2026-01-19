import { bannerRepository } from './banner.repository'
import { BannerQuery } from './banner.type'

export const bannerService = {
  async getBanners(params: BannerQuery) {
    return bannerRepository.getBanners(params)
  },
}
