interface WorldeditSchem {
    PalleteMax: number;
    Pallete: { [key: string]: number };
    Version: number;
    Length: number;
    Height: number;
    Width: number;
    Metadata: {
        WEOffsetX: number;
        WEOffsetY: number;
        WEOffsetZ: number;
    },
    DataVersion: number;
    BlockData: number[];
    BlockEntities: any[];
    Offset: number[];
}

export default WorldeditSchem;