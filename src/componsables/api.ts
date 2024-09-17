import * as ContentData from './apis/ContentData'
import * as LoginApi from './apis/LoginApi'
import * as MaterialApi from './apis/MaterialApis'
import * as PaperApi from './apis/PaperApis'
export const $api = {
    ...ContentData,
    ...LoginApi,
    ...MaterialApi,
    ...PaperApi
}
