<<<<<<< HEAD
const db = require("./database/db")

db.run(`
ALTER TABLE ventas ADD COLUMN usuario TEXT
`,()=>{})

db.run(`
ALTER TABLE ventas ADD COLUMN mesa TEXT
`,()=>{})

=======
const db = require("./database/db")

db.run(`
ALTER TABLE ventas ADD COLUMN usuario TEXT
`,()=>{})

db.run(`
ALTER TABLE ventas ADD COLUMN mesa TEXT
`,()=>{})

>>>>>>> 441a63e5a263e53062084298d905b4c476e74a3c
console.log("Base de datos actualizada")