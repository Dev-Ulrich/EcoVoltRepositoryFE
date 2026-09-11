import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/** Progressive enhancement: content stays visible if motion or browser APIs are unavailable. */
export default function usePublicMotion<T extends HTMLElement>() {
  const rootRef = useRef<T>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window) || !('animate' in Element.prototype)) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const running = new Map<HTMLElement, Animation>()
    let observer: IntersectionObserver | undefined
    const targets = new Set<HTMLElement>()

    function stop() {
      observer?.disconnect()
      running.forEach(animation => animation.cancel())
      running.clear()
    }

    function start() {
      stop()
      if (preference.matches || !root) return
      targets.clear()
      const heading = root.querySelector('h1')
      // Animate the title and nearby introductory copy in a short sequence.
      heading?.parentElement?.querySelectorAll<HTMLElement>(':scope > *').forEach(element => {
        if (element.tagName !== 'IMG') targets.add(element)
      })
      root.querySelectorAll<HTMLElement>('main h2, main article, main figure, main form, [data-motion-reveal], [data-motion-visual]').forEach(element => {
        // Avoid animating both a card and its heading, or nested form content.
        if (!element.parentElement?.closest('article, form, [data-motion-reveal]')) targets.add(element)
      })
      observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting)
        visible.forEach((entry, index) => {
          const element = entry.target as HTMLElement
          observer?.unobserve(element)
          if (element.contains(document.activeElement)) return
          const visual = element.hasAttribute('data-motion-visual')
          const animation = element.animate(
            visual
              ? [{ translate: '0 0' }, { translate: '0 -9px', offset: 0.5 }, { translate: '0 0' }]
              : [{ opacity: 0, translate: '0 18px' }, { opacity: 1, translate: '0 0' }],
            { duration: visual ? 2400 : 580, delay: visual ? 0 : Math.min(index * 65, 195), easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' },
          )
          running.set(element, animation)
          animation.onfinish = () => { animation.cancel(); running.delete(element) }
        })
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })
      targets.forEach(element => observer?.observe(element))
    }

    function revealFocused(event: FocusEvent) {
      const element = event.target
      if (!(element instanceof Node)) return
      targets.forEach(target => {
        if (target.contains(element)) {
          observer?.unobserve(target)
          running.get(target)?.cancel()
          running.delete(target)
        }
      })
    }

    start()
    preference.addEventListener('change', start)
    root.addEventListener('focusin', revealFocused)
    return () => {
      stop()
      preference.removeEventListener('change', start)
      root.removeEventListener('focusin', revealFocused)
    }
  }, [pathname])

  return rootRef
}
