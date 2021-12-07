import vars from './config/vars.js';
import logger from './config/logger.js';
import app from './config/express.js';
import mongoose from './config/mongoose.js';
import session from 'express-session';

mongoose();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.listen(vars.port, () => logger.info(`Server started on port ${vars.port} (${vars.env})`));

export default app;
