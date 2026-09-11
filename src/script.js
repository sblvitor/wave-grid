import './style.css'
import Orchestrator from './threejs/Orchestrator'
import { content } from './constants'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

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
const h1 = document.querySelector('.content h1')
h1.textContent = content.about

const navButtons = document.querySelectorAll('.nav-link')
navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const section = button.dataset.section
    h1.textContent = content[section]
  })
})

// Animations

const animatedElements = [
  'header h1',
  'header nav button',
  '.content h1'
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
