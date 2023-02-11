import categoryRepository from "@/repositories/category-repository";

async function getCategoriesWithTypes() {
  const categories = await categoryRepository.findManyWithTypes();

  return categories;
}

const categoriesService = {
  getCategoriesWithTypes
};

export default categoriesService;