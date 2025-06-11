import type { ProductPreview } from "../types/productEntry";

export const productsList: ProductPreview[] = [
  {
    id: 1,
    name: 'Nike Air Force 1',
    manufacturer: 'Nike',
    thumbnail: '/src/assets/Nike1.png',
    modelUrl: '/models/nikeDRACO.glb',
    price: 900,
    customizable: true,
    filters: ['men', 'women', 'customizable']
  },
  {
    id: 2,
    name: 'Dior B44 Mesh',
    manufacturer: 'Dior',
    thumbnail: '/src/assets/diorB44.webp',
    modelUrl: '/models/dior_b44DRACO.glb',
    price: 900,
    customizable: true,
    filters: ['men', 'women', 'customizable']
  },
  {
    id: 3,
    name: 'Nike Jordan High 1',
    manufacturer: 'Nike',
    thumbnail: '/src/assets/jordans.webp',
    modelUrl: '/models/jordansDRACO.glb',
    price: 900,
    customizable: true,
    filters: ['men', 'women', 'customizable']
  },
]