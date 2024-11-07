import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  // getting the data from the loader
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// loading data from api as we render this component, first define the loader
export async function loader() {
  const menu = await getMenu(); //getMenu is a fetch function from the restaurant api
  return menu;
}

export default Menu;
