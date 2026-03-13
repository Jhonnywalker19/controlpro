const db = require("./database/db")

db.run(`
ALTER TABLE ventas ADD COLUMN usuario TEXT
`,()=>{})

db.run(`
ALTER TABLE ventas ADD COLUMN mesa TEXT
`,()=>{})

console.log("Base de datos actualizada")