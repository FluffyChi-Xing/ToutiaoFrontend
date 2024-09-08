import {$request} from "../request";

interface RequestObj {
    url: string;
    req?: any;
    isGraph?: boolean;
}
export function paperTest() {
    const requestObj: RequestObj = {
        url: 'http://8.130.35.251:9200/',
        req: {method: 'GET'}
    };
    return $request(requestObj);
}

export function paperMockTest() {
    const requestObj: RequestObj = {
        url: '/mock/test',
        req: {method: 'GET'}
    };
    return $request(requestObj);
}
