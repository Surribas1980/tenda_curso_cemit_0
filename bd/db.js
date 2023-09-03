// Core Node
const fs = require('fs');

// Core sqlite
const sqlite3 = require("sqlite3").verbose();
////////////////////

const filepath = "./tenda.db";

function createDbConnection() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the tenda database.');
});
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    console.log("Connection with SQLite has been established");
    return db;
  }
}

function createTable(db) {
  db.exec(`
  create table if not exists producto (
  id_prod integer,
  nombre_prod varchar(50) primary key,
  precio_prod real
);

create table if not exists usuarios (
  id_cli integer,
  rol_cli varchar(9),
  pwd_cli varchar(9),
  dni_cli varchar(9),
  img_cli varchar(9),
  nombre_cli varchar(50),
  email_cli varchar(50) primary key
);

create table if not exists producto_pedido(
  id_produ_pedi integer,
  nombre_produ_pedi varchar(50),
  numpedido_produ_pedi integer,
  FOREIGN KEY(nombre_produ_pedi) REFERENCES producto(nombre_prod),
  FOREIGN KEY(numpedido_produ_pedi) REFERENCES producto(id_pedi)
);

create table if not exists pedido(
  id_pedi integer primary key,
  mail_cli_pedi varchar(50),
  precio_total_pedi real,
  id_cesta_pedi integer,
  FOREIGN KEY(mail_cli_pedi) REFERENCES usuarios(mail_cli),
  FOREIGN KEY(id_cesta_pedi) REFERENCES cesta(id_producto_comprado_cest)
);

create table if not exists cesta(
  id_producto_comprado_cest integer primary key,
  nombre_producto_cest varchar(50),
  cantidad_pedida_cest integer,
  coste_total_cantidadpedida_cest real,
  fecha date,
  FOREIGN KEY(nombre_producto_cest) REFERENCES producto(nombre_prod)
);

  `)
}

module.exports = createDbConnection();