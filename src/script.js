import './style.css'
import Orchestrator from './threejs/Orchestrator'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { setupHoverSplitAnimation } from './animations/hoverSplit'
import { startAboutWordCycle, stopAboutWordCycle } from './animations/wordCycle'

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

let currentSection = 'about'
let isAnimating = false

function renderSection(section) {
  if(isAnimating || section === currentSection) return
  isAnimating = true

  const outgoing = document.querySelector('.content section.is-active')
  const incoming = document.querySelector(`.content section[data-section="${section}"]`)

  stopAboutWordCycle()

  outgoing.classList.remove('is-active')
  incoming.classList.add('is-active')

  isAnimating = false

  if(section === 'about')
    startAboutWordCycle(document.querySelector('.word-cycle'))

  currentSection = section
}

startAboutWordCycle(document.querySelector('.word-cycle'))

const navButtons = document.querySelectorAll('.nav-link')
navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const section = button.dataset.section
    renderSection(section)
  })
})

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
