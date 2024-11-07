import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './features/ui/Home';
import AppLayout from './features/ui/AppLayout';
import Cart from './features/cart/Cart';
import Error from './features/ui/Error';

//actions
import CreateOrder, {
  action as CreateOrderAction,
} from './features/order/CreateOrder';
import { action as updateOrderAction } from './features/order/UpdateOrder';

//loaders
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Order, { loader as orderLoader } from './features/order/Order';

// new stuff, we define the routes paths and elements using this array of objects and stuff
const router = createBrowserRouter([
  {
    element: <AppLayout />, // layout route, no route
    errorElement: <Error />, // gud practice for parent element to have an error element if a child has one
    children: [
      { path: '/', element: <Home /> },

      //render as you fetch, router will fetch the data at the same time
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      }, //specify the loader
      // loaders = read data, actions = write data   ||   loaders = read data from api , actions  = write data

      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new', // whenever a form is submitted on this path, this action right here will be called
        element: <CreateOrder />,
        action: CreateOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  // then we just pass the router object as a prop to the router provider
  return <RouterProvider router={router} />;
}
export default App;
