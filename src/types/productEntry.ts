import type { mainFilters } from "../constants/mainFilters"

export type Filters = typeof mainFilters[number]

export type ProductPreview = {
  id: number,
  name: String,
  manufacturer: string,
  thumbnail: string, //link
  modelUrl?: string, //link
  customizable: boolean,
  discount?: number,
  price: number, //USD
  filters: Filters[]
}

export type Product = {
  id: number,
  name: String,
  manufacturer: string,
  thumbnail: string, //link
  modelUrl?: string //link,
  discount?: number,
  price: number, //USD
  sizes: number[],
  filters: typeof mainFilters[number][]
}