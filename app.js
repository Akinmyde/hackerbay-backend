import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', router);

app.all('*', (req, res) => {
  res.send({ status: 404, error: 'Sorry, the page you tried cannot be found' });
});

if (!module.parent) {
  app.listen(port);
}

export default app;
