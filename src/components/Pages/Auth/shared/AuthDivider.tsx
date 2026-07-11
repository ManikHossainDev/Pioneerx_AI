interface AuthDividerProps {
  label?: string;
  className?: string;
  labelClassName?: string;
}

const AuthDivider = ({
  label = "Or continue with",
  className = "",
  labelClassName = "text-[#8a8a96]",
}: AuthDividerProps) => {
  return (
    <div className={`flex items-center gap-3 my-4 ${className}`}>
      <div className="flex-1 h-px bg-[#3a3a4a]" />
      <span className={`text-xs whitespace-nowrap ${labelClassName}`}>{label}</span>
      <div className="flex-1 h-px bg-[#3a3a4a]" />
    </div>
  );
};

export default AuthDivider;
