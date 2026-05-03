type Props = {
  size?: number;
  color?: string;
  className?: string;
};

export default function CbaMark({ size = 28, color = "currentColor", className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M16 2 L30 16 L16 30 L2 16 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M16 9 L23 16 L16 23 L9 16 Z"
        fill={color}
      />
    </svg>
  );
}
