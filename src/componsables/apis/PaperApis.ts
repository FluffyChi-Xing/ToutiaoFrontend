import {$request, requestEnums} from "@/componsables/request";
import type {SendPaper} from "@/componsables/apis/SendPaper";

const baseUrl = 'http://localhost:5160/wemedia'

export function submitPaper(dto: SendPaper.paperDto) {
    const apiUrl = '/news/submit';
    const requestUrl = baseUrl + apiUrl;
    const method = 'POST' as requestEnums;
    const data = {
        ...dto
    }
    return $request(requestUrl, method, data);
}
