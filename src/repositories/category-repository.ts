import { prisma } from "@/config";

async function findManyWithTypes() {
  return prisma.category.findMany({
    include: {
      type: true
    }
  });
}

async function findById(category_id: string) {
  return prisma.type.findMany({
    where: {
      category_id
    }
  });
}

const categoryRepository = {
  findManyWithTypes,
  findById
};

export default categoryRepository;