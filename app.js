const express = require('express');
const path = require('path'); // Para gestionar rutas de archivos
const morgan = require('morgan'); // Middleware para el registro de solicitudes
const bodyParser = require('body-parser'); // Middleware para analizar cuerpos de solicitudes
import express from 'express';
import cors from 'cors';  // Importar cors

// Configurar CORS para permitir todos los orígenes
app.use(cors());

// Alternativamente, podemos restringir el acceso a un dominio específico
// app.use(cors({ origin: 'http://frontend.com' }));

app.get('/api/data', (req, res) => {
    res.json({ message: "Solicitud exitosa desde un origen diferente" });
});


const app = express();
const comedorController = require('./controllers/comedorController');
const employeeController = require('./controllers/EmployeeController');
const attendanceStatController = require('./controllers/AttendanceStatController');

// Middleware para servir archivos estáticos desde la carpeta 'public'
// Crea esta carpeta y coloca allí tus archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));

// Middleware para analizar cuerpos de solicitudes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Para formularios URL encoded

// Rutas del comedor
app.get('/api/comedor', comedorController.getRecords);
app.post('/api/comedor', comedorController.createRecord);
app.put('/api/comedor/:id', comedorController.updateRecord);
app.delete('/api/comedor/:id', comedorController.deleteRecord);

// Configuración de rutas para empleados
app.get('/api/employees', employeeController.getRecords);
app.post('/api/employees', employeeController.createRecord);
app.put('/api/employees/:id', employeeController.updateRecord);
app.delete('/api/employees/:id', employeeController.deleteRecord);

// Rutas para empleados (si las tienes)
app.get('/api/empleados', (req, res) => {
    res.send("Aquí estarán las rutas para empleados cuando estén implementadas.");
});

// Rutas para estadísticas de asistencia
app.use('/api', attendanceStatController);

// Rutas para empleados (sin controlador definido)
app.post('/api/empleados', (req, res) => {
    res.send("Ruta para crear un empleado");
});

app.put('/api/empleados/:id', (req, res) => {
    res.send(`Actualizar empleado con id: ${req.params.id}`);
});

app.delete('/api/empleados/:id', (req, res) => {
    res.send(`Eliminar empleado con id: ${req.params.id}`);
});

// Rutas para index u otras secciones
app.get('/api/index', (req, res) => {
    res.send("Ruta para el índice o bienvenida");
});

// Ruta de bienvenida o índice
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de empleados.');
});

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Error en el servidor' });
});

// Puerto de escucha
const PORT = process.env.PORT || 3001; // Cambiado a 3001
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
