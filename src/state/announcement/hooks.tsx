import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../index'
import { toggleAnnouncementInfo } from './actions'

export function useAnnouncementInfoVisible(): boolean {
  return useSelector((state: AppState) => state.announcement.AnnouncementInfoVisible)
}

export function useAnnouncementInfoToggle(): () => void {
  const dispatch = useDispatch()
  return useCallback(() => dispatch(toggleAnnouncementInfo()), [dispatch])
}
