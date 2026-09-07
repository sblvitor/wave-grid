import Orchestrator from "./Orchestrator";
import * as THREE from 'three'

export default class Stage {
 
  constructor() {
    this.orchestrator = new Orchestrator()
    this.scene = this.orchestrator.scene
 
    this.gridSize = 30
    this.cubeWidth = 0.8
    this.cubeHeight = 3
    this.params = {
      gap: 0.01
    }

    this.lightingParams = {
      ambientColor: '#ffffff',
      ambientIntensity:  0.5,
      directionalColor: '#ffffff',
      directionalIntensity: 4.0,
      directional2Color: '#ffffff',
      directional2Intensity: 1.0,
    }

    this.setLighting()
    this.setGrid()
    this.setGUI()
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


  setLighting() {
    const lp = this.lightingParams

    this.ambientLight = new THREE.AmbientLight(
      lp.ambientColor,
      lp.ambientIntensity
    )
    this.scene.add(this.ambientLight)

    this.directionalLight = new THREE.DirectionalLight(
      lp.directionalColor,
      lp.directionalIntensity
    )
    this.directionalLight.position.set(-20, 10, 6)
    this.directionalLight.castShadow = true
    this.directionalLight.shadow.mapSize.set(1024, 1024)
    this.directionalLight.shadow.radius = 6
    this.directionalLight.shadow.camera.near = 0.1
    this.directionalLight.shadow.camera.far = 60
    this.directionalLight.shadow.camera.left = -22
    this.directionalLight.shadow.camera.right = 22
    this.directionalLight.shadow.camera.top = 22
    this.directionalLight.shadow.camera.bottom = -22
    this.directionalLight.shadow.bias = 0.0001
    this.scene.add(this.directionalLight)
    
    this.directionalLight2 = new THREE.DirectionalLight(
      lp.directional2Color,
      lp.directional2Intensity
    )
    this.directionalLight2.position.set(10, 5, -3)
    this.directionalLight.castShadow = false
    this.scene.add(this.directionalLight2)

    this.shadowCameraHelper = new THREE.CameraHelper(
      this.directionalLight.shadow.camera
    )
    this.shadowCameraHelper.visible = false
    this.scene.add(this.shadowCameraHelper)
  }

  setGUI() {
    this.gui = this.orchestrator.debug.ui
    if(!this.gui) return

    const stageFolder = this.gui.addFolder('Stage')

    stageFolder
      .add(this.params, "gap", 0, 1, 0.01)
      .name('Gap')
      .onChange(() => this.updateGrid())
  }

  updateGrid() {
    const dummy = new THREE.Object3D()
    const spacing = this.cubeWidth + this.params.gap
    const offset = ((this.gridSize - 1) * spacing) / 2

    for(let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        const index = i * this.gridSize + j
        const x = i * spacing - offset
        const z = j * spacing - offset
        dummy.position.set(x, 0, z)
        dummy.updateMatrix()
        this.instancedMesh.setMatrixAt(index, dummy.matrix)
        this.offsetAttribute.setXY(index, x, z)
      }
    }
    this.instancedMesh.instanceMatrix.needsUpdate = true
    this.offsetAttribute.needsUpdate = true
  }
}
