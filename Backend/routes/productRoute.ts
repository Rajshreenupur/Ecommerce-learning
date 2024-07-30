import { Router } from 'express';
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllers/productController';

const router = Router();

router.post('/create', createProduct );
router.get('/get/:id', getProduct );
router.put('/update/:id', updateProduct );
router.delete('/delete/:id', deleteProduct );
router.get('/getAllProduct', getAllProduct );

export default router;
