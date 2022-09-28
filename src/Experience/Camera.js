import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Experience from "./Experience";
// We can sent the experience as a parameter to each class that needs it
export default class Camera{
    constructor(){

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        // console.log(this);

        this.setInstance();
        this.setOrbitControls()

        this.sizes.on('resize', () => {
            console.log('Hey');
        })
    }
    setInstance(){
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        )
        this.instance.position.set(6,4,8)
        this.scene.add(this.instance)
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.instance,this.canvas)
        this.controls.enableDamping = true
    }
    resize(){
       this.instance.aspect = this.sizes.width / this.sizes.height
       this.instance.updateProjectionMatrix()
    }
    update(){
        this.controls.update()
    }
}