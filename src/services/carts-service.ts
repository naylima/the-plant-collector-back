import cartRepository from "@/repositories/cart-repository";
import productsRepository from "@/repositories/products-repository";

import { unauthorizedError } from "@/errors";

export async function listManyByUserId(user_id: string) {
  const cartProducts = await cartRepository.findByUserId(user_id);

  return cartProducts;
}

export async function addToCart(user_id: string, product_id: string, amount: number) {
  await validateProductParams(product_id, amount);
  await getOrCreateCart(user_id);

  const cart = await cartRepository.findByUserId(user_id);
  const cart_id = cart.id;

  return cartRepository.addToCart({cart_id, product_id, amount});
}


async function validateProductParams(product_id: string, amount: number) {
  const product = await productsRepository.findById(product_id);

  if (!product || product.stock < amount)  throw unauthorizedError();
}

async function getOrCreateCart(user_id: string) {
  const cart = await cartRepository.findByUserId(user_id);

  if(!cart) {
    await cartRepository.createCart(user_id);
  }
}

const cartService = {
  listManyByUserId,
  addToCart
};

export default cartService;