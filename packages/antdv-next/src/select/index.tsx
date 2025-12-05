import type { SelectProps as VcSelectProps } from '@v-c/select'
import type { CSSProperties, SlotsType } from 'vue'
import type { SemanticClassNames, SemanticClassNamesType, SemanticStyles, SemanticStylesType } from '../_util/hooks'
import type { SelectCommonPlacement } from '../_util/motion'
import type { InputStatus } from '../_util/statusUtils.ts'
import type { VueNode } from '../_util/type'
import type { ComponentBaseProps, Variant } from '../config-provider/context'
import type { SizeType } from '../config-provider/SizeContext'
import { defineComponent } from 'vue'

type RawValue = string | number

export interface LabeledValue {
  key?: string
  value: RawValue
  label: VueNode
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[] | undefined

export interface InternalSelectProps
  extends ComponentBaseProps, Omit<VcSelectProps, 'mode'> {
  prefix?: VueNode
  suffixIcon?: VueNode
  size?: SizeType
  disabled?: boolean
  mode?: 'multiple' | 'tags' | 'SECRET_COMBOBOX_MODE_DO_NOT_USE' | 'combobox'
  /** @deprecated Use `variant` instead. */
  bordered?: boolean
  /**
   * @deprecated `showArrow` is deprecated which will be removed in next major version. It will be a
   *   default behavior, you can hide it by setting `suffixIcon` to null.
   */
  showArrow?: boolean
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant
  classes?: SemanticClassNames<SemanticName> & { popup?: SemanticClassNames<PopupSemantic> }
  styles?: SemanticStyles<SemanticName> & { popup?: SemanticStyles<PopupSemantic> }
}

type SemanticName = 'root' | 'prefix' | 'suffix'

type PopupSemantic = 'root' | 'listItem' | 'list'

export type SelectClassNamesType = SemanticClassNamesType<
  SelectProps,
  SemanticName,
  { popup?: SemanticClassNames<PopupSemantic> }
>

export type SelectStylesType = SemanticStylesType<
  SelectProps,
  SemanticName,
  { popup?: SemanticStyles<PopupSemantic> }
>

export interface SelectProps
  extends Omit<InternalSelectProps, 'mode'
    | 'getInputElement'
    | 'getRawInputElement'
    | 'backfill'
    | 'placement'
    | 'dropdownClassName'
    | 'dropdownStyle'>
{
  placement?: SelectCommonPlacement
  mode?: 'multiple' | 'tags'
  status?: InputStatus
  /** @deprecated Please use `classNames.popup.root` instead */
  popupClassName?: string
  /** @deprecated Please use `classNames.popup.root` instead */
  dropdownClassName?: string
  /** @deprecated Please use `styles.popup` instead */
  dropdownStyle?: CSSProperties
  /** @deprecated Please use `popupRender` instead */
  dropdownRender?: SelectProps['popupRender']
  /** @deprecated Please use `onOpenChange` instead */
  onDropdownVisibleChange?: SelectProps['onPopupVisibleChange']
  /** @deprecated Please use `popupMatchSelectWidth` instead */
  dropdownMatchSelectWidth?: boolean | number
  popupMatchSelectWidth?: boolean | number
  styles?: SelectStylesType
  classes?: SelectClassNamesType
}

export interface SelectEmits {
  openChange: (open: boolean) => void
  [key: string]: (...args: any[]) => void
}

export interface SelectSlots {
  suffixIcon?: () => VueNode
  prefix?: () => VueNode
}

const SECRET_COMBOBOX_MODE_DO_NOT_USE = 'SECRET_COMBOBOX_MODE_DO_NOT_USE'

const Select = defineComponent<
  SelectProps,
  SelectEmits,
  string,
  SlotsType<SelectSlots>
>(
  (props) => {
    return () => {
      return null
    }
  },
  {
    name: 'ASelect',
    inheritAttrs: false,
  },
)

export default Select
