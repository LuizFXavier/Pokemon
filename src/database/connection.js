import pg from "pg";

export default new pg.Pool({
    user:"postgres",
    host:"localhost",
    database:"tuaMae",
    password:"postgres",
    port:5432
})
