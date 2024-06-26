const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const { xss } = require('express-xss-sanitizer')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')

// Require swagger
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

// Route files
const hospitals = require('./routes/hospitals')
const auth = require('./routes/auth')
const appointments = require('./routes/appointments')

// Load env vars
dotenv.config({path: './config/config.env'})

// Connect to database
connectDB()

const app = express()

// Define Rate Limiting
const limiter = rateLimit({
    windowsMs: 10*60*1000, // equals 10 mins
    max: 100
})

// Define Swagger Options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A Simple Express VacQ API'
        },
        servers: [
            {
                url: 'http://localhost:8000/api/v1'
            }
        ]
    },
    apis: ['./routes/*.js']
}

// Use SwaggerDocs
const swaggerDocs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// Enable CORS
app.use(cors())

// Body Parser
app.use(express.json())
app.use(cookieParser())

// Sanitize Data
app.use(mongoSanitize())

// Set Security Headers
app.use(helmet())

// Prevent XSS Attacks
app.use(xss())

// Use Rate Limiters
app.use(limiter)

// Prevent http param pollutions
app.use(hpp())




// Mount routers
app.use('/api/v1/hospitals', hospitals)
app.use('/api/v1/auth', auth)
app.use('/api/v1/appointments', appointments)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log('Server running in ', process.env.NODE_ENV, ' mode on port ', PORT))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)

    // close server and exit process
    server.close(() => process.exit(1))
})