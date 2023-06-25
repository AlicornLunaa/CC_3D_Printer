
import Schematic from "./Schematic";
import fs from "fs";

async function init(){
    let data = fs.readFileSync("./assets/test_schem.schem");
    let schem = await Schematic.parse(data);

    console.log(schem.getBlock(5, 3, 7));
}

init();