import * as ContentData from './apis/ContentData'
import * as LoginApi from './apis/LoginApi'
export const $api = {
    ...ContentData,
    ...LoginApi
}
