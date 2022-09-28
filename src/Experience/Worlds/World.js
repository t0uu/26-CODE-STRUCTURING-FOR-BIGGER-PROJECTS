// SUNLIGHT
// This is a part where the structure can vary a lot according to your project's characteristics and your preferences
// We are going to create an Enviroment class that will contain the light and later an enviroment map


import Experience from "../Experience";
import * as THREE from 'three'
import Enviroment from "./Enviroments";
import Floor from "./Floor";
import Fox from "./Fox";
export default class World {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // // Test mesh
        // const testMesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(1,1,1),
        //     new THREE.MeshStandardMaterial()
        // )
        // this.scene.add(testMesh)

        this.resources.on('ready', () => {
            // Setup
            this.environment = new Enviroment()
            this.fox = new Fox()
            this.floor = new Floor()
            
        })
     

        
    }
    update(){
         if(this.fox){
             this.fox.update()
         }
     }
}