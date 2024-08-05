import { Request, Response } from 'express';
import ProductCategory from '../models/productModel';

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { category,productName,productPrice } = req.body;
    const productUrl = req.file ? `/uploads/${req.file.filename}` : '';
// console.log(req.file,'------->>>>')
    if (!category || !productName || !productPrice ) {
      res.status(400).json({ message: 'Category,Product-Name and Product-Price  are required' });
      return;
    }

    try {
        const newProduct = new ProductCategory({ category,productName,productPrice,productUrl });
        await newProduct.save();    
      res.status(200).json({ message: 'Product created successful', newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  };
  


  export const getProduct = async (req: Request, res: Response): Promise<void> => {
    try{
    const productId = req.params.id;

    if(!productId){
      res.status(500).json({ message: 'product not found', });
    }
    const productExits = await ProductCategory.findById(productId);
    if (!productExits) {
       res.status(404).json({ error: 'Product Not Found.' });
    }else {
        res.status(200).json({ productExits});
      }
}catch (error) {
    res.status(500).json({
      message: 'Failed to Fetch Product Data',
      error,
    });
  }
  };



  export const getAllProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await ProductCategory.find()
      if (!product) {
         res
          .status(404)
          .json({ message: 'No product found for this user' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the products' });
    }
  };


  export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try{
    const productId = req.params.id;
    const payload = req.body;

    const productExists = await ProductCategory.findById(productId);
    if (!productExists) {
       res.status(404).json({ message: 'Product not found' });
    }else{
        const updateProductResult = await ProductCategory.findByIdAndUpdate(productId, payload,{new:true})
        res.status(200).json(updateProductResult)
    }
}catch (error) {
    res.status(500).json({
      message: 'Failed to Update Product Data',
      error,
    });
  }
  };

  export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try{
    const productId = req.params.id;
    const payload = req.body;

    const productExists = await ProductCategory.findById(productId);
    if (!productExists) {
       res.status(404).json({ message: 'Product not found' });
    }else{
        const deleteProductResult = await ProductCategory.findByIdAndDelete(productId)
        res.status(200).json({ message: 'Product deleted successful', deleteProductResult });
    }
}catch (error) {
    res.status(500).json({
      message: 'Failed to Delete Product Data',
      error,
    });
  }
  };