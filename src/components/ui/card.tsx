import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border text-foreground",
      className
    )}
    style={
      {
        borderColor: "var(--border-color)"
      }
    }
    {...props}
  />
))
Card.displayName = "Card"
