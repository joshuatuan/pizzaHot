import { Link } from 'react-router-dom';
import SearchOrder from '../order/SearchOrder';
import Username from '../user/Username';

function Header() {
  return (
    <header className="font-pizza flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link
        to="/"
        className="text-sm font-semibold tracking-widest sm:text-base"
      >
        Pizza Hot
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
