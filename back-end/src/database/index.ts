import { createConnection } from 'typeorm'
import { v4 } from 'uuid'
import { hash } from 'bcryptjs'

createConnection().then(async connection => {
  const user = await connection
    .getRepository('User')
    .createQueryBuilder()
    .where('name = :name', { name: 'admin' })
    .getOne()
  if (!user) {
    connection
      .createQueryBuilder()
      .insert()
      .into('users')
      .values([
        {
          id: v4(),
          name: 'admin',
          cpf: '000.138.060-50',
          email: 'admin@admin.com',
          password: await hash('admin', 8),
          cellphone: 53984523422,
          birthdate: new Date(2020, 11, 11),
          is_Adm: true,
          created_at: new Date(2020, 11, 11),
          updated_at: new Date(2020, 11, 11),
        },
      ])
      .execute()
  }
})
