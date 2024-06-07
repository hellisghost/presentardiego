import { createPool } from "mysql2/promise";


export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cacao&canela",
    port: 3306
})
