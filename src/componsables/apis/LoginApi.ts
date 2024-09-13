import {$request, requestEnums} from "@/componsables/request";

const base = 'http://localhost:51602'

// interface RequestObj {
//     url: string;
//     method?: any;
//     isGraph?: boolean;
//     body?: any
// }

export function LoginIn(username: string, password: string) {
    const url = '/wemedia/login/in'
    const requestUrl = base + url;
    const data = {
        name: username,
        password: password
    }
    // 发送请求
    return $request(requestUrl, 'POST' as requestEnums, data)
}
