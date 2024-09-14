export declare namespace FrontendDtos {
    export interface WmNewsPageDto {
        status?: number;
        beginPubDate?: Date | null;
        endPubDate?: Date | null;
        channelId?: number;
        keyword?: string;
        page: number;
        size: number;
    }

    export interface WmNewsPageVo {
        id: number;
        userId: number;
        title: string;
        content: string;
        type: string;
        channelId: string;
        labels: string;
        createTime: string;
        submitTime: string;
        status: number;
        publishTime: string;
        reason: string;
        articleId: number;
        images: string;
        enable: number;
    }
    export interface channelDto {
        id: number;
        name: string;
        description: string;
        isDefault: boolean;
        status: boolean;
        ord: number;
        createdTime: string;
    }
}
