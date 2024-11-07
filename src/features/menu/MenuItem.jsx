import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import Button from '../ui/Button';
import { addItem, getCurrentQuantityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));

  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className={`flex gap-4 py-2 ${soldOut ? `opacity-60` : ``}`}>
      <img src={imageUrl} alt={name} className={`h-24`} />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>

        {/* PIZZA INGREDIENTS */}
        <p
          className={`${ingredients.join(',').length > 50 ? 'text-xs' : 'mt-1.5 text-sm'} capitalize italic text-stone-600 sm:text-sm`}
        >
          {ingredients.join(', ')}
        </p>

        <div className="mt-auto flex items-center justify-between">
          {
            // PIZZA PRICE OR IS SOLD OUT?
            !soldOut ? (
              <p className="text-sm font-medium">{formatCurrency(unitPrice)}</p>
            ) : (
              <p className="text-sm font-semibold uppercase text-stone-500">
                Sold out
              </p>
            )
          }

          {
            // ADD TO CART BTN
            !soldOut && !isInCart && (
              <Button type="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            )
          }
          {
            // + - QUANTITY BUTTON
            isInCart && (
              <div className="flex items-center gap-3 sm:gap-8">
                <UpdateItemQuantity
                  pizzaId={id}
                  currentQuantity={currentQuantity}
                />
                <DeleteItem pizzaId={id} />
              </div>
            )
          }
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
