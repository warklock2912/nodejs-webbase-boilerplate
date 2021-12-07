import { Router } from 'express'

import {
  showUserPage,
  loginPage,
  loginPost
} from '../controllers/user.controller.js'

const router = Router()

router.route('/')
  .get(showUserPage)

router.route('/login')
  .get(loginPage)

router.route('/login')
  .post(loginPost)

export default router;
