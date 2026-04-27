const mssql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // true para Azure, false para local
        trustServerCertificate: true 
    }
};

const getConnection = async () => {
    try {
        const pool = await mssql.connect(dbConfig);
        console.log("✅ Conexión a MS SQL Server exitosa");
        return pool;
    } catch (error) {
        console.error("❌ Error de conexión:", error);
    }
};

module.exports = { getConnection, mssql };