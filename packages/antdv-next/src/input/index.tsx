import type { App } from 'vue'
import Group from './Group'
import Input from './Input'
import OTP from './OTP'
import Password from './Password'
import Search from './Search'
import TextArea from './TextArea'

export type { InputGroupProps } from './Group'
export type { InputEmits, InputProps, InputRef, InputSlots } from './Input'
export type { OTPProps } from './OTP'
export type { PasswordProps } from './Password'
export type { SearchProps } from './Search'
export type { TextAreaProps, TextAreaRef } from './TextArea'

const CompoundedInput = Input

;(CompoundedInput as any).Search = Search
;(CompoundedInput as any).TextArea = TextArea
;(CompoundedInput as any).Password = Password
;(CompoundedInput as any).OTP = OTP
;(CompoundedInput as any).Group = Group

;(CompoundedInput as any).install = (app: App) => {
  app.component(Input.name, CompoundedInput)
  app.component(Search.name, Search)
  app.component(TextArea.name, TextArea)
  app.component(Password.name, Password)
  app.component(OTP.name, OTP)
  app.component(Group.name, Group)
  return app
}

export default CompoundedInput
