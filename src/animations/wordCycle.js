import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { lastAboutWord } from "../constants"

let wordIndex = 0
let activeTween = null
let pendingCall = null

function cycleWord(el) {
  const exitSplit = SplitText.create(el, { type: 'chars' })

  activeTween = gsap.timeline()
    .to(exitSplit.chars, {
      yPercent: -100,
      opacity: 0,
      stagger: 0.02,
      duration: 0.35,
      ease: 'power2.in',
    })
    .call(() => {
      exitSplit.revert()

      wordIndex = (wordIndex + 1) % lastAboutWord.length
      el.textContent = lastAboutWord[wordIndex]

      const enterSplit = SplitText.create(el, { type: 'chars' })
      gsap.set(enterSplit.chars, { yPercent: 100, opacity: 0 })

      activeTween = gsap.to(enterSplit.chars, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.02,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => {
          enterSplit.revert()
          pendingCall = gsap.delayedCall(2.3, () => cycleWord(el))
        }
      })
    })
}

export function stopAboutWordCycle() {
  if(pendingCall) {
    pendingCall.kill()
    pendingCall = null
  }
  if(activeTween) {
    activeTween.kill()
    activeTween = null
  }
}

export function startAboutWordCycle(el) {
  stopAboutWordCycle()
  wordIndex = 0
  pendingCall = gsap.delayedCall(3, () => cycleWord(el))
}
