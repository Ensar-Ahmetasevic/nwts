import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "shadow-md border-2 btn btn-outline btn-info",
      delete: "shadow-md border-2 btn btn-outline btn-error",
      cancel: "shadow-md border-2 btn btn-outline btn-accent",
      update: "shadow-md border-2 btn btn-outline btn-warning",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "link",
    },
    size: {
      default: "btn-sm",
      sm: "btn-xs",
      lg: "btn",
      xlg: "btn-lg",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
