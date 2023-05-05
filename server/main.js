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
  res.send('API is working - Mauri el profesor');   //nos devuelve un mensaje
})

//agregar informacion GET obtener info
app.post('/driver',(req, res) => {
  const body = req.body;    //cuerpo de nuestra peticion lo que invia la interface user
  const query = `INSERT INTO user(firstName, lastName, email) VALUES ('${body.firstName}', '${body.lastName}','${body.email}');`;   //consulta sql
  connection.connect(); // conectarse a la base de datos
  connection.query( query, (err, rows, fields) => { //ejecuta la linea de codigo 
    if (err) throw err  //sia hay un error
    console.log('1 record inserted');   //nueva tupla fue insertada
  })
  connection.end();
  res.send('1 record inserted');    //insertado fue exitoso
})

// para una nueva tabla de datps
// comunicacion entre la base de datos y el formulario
app.post('/car',(req, res) => {
    const body = req.body;    //cuerpo de nuestra peticion lo que invia la interface user
    const query = `INSERT INTO user(firstName, lastName, email) VALUES ('${body.firstName}', '${body.lastName}','${body.email}');`;   //consulta sql
    connection.connect(); // conectarse a la base de datos
    connection.query( query, (err, rows, fields) => { //ejecuta la linea de codigo 
      if (err) throw err  //sia hay un error
      console.log('1 record inserted');   //nueva tupla fue insertada
    })
    connection.end();
    res.send('1 record inserted');    //insertado fue exitoso
  })

// config del puerto que se ejecute
app.listen(port, () => {
  console.log(`Project sample is running on: ${port}`)
})

// detalles para la coneccion con base de datos
const connection = mysql.createConnection({
  host: 'localhost',    //local
  port: '3306', //pueto por defecto
  user: 'root', //user se llam root
  password: 'root', //contraseña es root
  database: 'db1'
})
