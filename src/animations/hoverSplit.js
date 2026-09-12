import gsap from "gsap"
import { SplitText } from "gsap/SplitText"

export function setupHoverSplitAnimation(element) {
  let split
  let tl

  const ready = document.fonts.ready.then(() => {
    split = SplitText.create(element, { type: 'chars' })
  })

  function play() {
    ready.then(() => {
      const targets = split.chars

      if(!tl) {
        tl = gsap.timeline({ paused: true })

        tl.to(targets, {
          yPercent: (index) => index % 2 === 0 ? -15 : 15 ,
          opacity: 0,
          filter: 'blur(3px)',
          stagger: 0.04,
          duration: 0.25,
          ease: 'power1.in'
        })
        tl.set(targets, {
          yPercent: 0,
          filter: 'blur(0px)'
        })
        tl.to(targets, {
          opacity: 1,
          stagger: 0.04,
          // ease: 'power2.out'
        })
      }
      tl.restart()
    })
  }

  element.addEventListener('mouseenter', play)

  return () => {
    element.removeEventListener('mouseenter', play)
    tl?.kill()
    split?.revert()
  }
}
