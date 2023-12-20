import { TAB_DETAILS, TAB_MESSAGES, TAB_ROOMS } from 'constants/tabs'
import {
  THEME_DARK_VALUE,
  THEME_LIGHT_VALUE,
  THEME_SYSTEM_VALUE
} from 'constants/theme'

export type TTheme =
  | typeof THEME_DARK_VALUE
  | typeof THEME_LIGHT_VALUE
  | typeof THEME_SYSTEM_VALUE
export type TTab = typeof TAB_ROOMS | typeof TAB_MESSAGES | typeof TAB_DETAILS

export interface IAppState {
  theme: TTheme
  currentTab: TTab
  commands: string[]
  currentRoomId: string
  notifications: Record<string, string>
}
