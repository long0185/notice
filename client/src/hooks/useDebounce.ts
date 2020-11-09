import { useRef, useCallback, useEffect } from 'react'
export default (fn: Function, delay: number, dep = []) => {
    const { current } = useRef({ fn, timer: 0 })
    useEffect(() => {
        current.fn = fn
    }, [fn])
    return useCallback(function f(...args) {
        if (current.timer) {
            clearTimeout(current.timer)
        }
        current.timer = setTimeout(() => {
            current.fn.call(this, ...args)
        }, delay)
    }, dep)
}