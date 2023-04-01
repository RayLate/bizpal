import { useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { categories, generateServices, Item } from './data';
import Services from './Services';

const NewBookingPage = () => {
  const [category, setCategory] = useState<string>(categories[0]);
  const [services, setServices] = useState<Item[]>(generateServices());

  return (
    <>
      <CategoryHeader
        category={category}
        setCategory={setCategory}
        categories={categories}
      />
      <Services services={services} selectedCategory={category} />
    </>
  );
};

export default NewBookingPage;
