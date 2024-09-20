import {$request, requestEnums} from "@/componsables/request";
import type {FrontendDtos} from "@/componsables/apis/FrontendDtos";

const baseUrl = 'http://localhost:5160/wemedia'


// 分页查询素材列表
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

// 上传素材
export function uploadResource(file: File) {
    const apiUrl = '/material/upload_picture'
    const requestUrl = baseUrl + apiUrl
    const contentType = 'multipart/form-data'
    const data = new FormData()
    data.append('file', file)
    return $request(requestUrl, 'POST' as requestEnums, data, contentType)
}

// 查询文章列表
export function getPaperList(dto: FrontendDtos.WmNewsPageDto) {
    const apiUrl = '/news/list'
    const requestUrl = baseUrl + apiUrl
    const data = {
        ...dto
    }
    return $request(requestUrl, 'POST' as requestEnums, data)
}

// 查询频道列表
export function getChannelList() {
    const apiUrl = '/channel/channels'
    const requestUrl = baseUrl + apiUrl;
    return $request(requestUrl, 'POST' as requestEnums)
}
