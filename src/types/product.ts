import type { mainFilters } from "../constants/mainFilters"

export type Filters = typeof mainFilters[number]

export type ProductPreview = {
  id: number,
  name: String,
  manufacturer: string,
  thumbnail: string, //link
  customizable: boolean,
  discount?: number,
  price: number, //USD
  filters: Filters[],
  seller_username: string,
}

export type Product = {
  id: number,
  name: String,
  manufacturer: string,
  images: string[], //link
  modelUrl?: string //link,
  customizable: boolean,
  discount?: number,
  price: number, //USD
  sizes: number[],
  filters: Filters[],
  seller_id: string,
  seller_username: string,
}

export type SearchProduct = {
  id: number, 
  name: string, 
  manufacturer: string,
  thumbnail: string //link
}