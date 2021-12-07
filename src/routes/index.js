import express from 'express';
import userRoutes from './user.route.js'
import indexPage from '../controllers/index.controller.js'

const router = express.Router();

/* GET home page. */
router.route('/').get(indexPage);

router.use('/user', userRoutes)

export default router;
