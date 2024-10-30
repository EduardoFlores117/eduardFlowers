// Solo cargamos dotenv en desarrollo local
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const authController = require('./controllers/authController');
const authMiddleware = require('./middlewares/authMiddleware');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const comedorController = require('./controllers/comedorController');
const employeeController = require('./controllers/EmployeeController');
const attendanceStatController = require('./controllers/AttendanceStatController');

const PORT = process.env.PORT || 3000;
const API_HOST = process.env.API_HOST || 'https://api-eduardflowers.onrender.com';

// Configurar CORS para permitir solo el dominio especificado
app.use(cors({
    origin: API_HOST
}));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para registrar solicitudes HTTP
app.use(morgan('dev'));

// Middleware para analizar cuerpos de solicitudes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
                url: API_HOST,
                description: 'Servidor de producción'
            }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: "Ingrese el token en formato: Bearer <token>"
                }
            }
        },
        security: [
            {
                BearerAuth: [] // Esto aplica BearerAuth a todas las rutas de la API
            }
        ]
    },
    apis: ['./controllers/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de autenticación (sin protección)
app.use('/api/auth', authController);

// Aplicar el middleware de autenticación a todas las rutas que comienzan con /api, excluyendo /api/auth
app.use('/api', authMiddleware);

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
