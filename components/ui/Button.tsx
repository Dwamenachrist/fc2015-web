import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type LinkProps = CommonProps & Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & { href: string };
type NativeButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = "primary", size = "md", full, icon, children, className, ...rest } = props;
  const cls = [styles.button, styles[variant], styles[size], full && styles.full, className].filter(Boolean).join(" ");
  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchor } = rest as LinkProps;
    const external = /^https?:\/\//.test(href);
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...anchor}>
        {content}
      </a>
    );
  }

  const { type = "button", ...button } = rest as NativeButtonProps;
  return (
    <button type={type} className={cls} {...button}>
      {content}
    </button>
  );
}
