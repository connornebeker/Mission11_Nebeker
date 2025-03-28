import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

function BuyPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      price: price ? Number(price) : 0, // Assuming price is not available here
      purchaseAmount,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Buy {title}</h2>

      <div>
        <input
          type="number"
          placeholder="Number of books"
          value={price}
          onChange={(x) => setPurchaseAmount(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default BuyPage;
