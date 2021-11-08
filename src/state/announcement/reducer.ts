import { createReducer } from '@reduxjs/toolkit'
import { toggleAnnouncementInfo } from './actions'

export interface AnnouncementState {
  AnnouncementInfoVisible: boolean
}

export const initialState: AnnouncementState = {
  AnnouncementInfoVisible: false
}

export default createReducer(initialState, builder =>
  builder.addCase(toggleAnnouncementInfo, state => {
    state.AnnouncementInfoVisible = !state.AnnouncementInfoVisible
  })
)
