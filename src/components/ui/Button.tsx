export default function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`font-body text-xs uppercase tracking-luxury transition-colors duration-[400ms] ease-out ${props.className ?? ''}`}
    >
      {children}
    </button>
  );
}
