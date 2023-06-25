import nbt from "prismarine-nbt";
import WorldeditSchem from "./types/WorldeditSchem";
import fs from "fs";

async function init(){
    let data = fs.readFileSync("./assets/test_schem.schem");
    let parsed: WorldeditSchem = nbt.simplify((await nbt.parse(data, "big")).parsed);

    console.log(parsed);
}

init();