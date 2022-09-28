import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './Worlds/World.js'
import Resources from './Utils/Resources.js'
import sources from './Worlds/sources.js'

// import sources from './sources.js'

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    /**
     * We wrote everything in the same destroy() method for the sake of simplicity
     * if you have a more complex project with a lot to destroy, you may want to create a destroy() method for each class
     */
    destroy(){
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) => {
            
            if(child instanceof THREE.Mesh){
                child.geometry.dispose()

                for(const key in child.material){
                    const value = child.material[key]
                    
                    if(value && typeof value.dispose === 'function'){
                        value.dispose()
                    }
                }
            }
        })
        this.camera.controls.dispose()
        this.renderer.instance.dispose()
    }
}


/**
 * Might look hard and counterproductive at first, but a real-life Three.js project can end up being so huge that you better not have a spaghetti code if you want to get that project done right
 * 
 * Having these separate classes is alos great for reusing them with other projects
 * Most of the Utils classes we create can be reused without doing anything to them
 * 
 * Structuring code also creates a good environment in whic to work with other developers and limits conflicts
 * 
 * Each developer can work on a specific class
 * 
 * 
 * Many of the decisions we made during this lesso are specific to my personal preferences
 * 
 * You should work on your structure and create a template so that you can start working on a new project more quickly
 * 
 * Don't hesitate to share that structure with other
 */