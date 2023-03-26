export const categories: string[] = [
  'Food',
  'Beauty',
  'Services',
  'Fitness',
  'Fashion',
  'Technology',
  'Travel',
  'Home',
];

export interface Service {
  id: string;
  category: string;
  serviceName: string;
  providerName: string;
  rating: number;
  description: string;
  publishDate: Date;
  price: number;
}

function generateDummyService(category: string): Service {
  const id = (Math.floor(Math.random() * 1000000) + 1).toString();
  const serviceName = `Dummy ${category} Service`;
  const providerName = `Dummy ${category} Provider`;
  const rating = Math.floor(Math.random() * 5) + 1;
  const description = `This is a dummy ${category} service provided by ${providerName}.`;
  const publishDate = new Date();
  const price = Math.floor(Math.random() * 100) + 1;

  return {
    id,
    category,
    serviceName,
    providerName,
    rating,
    description,
    publishDate,
    price,
  };
}

export const generateServices = () => {
  const dummyServices: Service[] = [];

  for (let i = 0; i < 100; i++) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const dummyService = generateDummyService(randomCategory);
    dummyServices.push(dummyService);
  }

  return dummyServices;
};
