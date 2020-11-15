const formatPhone = (phone: string): string =>
  phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)(\d{4})(\d{4})$/, '($1) $2 $3-$4')
export default formatPhone
