import express, { type Request, type Response } from 'express';
import fooController from './foos.js';
import users from './lib/controllers/users.js';

const app = express();

const server = app.listen(parseInt(process.env.APP_PORT || '7890'), () => {
  console.log('Started server on ', server.address());
});

// Think of the poor foos.
app.use('/foos', fooController);
app.use('/api/v1/users', users);

app.all('*', (req: Request, res: Response) => {
  console.log(`404 for ${req.url}`);
  res.status(404).send({ error: 404, message: `URL ${req.url} not found` });
});

export default server;
