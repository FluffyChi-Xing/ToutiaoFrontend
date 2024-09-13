import axios from "axios";

enum requestEnums {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export function $request(url: string, method: requestEnums, data?: any): any {
    // 处理请求参数
    const requestConfig: any = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Connection': 'keep-alive',
        },
        url: url,
        data: data
    }
    // 处理请求参数
    // if (params) {
    //     requestConfig.params = params
    // }
    // 处理请求数据
    if (data) {
        // 如果是post请求，使用json格式传递数据
        if (method === requestEnums.POST) {
            requestConfig.data = JSON.stringify(data)
            // console.log(requestConfig.data)
        }
        requestConfig.data = data
    }
    // 调用请求方法
    return getRequest(requestConfig).then((res: any) => {
        // console.log(res)
        return res;
    }).catch((err: any) => {
        console.log(err)
    })
}

function getRequest(requestConfig: any): any {
    return new Promise((resolve, reject) => {
        axios(requestConfig).then((res: any) => {
            resolve(res)
        }).catch((err: any) => {
            reject(err)
        })
    })
}

