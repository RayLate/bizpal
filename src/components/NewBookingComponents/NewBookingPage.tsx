import { useState } from 'react';
import CategoryHeader from './CategoryHeader';
import { categories } from './data';

const NewBookingPage = () => {
  const [category, setCategory] = useState<string>(categories[0]);

  return (
    <>
      <CategoryHeader
        category={category}
        setCategory={setCategory}
        categories={categories}
      />
    </>
  );
};

export default NewBookingPage;
