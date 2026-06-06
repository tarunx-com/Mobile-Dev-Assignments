import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('safesteer.db');

export type History = {
	id: number;
    score: number;
    distance: number;
	date: string;
	duration: number;
};

export async function initDB() {

    await db.execSync(`
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            score INTEGER,
            distance REAL,
            date TEXT DEFAULT (datetime('now')),
            duration INTEGER
        );
    `);
}

export const getAll = () =>
	db.getAllAsync<History>("SELECT * FROM history ORDER BY id DESC");

export const insert=(
    score:number,
    distance:number,
    duration:number
) =>{
    db.runSync(
        'INSERT INTO history (score,distance,duration) VALUES (?,?,?)',
        [score,distance,duration],
    )
}

export const getOne = () =>
	db.getAllAsync<History>("SELECT * FROM history ORDER BY id DESC LIMIT 1");

export const remove = (id: number) =>
	db.runAsync("DELETE FROM snippets WHERE id = ?", [id]);

export default db;