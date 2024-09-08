interface ResponseMap {
    blob: Blob;
    text: string;
    arrayBuffer: ArrayBuffer;
}
type ResponseTypeCustom = keyof ResponseMap | 'json';
