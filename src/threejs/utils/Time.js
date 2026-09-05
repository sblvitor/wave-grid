import mitt from "mitt"

export default class Time {

  constructor() {

    this.emitter = mitt()

    // Setup
    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
  
  tick() {

    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsed = this.current - this.start

    this.emitter.emit('tick')

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

}
