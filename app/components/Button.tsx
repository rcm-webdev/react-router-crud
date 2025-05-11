interface LoginButtonProps {
  size: "sm" | "md" | "lg";
}

export default function LoginButton({ size }: LoginButtonProps) {
  return (
    <button className={`btn btn-secondary btn-${size}`}>
      Create your first ticket
    </button>
  );
}
