import { useMemo } from "react"


const useMobileBreakpoint = () => {

    const isMobile = useMemo(() => window.innerWidth > 564, [])

    return isMobile

}