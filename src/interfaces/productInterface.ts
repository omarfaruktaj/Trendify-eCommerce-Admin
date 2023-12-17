export interface Product {
  name: string
  slug: string
  description: string
  images: [{ public_id: string; url: string }]
  category: string
  colors: [
    {
      name: string
      colorCode: string
    }
  ]
  sizes: [
    {
      size: string
    }
  ]
  price: number
  priceDiscount: number
  quantity: number
  isOutOfStock: boolean
  sold: boolean
  ratingsAverage: number
  ratingsQuantity: number
}
