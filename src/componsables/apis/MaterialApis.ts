import {$request, requestEnums} from "@/componsables/request";

const baseUrl = 'http://localhost:51602/wemedia/'

export function getList(pageNo: number, isCollection: number) {
    const pageSize: number = 10
    const apiUrl = '/material/page'
    const requestUrl = baseUrl + apiUrl
    const data = {
        page: pageNo,
        size: pageSize,
        isCollection: isCollection
    }
    return $request(requestUrl, 'POST' as requestEnums, data);
}
