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

const productsRepository = {
  findById,
  findByType,
  findByName
};

export default productsRepository;