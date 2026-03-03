import { clsx } from "clsx";

export default function Button({
  children, onClick, disabled, variant = "primary",
  className = "", type = "button", ...props
}) {
  const base = "font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2";

  const variants = {
    primary: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={clsx(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
