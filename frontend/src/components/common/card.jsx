import { cn } from "../../lib/cn.js"

/**
 * A reusable Card component with a glassmorphic, modern design.
 * 
 * @param {string} className - Override or extend the default styles.
 * @param {React.ReactNode} children - Card content.
 * @param {boolean} hoverable - If true, adds lift and shadow on hover. Default: true.
 * @param {'light' | 'dark' | 'none'} variant - The visual theme of the card. Default: 'light'.
 * @param {string} as - HTML element to render as. Default: 'div'.
 */
export function Card({ 
  className, 
  children, 
  hoverable = true, 
  variant = 'light',
  as: Component = 'div',
  innerGlow = false,
  rounded = 'rounded-3xl',
  ...props 
}) {
  
  const themes = {
    light: "bg-white border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
    dark: "bg-[#020617] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
  };

  return (
    <Component
      className={cn(
        // Base styles
        "relative border transition-all duration-300 group",
        rounded,
        // Theme styles
        variant !== 'none' && (themes[variant] || themes.light),
        // Hover effects (shadow and blue light border glow)
        hoverable && "hover:shadow-2xl hover:border-[#007acc]/50",
        // Consumer overrides
        className
      )}
      {...props}
    >
      {innerGlow && (
        <>
          {/* Stability Hack: Absolute Glow Layers */}
          <div className={cn("absolute inset-0 border border-transparent group-hover:border-[#007acc]/40 transition-colors duration-700 pointer-events-none z-20", rounded)} />
          <div className={cn("absolute inset-0 bg-[#007acc]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10", rounded)} />
        </>
      )}
      {children}
    </Component>
  )
}
