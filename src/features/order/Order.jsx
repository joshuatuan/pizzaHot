// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher(); //fetching data from different routes

  // on first mount, the fetcher fetches the data from the menu route's loader function
  useEffect(
    function () {
      // if fetcher data is empty and is on idle
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
      // .state kinda like navigation.state from <AppLayout/>. idle, loading etc.
    },
    [fetcher]
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-3">
        <h2 className="text-xl font-semibold">Order #{id} status </h2>

        {/* Priority or nah */}
        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 font-semibold uppercase tracking-wide text-white">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 font-semibold uppercase tracking-wide text-white">
            {status} order
          </span>
        </div>
      </div>

      {/* Estimate delivery */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              // accesses the pizza object then its ingredients
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
              // fallback array when loading ingredients fails
            }
          />
        ))}
      </ul>

      {/* Prices */}
      <div className="space-y-2 rounded-lg bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  // since we cant use hooks (useParams) inside of this function, react router's loader uses {params} to get those shit
  const order = await getOrder(params.orderId); // it's called orderId cause that's what we defined it on the router
  return order;
}

export default Order;
