import canUseDom from '@v-c/util/dist/Dom/canUseDom'
import { isStyleSupport as rcIsStyleSupport } from '@v-c/util/dist/Dom/styleChecker'

export const canUseDocElement = () => canUseDom() && window.document?.documentElement

export const isStyleSupport = rcIsStyleSupport

export default isStyleSupport
