import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Songs extends BaseSchema {
  protected tableName = 'songs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable();
      table.string('type').notNullable();
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
