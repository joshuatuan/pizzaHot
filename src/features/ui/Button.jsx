import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base = `inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 ${disabled ? '' : `transition-colors duration-300 hover:bg-yellow-300`} focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed `;

  const styles = {
    primary:
      base + `px-4 py-3 md:px-6 md:py-4 ${disabled && 'cursor-not-allowed'}`,
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    secondary: `inline-block text-sm rounded-full border-2 border-stone-400 px-4 py-2.5 md:px-6 md:py-3.5 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:text-stone-600 hover:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-300 focus:text focus:text-stone-600 focus:ring-offset-2 disabled:cursor-not-allowed `,
    round: base + `px-2.5 py-1 md:px-3.5 md:py-2 text-sm`,
  };

  // Button link
  if (to)
    return (
      <Link className={styles[type]} to={disabled ? '#' : to}>
        {children}
      </Link>
    );

  // button with cheese
  if (onClick)
    return (
      <button className={styles[type]} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );

  // regular ahh button
  return (
    <button className={styles[type]} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;