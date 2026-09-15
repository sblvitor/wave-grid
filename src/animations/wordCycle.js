import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { lastAboutWord } from "../constants"

let wordIndex = 0
let activeTween = null
let pendingCall = null

let activeSplit = null
let currentEl = null

function cycleWord(el) {
  const exitSplit = SplitText.create(el, { type: 'chars' })
  activeSplit = exitSplit

  activeTween = gsap.timeline()
    .to(exitSplit.chars, {
      autoAlpha: 0,
      filter: 'blur(12px)',
      stagger: {
        each: 0.08,
        from: 'random'
      },
      duration: 0.5,
      ease: 'power2.in',
    })
    .call(() => {
      exitSplit.revert()

      wordIndex = (wordIndex + 1) % lastAboutWord.length
      el.textContent = lastAboutWord[wordIndex]

      const enterSplit = SplitText.create(el, { type: 'chars' })
      activeSplit = enterSplit
      gsap.set(enterSplit.chars, { autoAlpha: 0, filter: 'blur(12px)' })

      activeTween = gsap.to(enterSplit.chars, {
        autoAlpha: 1,
        filter: 'blur(0px)',
        stagger: {
          each: 0.08,
          from: 'random'
        },
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          enterSplit.revert()
          pendingCall = gsap.delayedCall(1.5, () => cycleWord(el))
        }
      })
    })
}

export function stopAboutWordCycle() {
  pendingCall?.kill(); pendingCall = null
  activeTween?.kill(); activeTween = null
  if(activeSplit) gsap.set(activeSplit.chars, { autoAlpha: 1, filter: 'blur(0px)' })
}

export function startAboutWordCycle(el) {
  currentEl = el
  stopAboutWordCycle()
  pendingCall = gsap.delayedCall(2, () => cycleWord(el))
}

export function resetAboutWordCycle() {
  activeSplit?.revert(); activeSplit = null
  if (currentEl) currentEl.textContent = lastAboutWord[0]
  wordIndex = 0
}
