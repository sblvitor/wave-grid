import './style.css'
import Orchestrator from './threejs/Orchestrator'
import { content } from './constants'

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
