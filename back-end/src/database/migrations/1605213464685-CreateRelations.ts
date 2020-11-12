import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class CreateRelations1605213464685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'rents',
      new TableForeignKey({
        name: 'UsersRent',
        columnNames: ['user_Id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )

    await queryRunner.createForeignKey(
      'rents',
      new TableForeignKey({
        name: 'CarsRent',
        columnNames: ['car_Id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cars',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rents', 'CarsRent')
    await queryRunner.dropForeignKey('rents', 'UsersRent')
  }
}
