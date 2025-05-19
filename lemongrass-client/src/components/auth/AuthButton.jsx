const AuthButton = ({ children, disabled, ...props }) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default AuthButton;
