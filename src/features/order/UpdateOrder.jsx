import { useFetcher } from 'react-router-dom';
import Button from '../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

// updating order data without navigation

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  // 2 kinds of updates:
  // PUT replaces the whole data, PATCH only updates the necessary ones
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

// revalidation stuff by the fetcher form. as we update the data, redux will know that and will refetch the Orderdata and rerender the Order component
export async function action({ request, params }) {
  const data = { priority: true };

  // patch request
  await updateOrder(params.orderId, data);
  return null;
}
