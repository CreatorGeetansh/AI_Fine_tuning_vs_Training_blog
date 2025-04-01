"use client"

import { useEffect, useState, type RefObject } from "react"

interface UseInViewOptions {
  once?: boolean
  threshold?: number
  rootMargin?: string
}

export function useInView(ref: RefObject<Element>, options: UseInViewOptions = {}): boolean {
  const { once = false, threshold = 0, rootMargin = "0px" } = options
  const [isIntersecting, setIntersecting] = useState<boolean>(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)

        if (entry.isIntersecting && once) {
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, once, threshold, rootMargin])

  return isIntersecting
}

