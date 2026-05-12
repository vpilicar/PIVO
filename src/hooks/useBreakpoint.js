import { useState, useEffect } from 'react'

const BREAKPOINTS = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 }

function getBreakpoint(width) {
    if (width < BREAKPOINTS.sm)  return 'xs'
    if (width < BREAKPOINTS.md)  return 'sm'
    if (width < BREAKPOINTS.lg)  return 'md'
    if (width < BREAKPOINTS.xl)  return 'lg'
    if (width < BREAKPOINTS.xxl) return 'xl'
    return 'xxl'
}

export default function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState(() => getBreakpoint(window.innerWidth))

    useEffect(() => {
        const handler = () => setBreakpoint(getBreakpoint(window.innerWidth))
        window.addEventListener('resize', handler)
        return () => window.removeEventListener('resize', handler)
    }, [])

    return breakpoint
}
