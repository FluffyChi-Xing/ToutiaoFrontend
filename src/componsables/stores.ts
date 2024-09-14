import * as counter from '@/stores/counter'
import * as page from '@/componsables/stores/PageContextStore'

export const $stores = {
    ...counter,
    ...page
}
