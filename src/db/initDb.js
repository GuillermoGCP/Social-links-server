import pool from "./getPool.js";
import useDb from "./useDb.js";


const createDb= async()=>{
    try {
        await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.NAME_DB};`);

        await useDb();

        await pool.query(`DROP TABLE IF EXISTS users,links,userLink;`);

               
        await pool.query(`
        CREATE TABLE users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(64)NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(64) NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        );
        `);

        await pool.query(`
        CREATE TABLE links (
            id INT AUTO_INCREMENT PRIMARY KEY,
            url VARCHAR(255) NOT NULL,
            title VARCHAR(50) NOT NULL,
            description TEXT NOT NULL,
            ownerId INT NOT NULL,
            FOREIGN KEY (ownerId) REFERENCES users(id),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        );
        `);

        await pool.query(`
        CREATE TABLE userLink (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            linkId INT NOT NULL,
            rate INT NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (linkId) REFERENCES links(id),
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
        );
        `);
            
        console.log('Tablas de base de datos creada exitosamente');
    } catch (error) {
        console.error(error.message)
    } 
    
};

createDb()