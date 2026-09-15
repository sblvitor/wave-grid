const TIME_ZONE = 'America/Campo_Grande'
const LABEL = 'Brazil'

const formatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
})

export function startLocalTime(el) {
  const render = () => {
    el.textContent = `${LABEL} · ${formatter.format(new Date())}`
  }

  render()

  // primeiro tick na virada do minuto, depois de minuto em minuto
  setTimeout(() => {
    render()
    setInterval(render, 60000)
  }, 60000 - (Date.now() % 60000))
}
