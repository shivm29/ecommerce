import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { createProductController, deleteProductController, getPhotoController, getProductController, getSingleProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable'

// create a new router
const router = express.Router();

// routing
// CREATE PRODUCT | METHOD : POST
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);
// GET ALL PRODUCTS | METHOD : GET
router.get('/get-product', getProductController);
// GET SINGLE PRODUCT | METHOD : GET
router.get('/get-product/:slug', getSingleProductController);
// GET PRODUCT PHOTO | METHOD : GET
router.get('/product-photo/:pid', getPhotoController);
// DELETE PRODUCT | METHOD : DELETE
router.delete('/:pid', deleteProductController);
// UPDATE PRODUCT | METHOD : PUT
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);



export default router