export type TTheme = 'dark' | 'light' | 'system'

export interface IAppState {
  theme: TTheme
  currentRoomId: string
  notifications: Record<string, string>
}
