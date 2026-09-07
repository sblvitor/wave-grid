import * as THREE from 'three'
import Sizes from "./utils/Sizes"
import Camera from './Camera'
import Renderer from './Renderer'
import Stage from './Stage'
import Debug from './utils/Debug'

let instance = null

export default class Orchestrator {

  constructor(canvas) {
 
    // Singleton
    if(instance) return instance
    instance = this

    // Options
    this.canvas = canvas

    // Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.clock = new THREE.Timer()
    this.clock.connect(document)

    this.stage = new Stage()
 
    // Resize event
    this.sizes.emitter.on('resize', () => {
      this.resize()
    })

    this.renderer.instance.setAnimationLoop(this.animate.bind(this))
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  animate() {
    this.clock.update()

    const delta = this.clock.getDelta()
    const elapsed = this.clock.getElapsed()

    this.update(elapsed, delta)
  }

  update(_, delta) {
    this.camera.update()
    this.stage.update(delta)
    this.renderer.update()
  }

  destroy() {
    this.clock.disconnect()
    this.clock.dispose()
    this.sizes.emitter.off('resize')

    // Traverse the whole scene
    this.scene.traverse((child) => {
      // Test if it's a mesh
      if(child instanceof THREE.Mesh) {
        child.geometry.dispose()

        // Loop through the material properties
        for(const key in child.material) {
          const value = child.material[key]

          // Test if there is a dispose function
          if(value && typeof value.dispose === 'function') {
            value.dispose()
          }
        }
      }
    })

    // this.camera.controls.dispose()
    this.renderer.instance.dispose()
    
    if(this.debug.active) this.debug.ui.destroy()
  }

}
