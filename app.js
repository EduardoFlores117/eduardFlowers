// Solo cargamos dotenv en desarrollo local
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();  // Esto solo lee .env si no estás en producción
}

const express = require('express');
const path = require('path'); // Para gestionar rutas de archivos
const morgan = require('morgan'); // Middleware para el registro de solicitudes
const bodyParser = require('body-parser'); // Middleware para analizar cuerpos de solicitudes
const cors = require('cors');
const authController = require('./controllers/authController'); // Importar el controlador de autenticación
const authMiddleware = require('./middlewares/authMiddleware'); // Importar el middleware de autenticación

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express'); // Importa Swagger UI

const app = express();
const comedorController = require('./controllers/comedorController');
const employeeController = require('./controllers/EmployeeController');
const attendanceStatController = require('./controllers/AttendanceStatController');

// Definir el puerto y el host desde variables de entorno o usar valores predeterminados
const PORT = process.env.PORT || 3000;
const API_HOST = process.env.API_HOST || 'https://api-eduardflowers.onrender.com';

// Configurar CORS para permitir solo el dominio especificado
app.use(cors({
    origin: API_HOST
}));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));

// Middleware para analizar cuerpos de solicitudes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Para formularios URL encoded

// Configuración de Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Empleados',
            version: '1.0.0',
            description: 'Documentación de la API de Empleados',
            contact: {
                name: 'Eduardo',
                email: 'eduardo@example.com'
            }
        },
        servers: [
            {
                url: API_HOST, // Usar la variable de entorno para el host
                description: 'Servidor de producción'
            }
        ]
    },
    apis: ['./controllers/*.js'], // Ruta donde Swagger buscará los comentarios JSDoc
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // Ruta de Swagger

// Rutas de autenticación (sin protección)
app.use('/api/auth', authController); // Rutas de registro e inicio de sesión

// Aplicar el middleware de autenticación a todas las rutas que comienzan con /api, excluyendo /api/auth
app.use('/api', authMiddleware); // Este middleware se aplicará a las rutas que comienzan con /api, pero no afectará a /api/auth

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

// Rutas para estadísticas de asistencia
app.use('/api/attendance-stats', attendanceStatController);

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
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en ${API_HOST} en el puerto ${PORT}`);
});
