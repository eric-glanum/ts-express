import express, { Express } from 'express';
import indexRouter from '../routes/index';

export const server = (configure: (express: Express) => void) => {
  const app = express();
  app.use(express.json());
  app.use('/', indexRouter);
  app.listen(3001, () => {
    console.log('### test server open ###');
  });
  configure(app);
  return app;
};
