import * as ContentData from './apis/ContentData'
import * as LoginApi from './apis/LoginApi'
import * as MaterialApi from './apis/MaterialApis'
export const $api = {
    ...ContentData,
    ...LoginApi,
    ...MaterialApi
}
