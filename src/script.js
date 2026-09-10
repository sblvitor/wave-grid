import './style.css'
import Orchestrator from './threejs/Orchestrator'

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
