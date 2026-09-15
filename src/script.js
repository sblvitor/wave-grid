import './style.css'
import Orchestrator from './threejs/Orchestrator'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { setupHoverSplitAnimation } from './animations/hoverSplit'
import { resetAboutWordCycle, startAboutWordCycle, stopAboutWordCycle } from './animations/wordCycle'

gsap.registerPlugin(SplitText)

new Orchestrator(document.querySelector('canvas.webgl'))

// Theme toggle
const root = document.documentElement
const themeToggleBtn = document.getElementById('theme-toggle')

const savedTheme = localStorage.getItem('theme')
const initialTheme = savedTheme || 'light'

root.setAttribute('data-theme', initialTheme)

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = root.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  root.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
})

// Content management

const sections = new Map()
document.fonts.ready.then(() => {
  document.querySelectorAll('.content section').forEach((el) => {
    const name = el.dataset.section
    const split = SplitText.create(el, { type: 'words', ignore: '.word-cycle' })
    
    const wordEl = el.querySelector('.word-cycle')

    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        el.classList.remove('is-active')
        if (name === 'about') resetAboutWordCycle()
      },
      onComplete: () => {
        if(name === 'about') startAboutWordCycle(wordEl)
      }
    })

    tl.from([split.words, wordEl].filter(Boolean), {
      y: 100,
      ease: 'back.out',
      autoAlpha: 0,
      stagger: { amount: 0.4, from: 'random' }
    })

    sections.set(name, { el, split, tl })
  })
  sections.get('about').tl.progress(1)
  startAboutWordCycle(document.querySelector('.word-cycle'))

  document.querySelectorAll('.nav-link').forEach((button) => {
    button.addEventListener('click', () => renderSection(button.dataset.section))
  })
})

const OVERLAP = 0.1
let currentSection = 'about'
let pendingEnter = null

function renderSection(section) {
  if(section === currentSection) return

  pendingEnter?.kill()

  const outgoing = sections.get(currentSection)
  const incoming = sections.get(section)

  stopAboutWordCycle()

  outgoing.tl.reverse()

  const delay = Math.max(outgoing.tl.time() - OVERLAP, 0)

  pendingEnter = gsap.delayedCall(delay, () => {
    incoming.el.classList.add('is-active')
    incoming.tl.play()
  })

  currentSection = section
}

// Animations

const animatedElements = [
  'header h1',
  'header nav button',
  '.content section'
]

gsap.fromTo(
  animatedElements,
  {
    opacity: 0,
    y: 20,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.5
  }
)

document.querySelectorAll('.nav-link').forEach((button) => {
  setupHoverSplitAnimation(button)
})
