interface IResquet {
  date_From: string
  date_Until: string
}

export default function DiffDays({ date_From, date_Until }: IResquet): number {
  const [dayF, monthF, yearF] = date_From.split('/')
  const [dayU, monthU, yearU] = date_Until.split('/')

  const DateF = new Date(
    (yearF as unknown) as number,
    ((monthF as unknown) as number) - 1,
    (dayF as unknown) as number,
  )

  const DateU = new Date(
    (yearU as unknown) as number,
    ((monthU as unknown) as number) - 1,
    (dayU as unknown) as number,
  )

  const timeDiff = Math.abs(DateU.getTime() - DateF.getTime())
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
  return diffDays
}
