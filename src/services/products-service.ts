import productsRepository from "@/repositories/products-repository";

async function getProductsByType(type_id: string) {
  const response = await productsRepository.findByType(type_id);

  const products = response.map(response => {
    const product = response.product;
    return product;
  });
  
  return products;
}

async function getProductsByName(keyword: string) {
  const products = await productsRepository.findByName(keyword);
  
  return products;
}

async function getProductsBySell() {
  const products = await productsRepository.findMany();
  
  return products;
}


const productsService = {
  getProductsByType,
  getProductsByName,
  getProductsBySell
};

export default productsService;