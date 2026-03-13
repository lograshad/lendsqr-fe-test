import type { HTMLAttributes } from "react";
import styles from "./Skeleton.module.scss";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "rectangle" | "circle";
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  variant = "rectangle",
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  const classNames = [styles.skeleton, variant === "circle" ? styles.circle : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  const combinedStyle = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    ...style,
  };

  return <div className={classNames} style={combinedStyle} {...props} />;
}
