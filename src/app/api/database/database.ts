// /src/app/database.ts

import path, { resolve } from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(process.cwd(), "projects.db");
export const db = new sqlite3.Database(
    dbPath,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connect to the profile database.");
     }
);

export const apiGet = async (query: string) => {
    return await new Promise((resolve, reject) => {
        db.all(query, (err: Error, row) => {
            if (err) {
                console.log(err);
                return reject(err);
            }
            return resolve(row);
        });
    });
};

