import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import router from './routes/users.js'; 
import envConfig from './config/env-config.js'; 

const app = express();


// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect(envConfig.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Routes
app.use('/api/users', router);


// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message
    });
});


app.listen(3000, () => console.log('Server is running: http://localhost:'+envConfig.PORT));