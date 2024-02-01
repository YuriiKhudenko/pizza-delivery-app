import { useDispatch, useSelector } from 'react-redux';

import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import PizzaCounter from '../common/components/PizzaCounter';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } =
    pizza;

  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const handleAddToCart = () => {
    if (pizza) {
      dispatch(
        addItem({
          pizzaId: id,
          name,
          quantity: 1,
          unitPrice,
          totalPrice: unitPrice * 1,
        }),
      );
    }
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex flex-grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="te text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          <div className="ml-auto">
            {currentQuantity ? (
              <PizzaCounter id={id}>{currentQuantity}</PizzaCounter>
            ) : !soldOut ? (
              <Button
                type="small"
                disabled={soldOut}
                onClick={handleAddToCart}
              >
                Add to cart
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
