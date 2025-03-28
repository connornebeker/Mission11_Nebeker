import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import 'bootstrap/dist/css/bootstrap.min.css';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <CartSummary />
      <div className="row">
        <div className="col-md-12">
          <WelcomeBand />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-8">
          <BookList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
