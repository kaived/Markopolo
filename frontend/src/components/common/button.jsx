import { cn } from "../../lib/cn.js"

export function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        // base styles only (never change)
        "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className // ALL sizing + colors come from usage
      )}
      {...props}
    >
      {children}
    </button>
  )
}
