

export const price = (price: number, discount: number | null): string => {
  if(!discount){
    return price + '$'
  }
  return (price - (discount / 100 * price)).toFixed() + '$'
}