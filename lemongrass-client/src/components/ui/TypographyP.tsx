type props = {
  className?: string;
  children: React.ReactNode;
};
export function TypographyP({ className, children }: props) {
  return (
    <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`}>
      {children}
    </p>
  );
}
