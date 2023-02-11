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

const productsRepository = {
  findById,
  findByType
};

export default productsRepository;