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

const aboutBtn = document.querySelector('.about')

let aboutSplit
let contentSplit
let splitReady = document.fonts.ready.then(() => {
  aboutSplit = SplitText.create('.about', { type: 'chars' })
  contentSplit = SplitText.create('.content h1', { type: 'words' })
})

const tl = gsap.timeline({ paused: true })

aboutBtn.addEventListener('mouseenter', async () => {
  await splitReady
  console.log('mouseenter')
  // gsap.set(['.about', aboutSplit.chars], {
  //   opacity: 0,
  //   filter: 'blur(12px)',
  //   willChange: "filter, opacity"
  // })
  tl.to(aboutSplit.chars, {
    yPercent: (index) => index % 2 === 0 ? -50 : 50 ,
    opacity: 0,
    filter: 'blur(12px)',
    stagger: {
      each: 0.08,
      // from: 'random'
    },
    duration: 1
  })
  // .to(aboutSplit.chars, {
  //   yPercent: 0,
  //   opacity: 1,
  //   filter: "blur(0px)",
  //   duration: 0.8,
  //   stagger: {
  //     each: 0.08,
  //     // from: "start"
  //   },
  //   ease: "power2.out",
  // }, '-=0.5')
  tl.play()
})

// navButtons.forEach((button) => {
//   button.addEventListener('mouseenter', async () => {
//     await splitReady
//     gsap.from(navLinkSplit.chars, {
//       yPercent: "random([-100, 100])",
//       autoAlpha: 0,
//       stagger: {
//         amount: 0.5,
//         from: 'random'
//       }
//     })
//   })
// })
