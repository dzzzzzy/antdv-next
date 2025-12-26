import type { VueNode } from '../../_util/type'
import { LeftOutlined, LoadingOutlined, RightOutlined } from '@antdv-next/icons'

export default function useColumnIcons(rtl: boolean, expandIcon?: VueNode) {
  let mergedExpandIcon = expandIcon
  if (mergedExpandIcon === undefined) {
    mergedExpandIcon = rtl ? <LeftOutlined /> : <RightOutlined />
  }

  const loadingIcon = <LoadingOutlined spin />

  return [mergedExpandIcon, loadingIcon] as const
}
