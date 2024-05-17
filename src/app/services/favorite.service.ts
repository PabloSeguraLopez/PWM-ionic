import { Injectable } from '@angular/core';
import { Favorite } from "../interfaces/favorite";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private favorites: Favorite[] = [];

  constructor() {
    this.initializeDb();
  }

  async initializeDb() {
    this.db = await this.sqlite.createConnection(
      'data.db',
      false,
      'no-encryption',
      1,
      false
    );
    await this.db.open();

    const createFavoriteTable = `CREATE TABLE IF NOT EXISTS favorite (
      contentId TEXT PRIMARY KEY,
      type TEXT
      );`;

    console.log('Creating favorite table')
    await this.db.execute(createFavoriteTable);
  }

  async getFavorites() {
    return this.db.query('SELECT * FROM favorite');
    // this.favorites = favorites.values;
  }

  addFavorite(favorite: Favorite) {
    const query = 'INSERT INTO favorite (contentId, type) VALUES (${favorite.contentId}, ${favorite.type})';
    return this.db.execute(query);
  }
}
