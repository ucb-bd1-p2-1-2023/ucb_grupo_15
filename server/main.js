//Dependencias - Librerias
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

//config el cors
app.use(cors({
  origin: '*'
}));

//asignamos el puerto NO 5005
const port = 3000;

//ruta principal o vacia
app.get('/', (req, res) => {
  res.send('API is working');   //nos devuelve un mensaje
})

//agregar informacion GET obtener info
app.post('/Users',(req, res) => {
  const body = req.body;    //cuerpo de nuestra peticion lo que invia la interface user
  const query = `INSERT INTO Users(name, lastname, direction, cell, e_mail) VALUES ('${body.firstName}', '${body.lastName}', '${body.direccion}', '${body.cellphone}','${body.email}');`;   //consulta sql
  connection.connect(); // conectarse a la base de datos
  connection.query( query, (err, rows, fields) => { //ejecuta la linea de codigo 
    if (err) throw err  //si hay un error
    console.log('1 record inserted');   //nueva tupla fue insertada
  })
  res.send('1 record inserted');    //insertado fue exitoso
})

// coneccion con Pasajeros
app.post('/Pasajeros',(req, res) => {
  const body = req.body;    //cuerpo de nuestra peticion lo que invia la interface user
  const query = `INSERT INTO Pasajeros(id_users) VALUES ('${body.firstName}');`;   //consulta sql
  connection.connect(); // conectarse a la base de datos
  connection.query( query, (err, rows, fields) => { //ejecuta la linea de codigo 
    if (err) throw err  //si hay un error
    console.log('1 record inserted');   //nueva tupla fue insertada
  })
  res.send('1 record inserted');    //insertado fue exitoso
})

// para una nueva tabla de datps
// comunicacion entre la base de datos y el formulario
app.post('/Promociones',(req, res) => {
  const body = req.body;    //cuerpo de nuestra peticion lo que invia la interface user
  const query = `INSERT INTO Promociones(clave, descuento, date_ini, date_fin) VALUES ('${body.clave}', '${body.descuento}', '${body.fecha_ini}', '${body.fecha_fin}');`;   //consulta sql
  connection.connect(); // conectarse a la base de datos
  connection.query( query, (err, rows, fields) => { //ejecuta la linea de codigo 
    if (err) throw err  //si hay un error
    console.log('1 promocion fue añadida');   //nueva tupla fue insertada
  })
  res.send('1 promocion fue añadida');    //insertado fue exitoso
})
/*app.post('/car',(req, res) => {
    const body = req.body;    //cuerpo de nuestra peticion lo que invia la interface user
    const query = `INSERT INTO user(firstName, lastName, email) VALUES ('${body.firstName}', '${body.lastName}','${body.email}');`;   //consulta sql
    connection.connect(); // conectarse a la base de datos
    connection.query( query, (err, rows, fields) => { //ejecuta la linea de codigo 
      if (err) throw err  //si hay un error
      console.log('1 record inserted');   //nueva tupla fue insertada
    })
    connection.end();
    res.send('1 record inserted');    //insertado fue exitoso
  })*/

// config del puerto que se ejecute
app.listen(port, () => {
  console.log(`Project sample is running on: ${port}`)
})

// detalles para la coneccion con base de datos
const connection = mysql.createConnection({
  host: 'localhost',    //local
  port: '3306', //pueto por defecto
  user: 'root', //user se llam root
  password: 'password', //contraseña es root
  database: 'InDrive'
})

/*
function getID(){
  connection.query('SELECT * FROM Users WHERE id_users = ?', ['1'], (error, results, fields) => {
    if (error) {
      console.error('Error al realizar la consulta: ', error);
      return;
    }
  
    // Acceder al valor de la clave primaria en el resultado
    if (results.length > 0) {
      const primaryKeyValue = results[0].name;
      console.log('Valor de la clave primaria: ', primaryKeyValue);
      return primaryKeyValue;
    } else {
      console.log('No se encontró ningún registro.');
      return;
    }
  });
}


*/
connection.end();