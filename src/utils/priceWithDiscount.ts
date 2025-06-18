

export const priceWithDiscount = (price: number, discount: number): number => {
  return +(price - (discount / 100 * price)).toFixed()
} 