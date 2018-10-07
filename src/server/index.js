import express from 'express';
import bodyParser from 'body-parser';
import routes from '../routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', routes);

// Trata erro de digitação da url
app.use((req, res, next) => {
  const err = new Error('Não Encontrado');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({"err":"Rota Invalida"});
});


export default app;