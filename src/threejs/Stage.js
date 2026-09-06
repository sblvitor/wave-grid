import Orchestrator from "./Orchestrator";
import * as THREE from 'three'

export default class Stage {
 
  constructor() {
    this.orchestrator = new Orchestrator()
    this.scene = this.orchestrator.scene
 
    this.gridSize = 20
    this.cubeWidth = 0.8
    this.cubeHeight = 3

    this.setGrid()
  }

  setGrid() {
    const count = this.gridSize * this.gridSize
    const geometry = new THREE.BoxGeometry(
      this.cubeWidth, // width: 0.8
      this.cubeHeight, // height: 3
      this.cubeWidth
    )
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff })

    // Per-instance XZ world position passed to the vertex shader
    this.offsetAttribute = new THREE.InstancedBufferAttribute(
      new Float32Array(count * 2),
      2
    )
    geometry.setAttribute("aOffset", this.offsetAttribute)

    this.instancedMesh = new THREE.InstancedMesh(geometry, material, count)
    this.instancedMesh.castShadow = true
    this.instancedMesh.receiveShadow = true
    this.scene.add(this.instancedMesh)

    // Arrange cube instances into a grid
    this.updateGrid()
  }

  updateGrid() {}

  setLighting() {}
}
