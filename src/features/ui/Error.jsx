import { useNavigate, useRouteError } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="space-y-5 px-4 py-10">
      <h1>Something went wrong 😢</h1>
      <p>{error.message || 'An unknown error occurred '}</p>

      <button
        className="rounded-full bg-blue-200 px-4 py-3 text-sm text-blue-500 transition-all hover:bg-blue-300 hover:text-blue-600"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default Error;
