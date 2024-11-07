import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice'; // thunk

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === 'loading';

  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData(); // we can get any data from here, whatever the action returns
  const dispatch = useDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  // notice that in the form, react router automatically handles the onsubmit handlers
  // also, no states for the input fields, so no onchange and all that shits
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let`s go!</h2>

      {/* action prop = path that this form will submit to */}
      {/* <Form method="POST" action="order/new"> */}
      <Form method="POST">
        {/* PHONE NUMBER */}

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            defaultValue={username /*kinda like a starting value */}
            name="customer"
            required
          />
        </div>

        {/* PHONE NUMBER */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        {/* ADDRESS / GET POSITION*/}
        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-full bg-red-100 p-2 text-xs text-red-600">
                {addressError}
              </p>
            )}

            {/* GET POSITION BUTTON*/}
          </div>
          {!position.longitude && !position.latitude && (
            <span className="absolute right-1 top-[35px] z-50 sm:right-1 sm:top-1.5">
              {/* styling a custom component*/}
              <Button
                disabled={isLoadingAddress}
                type="small"
                onClick={(e) => {
                  // this a button inside of a form so we have to prevent default so this wont submit it
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        {/* PRIORITY CHECKBOX */}
        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        {/* a way of putting the cart object with the form submission */}
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              // only submit position to form data if user allowed position
              position.longitude && position.latitude
                ? `${position.longitude}, ${position.latitude}`
                : ``
            }
          />
          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Placing order... '
              : `Order now (${formatCurrency(totalPrice)})`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// camt use hooks on regular functions cuh
// as soon as we submit the <Form>, it will create a request which will call this action function right her
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); //converting to object

  // cleaning the data
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true', // we also define priority here cause the checkbox input won't return something when unchecked, so if it is unchecked = false, if checked = true
  };

  // input validations from the form data
  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = 'Invalid phone number.';

  // if error, return the errors object
  if (Object.keys(errors).length > 0) return errors;

  // if no error, create new order, and redirect it
  const newOrder = await createOrder(order);

  // reset the cart, do not overuse this method, cause of performance issues optimizations stuff daw
  store.dispatch(clearCart());

  // cant use navigator hooks in functions, just in components
  // so we must do this instead, return a redirect, which will redirect
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
