import Orchestrator from "./Orchestrator";
import * as THREE from 'three'

export default class Renderer {
 
  constructor() {
    this.orchestrator = new Orchestrator()
    this.canvas = this.orchestrator.canvas
    this.sizes = this.orchestrator.sizes
    this.scene = this.orchestrator.scene
    this.camera = this.orchestrator.camera

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    })
    this.instance.toneMapping = THREE.ACESFilmicToneMapping
    this.instance.toneMappingExposure = 1.95
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFShadowMap
    this.instance.setClearColor('#808080')
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }
 
  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }

}
