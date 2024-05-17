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

  private async initializeDb() {
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
    this.loadFavorites();
  }

  public async getFavorites() {
    return this.favorites;
  }

  public async addFavorite(favorite: Favorite) {
    const query = `INSERT INTO favorite (contentId, type) VALUES ('${favorite.contentId}', '${favorite.type}')`;
    try {
      await this.db.execute(query);
      return true;
    } catch (e) {
      return false;
    }
  }

  public async removeFavorite(contentId: string) {
    const query = `DELETE FROM favorite WHERE contentId='${contentId}'`;
    try {
      await this.db.execute(query);
      return true;
    } catch (e) {
      return false;
    }
  }

  private async loadFavorites() {
    let result = await this.db.query('SELECT * FROM favorite');
    this.favorites = result.values || [];
  }
}
