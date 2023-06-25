import Schematic from "mc-schematic";
import fs from "fs";

/**
 * TODO: Convert to using NBT reader instead
 */

fs.readFile('test/test1.schematic', (err, data) => {
    Schematic.parse(data, (err: any, schem: any) => {
        console.log(schem.getBlock(0, 0, 0));
    });
});