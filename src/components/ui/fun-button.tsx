import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const funButtonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-2xl text-lg font-bold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0 active:scale-95 hover:scale-105",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-strong hover:shadow-medium",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-soft",
        accent: "bg-accent text-accent-foreground shadow-soft hover:shadow-medium",
        ghost: "hover:bg-secondary/50 text-foreground",
        fun: "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-medium hover:shadow-strong",
      },
      size: {
        default: "h-14 px-8 py-4",
        sm: "h-12 rounded-xl px-6 text-base",
        lg: "h-16 rounded-2xl px-10 text-xl",
        icon: "h-14 w-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface FunButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof funButtonVariants> {
  asChild?: boolean;
}

const FunButton = React.forwardRef<HTMLButtonElement, FunButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(funButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
FunButton.displayName = "FunButton";

export { FunButton, funButtonVariants };