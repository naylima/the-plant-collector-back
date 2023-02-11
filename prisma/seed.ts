import { PrismaClient } from "@prisma/client";
import { User, Category, Type, Product } from "@prisma/client";

import bcrypt from "bcrypt";
import { table } from "console";

const prisma = new PrismaClient();

/* categories */

const firstCategoryId = "0730ffac-d039-4194-9571-01aa2aa0efbd";
const secondCategoryId = "6d7b50c1-08d2-4f7d-8a5a-4856f1c95a73";
const thirdCategoryId = "8f0b24bd-ba78-48f0-b10b-a4bb24f0cbd9";
const fourthCategoryId = "78b42986-ac2d-4dd6-bacd-589311448dca";
const fifthCategoryId = "c27ff2e9-7d65-4e83-98c4-8b48e5c279f9";

/* types */

const petFriendlyId = "d9922526-396d-4b97-82bd-581fc3fa4779";
const tropicalIndoorId = "90168b24-4221-44d5-97c1-8e487771f6be";
const floweringId = "3e71a302-5efb-4243-85fd-c6c5b7ebaa3d";
const rareId = "6d314cf7-87f8-4179-9078-3456ebddfd44";
const succulentsId = "4c5f9cc6-c07a-4fa2-b412-c465a7d37f0a";
const aquaticId = "7fdd7c06-b2a5-441e-88f2-18e7d8b9bc87";
const outdoorId = "b5ea3003-485e-49d2-8944-8e8ecf2508fd";
const vegetableId = "310bb114-cfec-4ec4-acfe-c9f4cc66f2a6";
const driedId = "cddfead2-382e-4bb4-9620-76ba7075e516";

const smallAirId = "0f2fa619-e49f-49ed-ac9c-39e035fa21c3";
const largeAirId = "c51d07b6-5e95-479e-a501-f312d4231706";
const airAccessoriesId = "1f28fceb-4a83-4f6a-9f0c-bdfba6095ab8";

const capricornId = "06f61623-946f-47e0-9c04-4f4e2762f91e";
const aquariusId = "141812db-2006-46cf-ae87-17432e038d28";
const piscesId = "3f41be5c-e01d-4ed4-989c-14916479f950";
const ariesId = "4a61d04f-5792-4430-b8a6-54b6452391fb";
const taurusId = "b7496f8a-c091-4849-ad79-d8f8cc5ca56e";
const geminiId = "03e3beea-1e13-421a-9af8-759704b7a11b";
const cancerId = "3e1ee9d4-704d-4db2-a3fe-e02fbb621d66";
const leoId = "5aa55402-91fe-4cb0-b3d0-483715fcb1e7";
const virgoId = "e5a1f38f-b752-4bca-bc06-1387c767b354";
const libraId = "cedff845-de55-4e0f-b68b-e9cbe80a7317";
const scorpioId = "b66789a0-d1c4-48fd-9cc4-0a9438972ac0";
const sagittariusId = "a5cfac98-9803-4711-b50b-179c383f4833";

const potsId = "7484eec4-4ec8-460b-b384-6e9fd05f3f06";
const wateringToolsId = "e2d92789-4270-4ed6-af3e-2c6662e85162";
const gardenTools = "a47ed2cf-f37f-4dd8-9051-c04c965eedad";
const fertilizerId = "ef588e04-ad3a-4ff4-b230-e993e7006139";
const vegetableSeedsId = "7792cdbe-99b4-405c-9f9e-4b3c9600977d";

async function createUser(): Promise<User> {
  let testUser = await prisma.user.findFirst({
    where: {
      email: "test@gmail.com",
    },
  });

  if (!testUser) {
    const hashedPassword = await bcrypt.hash("123456", 12);
    testUser = await prisma.user.create({
      data: {
        name: "test",
        email: "test@gmail.com",
        password: hashedPassword,
      },
    });
  }
  
  return testUser;
}

async function createCategories(): Promise<Category[]> {
  let categories = await prisma.category.findMany();

  if (categories.length === 0) {
    await prisma.category.create({
      data: {
        id: firstCategoryId,
        name: "All Potted Plants"
      }
    });
    await prisma.category.create({
      data: {
        id: secondCategoryId,
        name: "Air Plants"
      }
    });
    await prisma.category.create({
      data: {
        id: thirdCategoryId,
        name: "Zodiac Houseplants"
      }
    });
    await prisma.category.create({
      data: {
        id: fourthCategoryId,
        name: "Pots & Accessories"
      }
    });
    await prisma.category.create({
      data: {
        id: fifthCategoryId,
        name: "Seed Packets"
      }
    });

    categories = await prisma.category.findMany();
  }

  return categories;
}

async function createTypes(): Promise<Type[]> {
  let types = await prisma.type.findMany();

  if (types.length === 0) {
    await prisma.type.create({
      data: {
        id: petFriendlyId,
        name: "Pet-Friendly Plants",
        category_id: firstCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: tropicalIndoorId,
        name: "Tropical Indoor Plants",
        category_id: firstCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: floweringId,
        name: "Flowering Plants",
        category_id: firstCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: rareId,
        name: "Rare Plants",
        category_id: firstCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: succulentsId,
        name: "Succulents & Cacti",
        category_id: firstCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: aquaticId,
        name: "Aquatic Plants",
        category_id: firstCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: outdoorId,
        name: "Outdoor Plants",
        category_id: firstCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: vegetableId,
        name: "Vegetable & Herb Plants",
        category_id: firstCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: driedId,
        name: "Dried Plants",
        category_id: firstCategoryId
      }
    });

    await prisma.type.create({
      data: {
        id: smallAirId,
        name: "Small Air Plants",
        category_id: secondCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: largeAirId,
        name: "Large Air Plants",
        category_id: secondCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: airAccessoriesId,
        name: "Air Plants Accessories",
        category_id: secondCategoryId
      }
    });

    await prisma.type.create({
      data: {
        id: capricornId,
        name: "Capricorn",
        category_id: thirdCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: aquariusId,
        name: "Aquarius",
        category_id: thirdCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: piscesId,
        name: "Pisces",
        category_id: thirdCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: ariesId,
        name: "Aries",
        category_id: thirdCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: taurusId,
        name: "Taurus",
        category_id: thirdCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: geminiId,
        name: "Gemini",
        category_id: thirdCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: cancerId,
        name: "Cancer",
        category_id: thirdCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: leoId,
        name: "Leo",
        category_id: thirdCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: virgoId,
        name: "Virgo",
        category_id: thirdCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: libraId,
        name: "Libra",
        category_id: thirdCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: scorpioId,
        name: "Scorpio",
        category_id: thirdCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: sagittariusId,
        name: "Sagittarius",
        category_id: thirdCategoryId
      }
    });

    await prisma.type.create({
      data: {
        id: potsId,
        name: "Pots & Planters",
        category_id: fourthCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: wateringToolsId,
        name: "Watering Tools",
        category_id: fourthCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: gardenTools,
        name: "Garden Tools",
        category_id: fourthCategoryId
      }
    });
    await prisma.type.create({
      data: {
        id: fertilizerId,
        name: "Fertilizer & Treatments",
        category_id: fourthCategoryId
      }
    });

    await prisma.type.create({
      data: {
        id: vegetableSeedsId,
        name: "Vegetable & Herb Seeds",
        category_id: fifthCategoryId
      }
    });

    types = await prisma.type.findMany();
  }

  return types;
}

async function createProducts(): Promise<Product[]> {
  let products = await prisma.product.findMany();

  if (products.length === 0) {
    await prisma.product.create({
      data: {
        name: "Parlor Palm",
        image: "https://i.pinimg.com/564x/af/09/f6/af09f68e13d731b41c5583585bee3607.jpg",
        description: "The Parlor Palm is a favorite easy-care palm with tropical fronds known for its air-purifying qualities.",
        price: 1299,
        stock: 5,
        productTypes: {
          create: [
            {type_id: petFriendlyId},
            {type_id: tropicalIndoorId}
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Watermelon Peperomia",
        image: "https://i.pinimg.com/564x/07/a3/15/07a315fe1ed10b784476b4ab204dac2d.jpg",
        description: "Native to northern South America, including Bolivia, Brazil, Ecuador, and Venezuela.",
        price: 3999,
        stock: 7,
        productTypes: {
          create: [
            {type_id: petFriendlyId},
            {type_id: tropicalIndoorId}
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Money Tree 'Guiana Chestnut",
        image: "https://i.pinimg.com/564x/a8/78/59/a87859eebb0bac0bcada708405db8c8a.jpg",
        description: "Native to central and South America, the Money Tree is a braided tree that can grow up to 6-8 feet indoors or be trained as a bonsai.",
        price: 4999,
        stock: 3,
        productTypes: {
          create: [
            {type_id: petFriendlyId},
            {type_id: tropicalIndoorId}
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Pilea Peperomioides 'Chinese Money'",
        image: "https://i.pinimg.com/564x/fe/8d/26/fe8d26b0eb8001ecc45f84f57e6d595d.jpg",
        description: "Native to central and South America, the Money Tree is a braided tree that can grow up to 6-8 feet indoors or be trained as a bonsai.",
        price: 1798,
        stock: 13,
        productTypes: {
          create: [
            {type_id: petFriendlyId},
            {type_id: tropicalIndoorId}
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Monstera Adansonii 'Swiss Cheese'",
        image: "https://i.pinimg.com/564x/23/17/4d/23174d8fabec2d2cfdb5429a68ceb2e8.jpg",
        description: "The Swiss Cheese plant, gets its name from its large, heart-shaped leaves, which become covered with holes that resemble swiss cheese as it gets older.",
        price: 3999,
        stock: 6,
        productTypes: {
          create: [
            {type_id: rareId},
            {type_id: tropicalIndoorId}
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Calathea Lancifolia 'Rattlesnake'",
        image: "https://i.pinimg.com/564x/84/7c/85/847c857c42a5650dc41facd9ba71691e.jpg",
        description: "The perfect houseplant for pattern lovers because of its bold patterned foliage with deep purple undersides.",
        price: 2499,
        stock: 15,
        productTypes: {
          create: [
            {type_id: petFriendlyId},
            {type_id: tropicalIndoorId}
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Palm Ponytail",
        image: "https://i.pinimg.com/564x/be/60/cc/be60ccf8486ab9ec02fbdb969f3ef654.jpg",
        description: "Palm Ponytail It is unique-looking, long-lived indoor plant. Use a fast draining soil. Select a pot that has a hole in the bottom. Ponytail palms prefer to have as much light as possible, bright, indirect sunlight is best.",
        price: 3499,
        stock: 27,
        productTypes: {
          create: [
            {type_id: petFriendlyId},
            {type_id: tropicalIndoorId}
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Pothos 'Marble Queen'",
        image: "https://i.pinimg.com/564x/9c/4a/f4/9c4af4f900f21456cf652c8038e33d96.jpg",
        description: "This Pothos is a variegated version with more white than green. It is so easy, perfect for beginners, as pothos is one of the easiest plants to grow.",
        price: 1799,
        stock: 25,
        productTypes: {
          create: [
            {type_id: rareId},
            {type_id: tropicalIndoorId},
            {type_id: largeAirId}
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Purple Calla Lily",
        image: "https://i.pinimg.com/564x/ea/08/2b/ea082b4e1e67a8a78650bd5ea7c9818a.jpg",
        description: "You can also grow calla lilies in containers, either outdoors or in a sunny window as houseplants.",
        price: 6499,
        stock: 4,
        productTypes: {
          create: [
            {type_id: floweringId},
            {type_id: outdoorId},
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Blue Hydrangea",
        image: "https://i.pinimg.com/564x/5a/31/fe/5a31fef3672fe30be41081bc42fcb901.jpg",
        description: "Hardy and long-lasting, with blooms that burst in brilliant blue. Will arrive blooming. The small bush blooms in early summer, then re-blooms again late summer or early fall if planted outside.",
        price: 3599,
        stock: 27,
        productTypes: {
          create: [
            {type_id: floweringId},
            {type_id: outdoorId},
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Orchid 'Pink Phalaenopsis'",
        image: "https://i.pinimg.com/564x/5a/31/fe/5a31fef3672fe30be41081bc42fcb901.jpg",
        description: "Phalaenopsis, sometimes referred to as moth orchids, is a genus of roughly 70 plant species in the Orchidaceae family. With long, coarse roots, short, leafy stems, and long-lasting, flat blooms organized in a flowering stem that frequently branches at the end, orchids in this genus are monopodial epiphytes or lithophytes.",
        price: 4999,
        stock: 22,
        productTypes: {
          create: [
            {type_id: floweringId},
            {type_id: outdoorId},
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Succulent 'String of Pearls'",
        image: "https://i.pinimg.com/564x/c2/9b/97/c29b97b089c6e982992bb784abdaf6b1.jpg",
        description: "The string of pearls is a trailing succulent native to South Africa. This plant has long, loose tendrils with pearl shaped foliage which retains the plants' water.",
        price: 2999,
        stock: 45,
        productTypes: {
          create: [
            {type_id: succulentsId},
            {type_id: smallAirId},
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Fairy Castle Cactus",
        image: "https://i.pinimg.com/564x/c8/39/fa/c839fa3e2af47f133634f85a18cb85c3.jpg",
        description: "The cactus plant also originates in popular regions of Mexico, the Caribbean, Central America, and northern South America. The spiky plant shares resemblance with the turrets of a castle due to its curvy, columnar shape.",
        price: 3999,
        stock: 63,
        productTypes: {
          create: [
            {type_id: succulentsId},
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Aquatic Microsorum Pteropus 'Java Fern' Plant",
        image: "https://i.pinimg.com/564x/9e/b3/d3/9eb3d3a32ae486c63b3734a2b46444f7.jpg",
        description: "Java Ferns are one of the world's most widely used Plants in planted aquariums. They can grow in low light conditions and a wide range of water parameters.",
        price: 1899,
        stock: 14,
        productTypes: {
          create: [
            {type_id: aquaticId},
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Olive Tree",
        image: "https://i.pinimg.com/564x/b1/28/bd/b128bde145cf93211b0b3c995d2bacab.jpg",
        description: "With their elegant, silver-green foliage and graceful silhouettes, the Olive Tree or Olea europaea is a time-tested, infinitely elegant legacy tree for the outdoor and indoor spaces that receive plenty of bright light. This plant variety is  naturally both pest and drought resistant, and is easy to care for.",
        price: 7599,
        stock: 8,
        productTypes: {
          create: [
            {type_id: outdoorId},
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Rosemary Herb 'Tuscan Blue'",
        image: "https://i.pinimg.com/564x/b1/28/bd/b128bde145cf93211b0b3c995d2bacab.jpg",
        description: "Although it has ornamental benefits as well, Tuscan Blue Rosemary is an annual herb that is typically planted for its edible properties. The leaves, which resemble fragrant grayish green needles, are often picked from early to midsummer. The leaves smell strongly of sulfur and have a harsh flavor.",
        price: 1999,
        stock: 25,
        productTypes: {
          create: [
            {type_id: vegetableId},
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Pampas Grass",
        image: "https://i.pinimg.com/564x/61/92/ab/6192ab8ed1ab53059327138eb3f410c6.jpg",
        description: "Pampas grass is ideal for adding height to a room. One way to do this is by arranging it in beautiful vases on your mantle.",
        price: 2999,
        stock: 57,
        productTypes: {
          create: [
            {type_id: driedId},
          ]
        }
      }
    });
    await prisma.product.create({
      data: {
        name: "Broccoli 'Waltham 29' Seed Packet",
        image: "https://i.pinimg.com/564x/34/7e/b9/347eb9827b23ff857f0b76e711fb222f.jpg",
        description: "Organic Waltham Broccoli microgreens pack a punch of nutrition and flavor. These are non-GMO organic Waltham broccoli microgreen seeds.",
        price: 499,
        stock: 64,
        productTypes: {
          create: [
            {type_id: vegetableSeedsId},
          ]
        }
      }
    });

    products = await prisma.product.findMany();
  }

  return products;
}

async function main() {
  await createUser();
  await createCategories();
  await createTypes();
  await createProducts();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });