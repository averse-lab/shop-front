import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@lib/shadcn-ui/utils";

const buttonVariants = cva(
  [
    "relative",
    "inline-flex origin-center items-center justify-center",
    "whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&[disabled]]:pointer-events-none [&[disabled]]:opacity-50",
    "text font-medium uppercase",
    "z-0 after:absolute after:inset-0 after:-z-10 after:h-full after:w-full after:border after:transition-all after:content-['']",
  ],
  {
    variants: {
      variant: {
        default: [
          "text-primary-foreground/60 hover:text-primary-foreground/80",
          "after:border-border/10 after:bg-primary/75 hover:after:bg-primary/85",
        ],
        "default-icon": ["after:border-border/10 after:bg-primary/65 hover:after:bg-primary/75"],
        // destructive:
        //   "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "text-primary-foreground/60 hover:text-primary-foreground/80",
        secondary: [
          "text-secondary-foreground/60 hover:text-secondary-foreground/80",
          "after:border-border/20 after:bg-secondary/20 hover:after:bg-secondary/10",
        ],
        "secondary-icon": [
          "after:border-border/20 after:bg-secondary/10 hover:after:bg-secondary/40",
        ],
        // ghost: "hover:bg-accent hover:text-accent-foreground",
        // link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: [
          "h-12",
          "px-6 py-3",
          "after:shadow after:backdrop-blur hover:after:scale-[1.025]",
        ],
        icon: ["h-8 w-8", "after:shadow-sm after:backdrop-blur-sm hover:after:scale-[1.05]"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
