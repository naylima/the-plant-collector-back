import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByUserId(user_id: string) {
  return await prisma.cart.findFirst({
    where: {
      user_id,
      status: "RESERVED"
    },
    include: {
      cartProducts: {
        include: {
          product: true
        }
      }
    }
  });
}

async function createCart(user_id: string) {
  return await prisma.cart.create({
    data: {
      user_id,
      status: "RESERVED"
    }
  });
}

async function addToCart(data: Prisma.CartProductUncheckedCreateInput) {
  console.log(data);
  return await prisma.$transaction([
    prisma.product.update({
      where: {
        id: data.product_id
      },
      data: {
        stock: {
          decrement: 1
        }
      }
    }),

    prisma.cartProduct.create({ data })
  ]);
}

const cartRepository = {
  findByUserId,
  createCart,
  addToCart
};

export default cartRepository;

