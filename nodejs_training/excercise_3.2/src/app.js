import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import envConfig from './config/env-config.js';
import routerUsers from './routes/users.js';
import routerPosts from './routes/posts.js';

const app = express();

app.use(bodyParser.json());
mongoose.connect(envConfig.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/users', routerUsers);
app.use('/api/posts', routerPosts);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message
  });
});

app.listen(3000, () => console.log('Server is running: http://localhost:' + envConfig.PORT));