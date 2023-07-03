import { Turtle, ItemDetails } from "./remote/Turtle";
import Schematic from "./Schematic";
import fs from "fs";

class BuilderTurtle extends Turtle {
    public async scanChests(){
        let rows = 0;
        let chests: string[] = [];

        await this.up();
        await this.turnRight();
        await this.turnRight();
        await this.forward();
        await this.turnLeft();

        for(let x = 0; x < 20; x++){
            let blockBelow = await this.inspectDown();
            
            if(blockBelow.name !== "minecraft:chest")
                break;

            // Chest is below the turtle, log it
            let item = await this.callInventory("bottom", "getItemDetail", 1) as ItemDetails;
            chests.push(item.name);
            await this.forward();
            rows++;
        }

        for(let x = 0; x < rows; x++){
            await this.back();
        }

        await this.turnLeft();
        await this.forward();
        await this.down();

        return chests;
    }

    public async testSchem(){
        let data = fs.readFileSync(`./assets/test_schem.schem`);
        let schem = await Schematic.parse(data);

        // await this.up();

        // for(let x = 0; x < schem.Length; x++){
        //     await this.forward();
        //     await this.placeDown();
        // }
        // await this.turnRight();
        // for(let z = 0; z < schem.Width; z++){
        //     await this.forward();
        //     await this.placeDown();
        // }
        // await this.turnRight();
        // for(let y = 0; y < schem.Width; y++){
        //     await this.up();
        //     await this.placeDown();
        // }
        
        // for(let x = 0; x < schem.Length; x++){
        //     await this.forward();
        // }
        // await this.turnRight();
        // for(let z = 0; z < schem.Width; z++){
        //     await this.forward();
        // }
        // await this.turnRight();
        // for(let y = 0; y < schem.Width; y++){
        //     await this.down();
        // }

        // await this.down();

        return true;
    }
}

export default BuilderTurtle;