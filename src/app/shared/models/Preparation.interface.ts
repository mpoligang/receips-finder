export interface Preparation {
    step: number;
    instructions: string;
}

export class PreparationInstace {
    public step: number;
    public instructions: string;

    constructor() {
        this.step = 0;
        this.instructions = '';
    }
}