import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
  const navigation = useNavigation();
  // returns the current state of the component. idle | loading | submitting

  const isLoading = navigation.state === 'loading';
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />

      {/* main element wrapped inside of a div so that it will fall inside of the 1fr row */}
      <div className="overflow-scroll">
        {/* we did not style tf out of this div cause it will also style the outlet component which contains all of the child components*/}
        <main className="mx-auto max-w-3xl">
          <Outlet />
          {/* <Outlet/> allows us to render another route on top of another, also because this AppLayout component is the parent route of all */}
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
