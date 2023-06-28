import Schematic from "./Schematic";
import TurtleManager from "./TurtleManager";

class BuildManager {
    // Variables
    private manager: TurtleManager;
    private schematic: Schematic;
    private timer: NodeJS.Timer|null;

    // Functions
    constructor(manager: TurtleManager, schematic: Schematic){
        this.manager = manager;
        this.schematic = schematic;
        this.timer = null;
    }

    async start(){
        if(this.timer !== null)
            clearInterval(this.timer);

        this.timer = setInterval(() => {
            this.step();
        }, 1000);
    }

    async stop(){
        if(this.timer === null) return;
        clearInterval(this.timer);
    }

    async step(){
        // Progress every turtle by one instruction
        this.manager.forEach((i, turtle) => {
            turtle.forward();
        });
    }
};

export default BuildManager;