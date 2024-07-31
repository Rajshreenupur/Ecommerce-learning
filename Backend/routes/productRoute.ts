import { Router } from 'express';
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllers/productController';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = Router();

router.post('/create',authenticateUser, createProduct );
router.get('/get/:id', authenticateUser,getProduct );
router.put('/update/:id',authenticateUser, updateProduct );
router.delete('/delete/:id',authenticateUser, deleteProduct );
router.get('/getAllProduct', authenticateUser,getAllProduct );

export default router;
