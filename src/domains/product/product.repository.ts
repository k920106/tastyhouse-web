import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api/api'
import { ProductDetailResponse } from './product.type'

const ENDPOINT = '/api/products'

export const productRepository = {
  async getProductById(productId: number) {
    return api.get<ApiResponse<ProductDetailResponse>>(`${ENDPOINT}/v1/${productId}`)
  },
}
