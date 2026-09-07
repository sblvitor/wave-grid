import { EffectComposer, OutputPass, RenderPass, ShaderPass } from "three/examples/jsm/Addons.js";
import Orchestrator from "./Orchestrator";
import * as THREE from 'three'
import { VignetteRGBShiftShader } from "./effects/VignetteRGBShiftShader";

export default class Renderer {
 
  constructor() {
    this.orchestrator = new Orchestrator()
    this.canvas = this.orchestrator.canvas
    this.sizes = this.orchestrator.sizes
    this.scene = this.orchestrator.scene
    this.camera = this.orchestrator.camera

    this.setInstance()
    this.setPostProcessing()
    this.setGUI()
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
 
  setPostProcessing() {
    this.effectComposer = new EffectComposer(this.instance)
    const renderPass = new RenderPass(this.scene, this.camera.instance)
    this.effectComposer.addPass(renderPass)

    this.vignetteRGBShiftPass = new ShaderPass(VignetteRGBShiftShader)
    this.vignetteRGBShiftPass.uniforms.shiftAmount.value = 0.005 // Adjust the intensity of the RGB shift
    this.vignetteRGBShiftPass.uniforms.vignetteRadius.value = 0.3 // Adjust where the effect starts (0.0 to 1.0)
    this.vignetteRGBShiftPass.uniforms.vignetteSoftness.value = 0.3 // Adjust the falloff smoothness of the effect
    this.vignetteRGBShiftPass.uniforms.darknessFactor.value = 0.5
    this.effectComposer.addPass(this.vignetteRGBShiftPass)

    this.outputPass = new OutputPass()
    this.effectComposer.addPass(this.outputPass)
  }

  setGUI() {
    this.gui = this.orchestrator.debug.ui
    if(!this.gui) return

    const ppFolder = this.gui.addFolder('Post Processing')

    ppFolder
      .add(this.vignetteRGBShiftPass.uniforms.shiftAmount, 'value', 0, 0.02, 0.001)
      .name('Shift Amount')

    ppFolder
      .add(this.vignetteRGBShiftPass.uniforms.vignetteRadius, 'value', 0, 1, 0.01)
      .name('Vignette Radius')

    ppFolder
      .add(this.vignetteRGBShiftPass.uniforms.vignetteSoftness, 'value', 0, 1, 0.01)
      .name('Vignette Softness')

    ppFolder
      .add(this.vignetteRGBShiftPass.uniforms.darknessFactor, 'value', 0, 1, 0.01)
      .name('Darkness Factor')
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)

    this.effectComposer.setSize(this.sizes.width, this.sizes.height)
    this.effectComposer.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    // this.instance.render(this.scene, this.camera.instance)
    this.effectComposer.render()
  }

}
