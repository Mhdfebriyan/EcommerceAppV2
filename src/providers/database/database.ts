
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }
  public getDB() {
    return this.sqlite.create({
      name: 'product.db',
      location: 'default'
    });
  }
public createDatabase() {
  return this.getDB().then((db: SQLiteObject) => {
    this.createTables(db);
  }).catch(e => console.error(e));
}
private createTables(db: SQLiteObject) {
  db.sqlBatch([['CREATE TABLE IF NOT EXISTS myfavorite (id INTEGER PRIMARY KEY AUTOINCREMENTNOT NULL, id_product INTEGER, name TEXT, price REAL, category TEXT, image TEXT)']
  ])
  .then(() => console.log("Table created!"))
  .catch(e => console.error('Error create table', e));
}

}
