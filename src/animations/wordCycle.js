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
          pendingCall = gsap.delayedCall(2.5, () => cycleWord(el))
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
