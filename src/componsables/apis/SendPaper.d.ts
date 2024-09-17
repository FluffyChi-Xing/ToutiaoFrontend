export namespace SendPaper {
    export interface itemList {
        id: number;
        url: string;
    }

    export interface contentTypes {
        type: string;
        value: string;
    }

    export interface paperDto {
        id: number;
        title: string;
        channelId: number;
        labels: string;
        submitedTime: Date;
        publishTime: Date;
        content: string;
        type: number;
        status: number;
        images: string[];
    }
}
