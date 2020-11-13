export default function GetRentPrice(
  category: 'padrao' | 'executivo' | 'vip',
): number {
  switch (category) {
    case 'padrao':
      return 99.99

    case 'executivo':
      return 199.99

    case 'vip':
      return 350
  }
}
