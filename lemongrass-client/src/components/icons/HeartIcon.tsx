// src/components/icons/HeartIcon.tsx
type Props = {
  className?: string;
  active?: boolean;
};

const HeartIcon = ({ className, active = false }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={active ? "red" : "white"}
    stroke={active ? "white" : "red"} 
    className={className}
  >
    <path d="M20.243 4.757a6 6 0 0 1 .236 8.236l-8.48 8.492-8.478-8.492a6 6 0 0 1 8.48-8.464 6 6 0 0 1 8.242.228M5.172 6.172a4 4 0 0 0-.192 5.451L12 18.654l7.02-7.03a4 4 0 0 0-5.646-5.64l-4.202 4.203-1.415-1.414 2.825-2.827-.082-.069a4 4 0 0 0-5.328.295" />
  </svg>
);

export default HeartIcon;
