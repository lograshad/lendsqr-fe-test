import type { HTMLAttributes } from "react";
import styles from "./Card.module.scss";

type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
}

export function Card({ padding = "md", className, children, ...props }: CardProps) {
  const classNames = [styles.card, styles[`padding-${padding}`], className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}
