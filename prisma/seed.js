const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const fruits = [
  {
    name: 'Ananas',
    scientificName: 'Ananas comosus',
    description:
      'Fruit tropical sucré et juteux, riche en vitamine C et en broméline. Très populaire à Madagascar.',
    imageUrl: '/uploads/fruits/ananas.jpg',
    originCountry: 'Amérique du Sud',
    nutrition: {
      calories: 50,
      proteins: 0.5,
      carbohydrates: 13.1,
      fats: 0.1,
      fibers: 1.4,
      vitaminC: 47.8,
    },
  },
  {
    name: 'Mangue',
    scientificName: 'Mangifera indica',
    description:
      'Fruit tropical par excellence, à la chair dorée et sucrée. Très cultivée à Madagascar sous de nombreuses variétés.',
    imageUrl: '/uploads/fruits/mangue.jpg',
    originCountry: 'Inde',
    nutrition: {
      calories: 60,
      proteins: 0.8,
      carbohydrates: 15.0,
      fats: 0.4,
      fibers: 1.6,
      vitaminC: 36.4,
    },
  },
  {
    name: 'Papaye',
    scientificName: 'Carica papaya',
    description:
      'Fruit orangé riche en papaïne, excellent pour la digestion. Très commune dans toute Madagascar.',
    imageUrl: '/uploads/fruits/papaye.jpg',
    originCountry: 'Amérique Centrale',
    nutrition: {
      calories: 43,
      proteins: 0.5,
      carbohydrates: 10.8,
      fats: 0.3,
      fibers: 1.7,
      vitaminC: 61.8,
    },
  },
  {
    name: 'Litchi',
    scientificName: 'Litchi chinensis',
    description:
      'Petit fruit à la peau rose et à la chair blanche translucide, très populaire à Madagascar lors des fêtes.',
    imageUrl: '/uploads/fruits/litchi.jpg',
    originCountry: 'Chine',
    nutrition: {
      calories: 66,
      proteins: 0.8,
      carbohydrates: 16.5,
      fats: 0.4,
      fibers: 1.3,
      vitaminC: 71.5,
    },
  },
  {
    name: 'Banane',
    scientificName: 'Musa paradisiaca',
    description:
      'Fruit énergétique par excellence, riche en potassium. De nombreuses variétés poussent à Madagascar.',
    imageUrl: '/uploads/fruits/banane.jpg',
    originCountry: 'Asie du Sud-Est',
    nutrition: {
      calories: 89,
      proteins: 1.1,
      carbohydrates: 22.8,
      fats: 0.3,
      fibers: 2.6,
      vitaminC: 8.7,
    },
  },
  {
    name: 'Corossol',
    scientificName: 'Annona muricata',
    description:
      'Grand fruit tropical à la chair blanche crémeuse et acidulée. Reconnu pour ses propriétés médicinales.',
    imageUrl: '/uploads/fruits/corossol.jpg',
    originCountry: 'Caraïbes',
    nutrition: {
      calories: 66,
      proteins: 1.0,
      carbohydrates: 16.8,
      fats: 0.3,
      fibers: 3.3,
      vitaminC: 20.6,
    },
  },
  {
    name: 'Fruit de la passion',
    scientificName: 'Passiflora edulis',
    description:
      'Fruit exotique à la pulpe acidulée et parfumée, utilisé en jus et desserts.',
    imageUrl: '/uploads/fruits/passion.jpg',
    originCountry: 'Brésil',
    nutrition: {
      calories: 97,
      proteins: 2.2,
      carbohydrates: 23.4,
      fats: 0.7,
      fibers: 10.4,
      vitaminC: 30.0,
    },
  },
  {
    name: 'Jacquier',
    scientificName: 'Artocarpus heterophyllus',
    description:
      'Le plus grand fruit du monde, à la chair jaune sucrée. Très apprécié à Madagascar comme fruit et légume.',
    imageUrl: '/uploads/fruits/jacquier.jpg',
    originCountry: 'Inde',
    nutrition: {
      calories: 95,
      proteins: 1.7,
      carbohydrates: 23.2,
      fats: 0.6,
      fibers: 1.5,
      vitaminC: 13.7,
    },
  },
  {
    name: 'Goyave',
    scientificName: 'Psidium guajava',
    description:
      "Fruit tropical très riche en vitamine C, jusqu'à 4 fois plus que l'orange. Chair rose ou blanche.",
    imageUrl: '/uploads/fruits/goyave.jpg',
    originCountry: 'Amérique du Sud',
    nutrition: {
      calories: 68,
      proteins: 2.6,
      carbohydrates: 14.3,
      fats: 1.0,
      fibers: 5.4,
      vitaminC: 228.3,
    },
  },
  {
    name: 'Avocat',
    scientificName: 'Persea americana',
    description:
      'Fruit crémeux riche en graisses saines et en vitamines. Très cultivé dans les hautes terres malgaches.',
    imageUrl: '/uploads/fruits/avocat.jpg',
    originCountry: 'Mexique',
    nutrition: {
      calories: 160,
      proteins: 2.0,
      carbohydrates: 8.5,
      fats: 14.7,
      fibers: 6.7,
      vitaminC: 10.0,
    },
  },
];

async function main() {
  console.log('🌱 Seeding database with tropical fruits...');

  for (const fruit of fruits) {
    const { nutrition, ...fruitData } = fruit;

    const created = await prisma.fruit.upsert({
      where: {
        id: fruits.indexOf(fruit) + 1,
      },
      update: {
        ...fruitData,
      },
      create: {
        ...fruitData,
        nutrition: {
          create: nutrition,
        },
      },
    });

    console.log(`✅ ${created.name} ajouté`);
  }

  console.log('🎉 Seeding terminé !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });