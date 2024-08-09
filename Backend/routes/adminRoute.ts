import { Router } from 'express';
import { signUpAdmin,signInAdmin } from '../controllers/adminController';

const router = Router();

router.post('/signup', signUpAdmin);
router.post('/signin', signInAdmin);


export default router;
