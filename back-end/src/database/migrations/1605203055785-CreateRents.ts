import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRents1605203055785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rents',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },

          {
            name: 'date_From',
            type: 'Date',
          },
          {
            name: 'date_Until',
            type: 'Date',
          },
          {
            name: 'price',
            type: 'decimal',
          },

          {
            name: 'user_Id',
            type: 'uuid',
          },
          {
            name: 'car_Id',
            type: 'integer',
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rents')
  }
}
