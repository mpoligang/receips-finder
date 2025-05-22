export interface Thumbs {
    small: string;
    medium: string;
    large: string;
}

export class ThumbsInstance {
    public small: string;
    public medium: string;
    public large: string;

    constructor() {
        this.small = '';
        this.medium = '';
        this.large = '';
    }
}