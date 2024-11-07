import LinkButton from '../ui/LinkButton';
import Button from '../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';

function Cart() {
  const cart = useSelector(getCart);
  const dispatch = useDispatch();
  const isCartEmpty = cart.length < 1;

  return (
    <div className="px-4 py-4">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">
        Your cart {isCartEmpty && 'is empty'}
      </h2>

      <ul
        className={`mt-3 divide-y divide-stone-200 ${!isCartEmpty && 'border-b'} `}
      >
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      {!isCartEmpty && (
        <div className="mt-6 space-x-4">
          <Button type="primary" disabled={isCartEmpty} to="/order/new">
            Order pizzas
          </Button>
          <Button
            type="secondary"
            disabled={isCartEmpty}
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
