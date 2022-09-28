import Experience from "../Experience";
import * as THREE from 'three'

export default class Enviroment{

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        // Setup
        this.setSunLight()
        this.setEnvironmentMap()
    }
    setSunLight(){
      this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
      this.sunLight.castShadow = true
      this.sunLight.shadow.camera.far = 15
      this.sunLight.shadow.mapSize.set(1024, 1024)
      this.sunLight.shadow.normalBias = 0.05
      this.sunLight.position.set(3.5, 2, - 1.25)
      this.scene.add(this.sunLight)
      // Debug
      if(this.debug.active){
        this.debugFolder.add(this.sunLight,'intensity')
        .name('sunLightIntensity')
        .min(0)
        .max(10)
        .step(0.001)
      }
      if(this.debug.active){
        this.debugFolder.add(this.sunLight.position,'x')
        .name('sunLightX')
        .min(-5)
        .max(5)
        .step(0.001)
      }
      if(this.debug.active){
        this.debugFolder.add(this.sunLight.position,'y')
        .name('sunLightY')
        .min(-5)
        .max(5)
        .step(0.001)
      }
      if(this.debug.active){
        this.debugFolder.add(this.sunLight.position,'z')
        .name('sunLightZ')
        .min(-5)
        .max(5)
        .step(0.001)
      }
    }


    /**
     * The environment map is added after the cube and we need to inform the cube material that it needs to be updated
     */
    setEnvironmentMap(){
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding
        
        this.scene.environment = this.environmentMap.texture


        this.environmentMap.updateMaterial = () => {
    //   Putting the scene traverse in a separate function will become handy later
            this.scene.traverse((child) => {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterial()
        
        if(this.debug.active){
            this.debugFolder.add(this.environmentMap,'intensity')
            .name('envMapIntensity')
            .min(0)
            .max(4)
            .step(0.001)
            .onChange(this.environmentMap.updateMaterial)
        }
    }

}