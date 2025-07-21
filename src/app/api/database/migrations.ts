import { db } from "./database";

export const migrate = () => {
    db.serialize(() => {
        db.run(
            `
            CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY AUTOINCREMENT, 
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            imageUrl TEXT NOT NULL),
            articleUrl TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL
        );
        `,
        (err: Error) => {
            if (err) {
                console.error(err.message);
            }
            console.log("articles table created successfully.");
        }
        );
    });
}