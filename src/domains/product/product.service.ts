import { productRepository } from './product.repository'

export const productService = {
  async getProductById(productId: number) {
    return productRepository.getProductById(productId)
  },
}
