// Dependencias - Librerias
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

// Configurar el CORS
app.use(cors({
  origin: '*'
}));

// Asignar el puerto NO 5005
const port = 3000;

// Ruta principal o vacía
app.get('/', (req, res) => {
  res.send('API is working');   // Nos devuelve un mensaje
});

// Agregar información GET obtener info
app.post('/Users', (req, res) => {
  const body = req.body;    // Cuerpo de nuestra petición lo que envía la interfaz de usuario
  const query = `INSERT INTO Users(id_users, name, lastname, direction, cell, e_mail) VALUES ('${body.carnet}', '${body.firstName}', '${body.lastName}', '${body.direccion}', '${body.cellphone}','${body.email}');`;   // Consulta SQL
  connection.query(query, (err, rows, fields) => { // Ejecuta la consulta
    if (err) throw err;  // Si hay un error
    console.log('1 user inserted');   // Nueva tupla fue insertada
    res.send('1 user inserted');    // Insertado fue exitoso
  });
});

app.post('/Pasajeros', (req, res) => {
  const body = req.body;    // Cuerpo de nuestra petición lo que envía la interfaz de usuario
  const query = `INSERT INTO Pasajeros(id_user) VALUES ('${body.carnet}');`;   // Consulta SQL
  connection.query(query, (err, rows, fields) => { // Ejecuta la consulta
    if (err) throw err;  // Si hay un error
    console.log('1 pasajero inserted');   // Nueva tupla fue insertada
    res.send('1 pasajero inserted');    // Insertado fue exitoso
  });
});

// Agregar información GET obtener info
app.post('/Driver', (req, res) => {
  const body = req.body;    // Cuerpo de nuestra petición lo que envía la interfaz de usuario
  const query = `INSERT INTO Driver(id_user, id_vehiculo) VALUES ('${body.carnet}', '${body.placa}');`;   // Consulta SQL
  connection.query(query, (err, rows, fields) => { // Ejecuta la consulta
    if (err) throw err;  // Si hay un error
    console.log('1 Driver inserted');   // Nueva tupla fue insertada
    res.send('1 Driver inserted');    // Insertado fue exitoso
  });
});

app.post('/Vehiculo', (req, res) => {
  const body = req.body;    // Cuerpo de nuestra petición lo que envía la interfaz de usuario
  const query = `INSERT INTO Vehiculo(placa, modelo, capacidad) VALUES ('${body.placa}', '${body.modelo}', '${body.capacidad}');`;   // Consulta SQL
  connection.query(query, (err, rows, fields) => { // Ejecuta la consulta
    if (err) throw err;  // Si hay un error
    console.log('1 vehiculo inserted');   // Nueva tupla fue insertada
    res.send('1 vehiculo inserted');    // Insertado fue exitoso
  });
});

app.post('/Calificaciones', (req, res) => {
  const body = req.body;    // Cuerpo de nuestra petición lo que envía la interfaz de usuario
  const query = `INSERT INTO Calificaciones(puntuacion, comentario) VALUES ('${body.puntuacion}', '${body.comentario}');`;   // Consulta SQL
  connection.query(query, (err, rows, fields) => { // Ejecuta la consulta
    if (err) throw err;  // Si hay un error
    console.log('1 Calificacion inserted');   // Nueva tupla fue insertada
    res.send('1 Calificacion inserted');    // Insertado fue exitoso
  });
});

app.post('/Viajes', (req, res) => {
  const body = req.body;    // Cuerpo de nuestra petición lo que envía la interfaz de usuario
  const query = `INSERT INTO Viajes(monto, fecha, hora, origen, destino, duracion, distancia) VALUES ('${body.montoViaje}', '${body.fechaViaje}', '${body.horaViaje}', '${body.origenViaje}', '${body.destinoViaje}', '${body.duracionViaje}', '${body.distanciaViaje}');`;   // Consulta SQL
  connection.query(query, (err, rows, fields) => { // Ejecuta la consulta
    if (err) throw err;  // Si hay un error
    console.log('1 Viaje inserted');   // Nueva tupla fue insertada
    res.send('1 Viaje inserted');    // Insertado fue exitoso
  });
});

// Agregar promociones
app.post('/Promociones', (req, res) => {
  const body = req.body;    // Cuerpo de nuestra petición lo que envía la interfaz de usuario
  const query = `INSERT INTO Promociones(clave, descuento, date_ini, date_fin) VALUES ('${body.clave}', '${body.descuento}', '${body.fecha_ini}', '${body.fecha_fin}');`;   // Consulta SQL
  connection.query(query, (err, rows, fields) => { // Ejecuta la consulta
    if (err) throw err;  // Si hay un error
    console.log('1 promoción fue añadida');   // Nueva tupla fue insertada
    res.send('1 promoción fue añadida');    // Insertado fue exitoso
  });

  // Cerrar la conexión después de finalizar todas las consultas
  connection.end();
});

// Configurar el puerto en el que se ejecuta
app.listen(port, () => {
  console.log(`Project sample is running on: ${port}`);
});

// Detalles para la conexión con la base de datos
const connection = mysql.createConnection({
  host: 'localhost',    // Localhost
  port: '3306', // Puerto por defecto
  user: 'root', // Usuario (root por ejemplo)
  password: 'password', // Contraseña (root por ejemplo)
  database: 'InDrive'
});
