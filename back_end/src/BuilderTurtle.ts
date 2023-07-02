import Turtle from "./remote/Turtle";
import Schematic from "./Schematic";
import fs from "fs";

class BuilderTurtle extends Turtle {
    public async scanChests(){
        return false;
    }

    public async testSchem(){
        let data = fs.readFileSync(`./assets/test_schem.schem`);
        let schem = await Schematic.parse(data);

        await this.up();

        for(let x = 0; x < schem.Length; x++){
            await this.forward();
            await this.placeDown();
        }
        await this.turnRight();
        for(let z = 0; z < schem.Width; z++){
            await this.forward();
            await this.placeDown();
        }
        await this.turnRight();
        for(let y = 0; y < schem.Width; y++){
            await this.up();
            await this.placeDown();
        }
        
        for(let x = 0; x < schem.Length; x++){
            await this.forward();
        }
        await this.turnRight();
        for(let z = 0; z < schem.Width; z++){
            await this.forward();
        }
        await this.turnRight();
        for(let y = 0; y < schem.Width; y++){
            await this.down();
        }

        await this.down();
        return true;
    }
}

export default BuilderTurtle;