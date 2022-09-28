import EventEmitter from "./EvenEmitter";


export default class Time extends EventEmitter {
    constructor(){
        super()
        // console.log('Time instantiated');


        // Setup
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 10

        window.requestAnimationFrame(() => {
            this.tick()
        })

    }
    tick(){
        const currentTime = Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start
        
        this.trigger('tick')
        window.requestAnimationFrame( () => {
                this.tick()
            })
            
        }
}