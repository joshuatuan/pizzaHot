import { useSelector } from 'react-redux';

function Username() {
  // redux setup step 4: now we can access the states with the useSelector
  // here we are accessing the user slice and its username state
  const username = useSelector((state) => state.user.username);
  if (username) {
    return (
      <div className="hidden text-sm font-semibold md:block">{username}</div>
    );
  }
}

export default Username;
