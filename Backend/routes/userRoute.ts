// routes/admin.routes.ts
import { Router } from 'express';
import { signInUser, signUpUser } from '../controllers/userController';
import { AddUserCart, DeleteCartItem, GetAllCartItem } from '../controllers/userCartController';
import { authenticateUsers } from '../middlewares/userAuthMiddleware';

const router = Router();

router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.post('/addCart',authenticateUsers,AddUserCart);
router.get('/getAllCart',authenticateUsers,GetAllCartItem)
router.delete('/deleteCartItem/:id',authenticateUsers,DeleteCartItem)



export default router;
