import Image from "next/image";
import styles from "./Avatar.module.scss";

type AvatarSize = "sm" | "md" | "lg";

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 100,
};

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallback?: string;
  className?: string;
}

export function Avatar({ src, alt = "", size = "md", fallback, className }: AvatarProps) {
  const px = sizeMap[size];
  const classNames = [styles.avatar, styles[size], className ?? ""].filter(Boolean).join(" ");

  if (src) {
    return <Image src={src} alt={alt} width={px} height={px} className={classNames} />;
  }

  const initials = fallback ?? alt.charAt(0).toUpperCase();

  return (
    <div className={classNames} aria-label={alt}>
      <span className={styles.initials}>{initials}</span>
    </div>
  );
}
