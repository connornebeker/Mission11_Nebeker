import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';

function BuyPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1); // Default quantity to 1

  const parsedPrice = price ? Number(price) : 0; // Ensure price is a number
  const subtotal = parsedPrice * quantity; // Calculate subtotal dynamically

  const handleAddToCart = () => {
    if (quantity < 1) return; // Prevent adding 0 or negative quantities

    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      quantity: quantity,
      price: parsedPrice,
      subtotal: subtotal,
    };

    addToCart(newItem);
    navigate('/cart'); // Redirect to cart after adding item
  };

  return (
    <>
      <WelcomeBand />
      <h2>Buy {title}</h2>

      <div>
        <input
          type="number"
          min="1"
          placeholder="Number of books"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Continue Shopping</button>
    </>
  );
}

export default BuyPage;
