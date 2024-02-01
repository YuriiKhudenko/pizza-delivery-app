import { useDispatch, useSelector } from 'react-redux';

import CartItem from './CartItem';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';

function Cart() {
  const username = useSelector((state) => state.user.username);
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-3 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">
        Your cart, {username}
      </h2>
      <div>
        <ul className="mt-3 divide-y divide-stone-300 border-b border-stone-300">
          {cart.map((item) => (
            <CartItem item={item} key={item.pizzaId} />
          ))}
        </ul>
        <div className="mt-6 space-x-2">
          <Button to="/order/new" type="primary">
            Order pizzas
          </Button>
          <Button type="secondary" onClick={handleClearCart}>
            Clear cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
