function formatarData(data: string): string {
  data = data.replace(/\D/g, '')
  data = data.replace(/(\d{2})(\d)/, '$1/$2')
  data = data.replace(/(\d{2})(\d)/, '$1/$2')
  return data
}
export default formatarData
