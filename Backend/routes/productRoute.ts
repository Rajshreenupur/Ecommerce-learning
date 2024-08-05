import { Router } from 'express';
import { createProduct, deleteProduct, getAllProduct, getProduct, updateProduct } from '../controllers/productController';
import { authenticateUser } from '../middlewares/authMiddleware';
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      console.log('upload')
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
      console.log('upload')
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadStorage = multer({ storage: storage });

router.post('/create', authenticateUser, uploadStorage.single("file"), createProduct);
router.get('/get/:id', authenticateUser, getProduct);
router.put('/update/:id', authenticateUser, updateProduct);
router.delete('/delete/:id', authenticateUser, deleteProduct);
router.get('/getAllProduct', authenticateUser, getAllProduct);

export default router;
