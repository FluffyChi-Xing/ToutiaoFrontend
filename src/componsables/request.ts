import { $fetch } from 'ofetch'
import { ElMessage } from "element-plus";
enum fetchMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT'
}
interface RequestObj {
    url: string;
    req?: any;
    isGraph?: boolean;
}
/*
@base: 基础路径 可选
@url: 请求路径  必填
@fetchOptions: 请求配置项 可选
 */
export function $request(url: RequestObj, fetchOptions?: FetchOptions<ResponseTypeCustom>, base?: string) {
    if (base) {
        url.url = base + url.url
    }
    // 检查请求方法
    let method: fetchMethod
    if (fetchOptions?.method) {
        method = fetchOptions.method as fetchMethod
    } else {
        method = fetchMethod.GET
    }
    // 处理完后使用service发送请求
    return service(url.url, { ...fetchOptions, method })
}

const service = $fetch.create({
    async onRequestError() {
        // TODO 请求错误拦截
        ElMessage.error('网络错误')
    },
    async onResponse({response}) {
        // TODO 响应拦截
        return new Promise((resolve, reject) => {
            if (response.status === 401) {
                ElMessage.error('登录状态过期，请重新登录！')
            }
            if (!response._data?.errorCode) {
                resolve((response as any))
            } else {
                ElMessage.error('请求失败 - ' + (response._data.message || '未知错误'))
                reject(response._data)
            }
        })
    },
    async onResponseError({response}) {
        // TODO 响应错误拦截
        if (response.status.toString().startsWith('4') || response.status.toString().startsWith('5')) {
            // console.error('optionsoptionsoptions', options, response)
            ElMessage.error('请求失败')
        }
    },
})

