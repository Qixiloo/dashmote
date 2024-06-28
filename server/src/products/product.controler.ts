import { ModelManager } from "../model/model-manager";
import { Request, Response } from "express";
import { Product } from "./product.model";
const PRODUCTS_FILE = "src/products.json";

export async function getAllProducts(req: Request, res: Response) {
  try {
    let modelMgr = new ModelManager<Product, string>(PRODUCTS_FILE);
    let allProducts = await modelMgr.getAll();
    return res.json(allProducts);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function getProductByName(req: Request, res: Response) {
  try {
    let modelMgr = new ModelManager<Product, string>(PRODUCTS_FILE);
    let target = await modelMgr.getByName(req.params.name);
console.log('2',target);
    return res.json(target);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function deleteProductByName(req: Request, res: Response) {
  try {
    let modelMgr = new ModelManager<Product, string>(PRODUCTS_FILE);
    await modelMgr.remove(req.params.name);
    res.status(200).json({
      status: "OK. product deleted.",
    });

  } catch (error: any) {
    res.status(400).send(error.message);
  }
}


