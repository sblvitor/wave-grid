import * as THREE from 'three'
import Orchestrator from "./Orchestrator";

export default class Camera {
 
  constructor() {
    this.orchestrator = new Orchestrator()
    this.sizes = this.orchestrator.sizes
    this.scene = this.orchestrator.scene
    this.canvas = this.orchestrator.canvas

    this.setInstance()
  }

  setInstance(){
    this.instance = new THREE.PerspectiveCamera(
      40,
      this.sizes.width / this.sizes.height,
      0.1,
      200
    )
    this.scene.add(this.instance)
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }
  
  // update() {}
}
