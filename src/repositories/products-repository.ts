import { prisma } from "@/config";

async function findById(id: string) {
  return prisma.product.findUnique({
    where: {
      id
    }
  });
}

async function findByType(type_id: string) {
  return prisma.productType.findMany({
    where: {
      type_id
    },
    include: {
      product: true
    }
  });
}

async function findByName(keyword: string) {
  return prisma.product.findMany({
    where: {
      name: {
        contains: keyword
      }
    }
  })
}

async function findMany() {
  return prisma.$queryRaw`
    SELECT 
      products.id,
      products.name,
      products.description,
      products.price,
      products.stock,
      products.image,
      cast(COUNT(cart_products.amount) as float) as amount
    FROM products
    LEFT JOIN cart_products
    ON products.id = cart_products.product_id
    GROUP BY cart_products.product_id, products.id
    ORDER BY amount desc
    LIMIT 10
  `;
}

const productsRepository = {
  findById,
  findByType,
  findByName,
  findMany
};

export default productsRepository;