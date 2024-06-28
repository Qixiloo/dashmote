import * as express from 'express';
import {getAllProducts, getProductByName,deleteProductByName} from './product.controler'

const productsrouter = express.Router();

productsrouter.use(express.json());
productsrouter.get("/products", getAllProducts);
productsrouter.get("/products/:name", getProductByName);
productsrouter.delete("/products/:name", deleteProductByName);

export { productsrouter };
