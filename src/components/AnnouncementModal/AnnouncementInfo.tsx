import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { AlertCircle } from 'react-feather'
import { useAnnouncementInfoToggle, useAnnouncementInfoVisible } from '../../state/announcement/hooks'

const PhishAlert = styled.div<{ isActive: any }>`
  width: 100%;
  padding: 6px 6px;
  background-color: #93b954;
  color: white;
  font-size: 11px;
  justify-content: space-between;
  align-items: center;
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`

export default function AnnouncementInfo() {
  const { t } = useTranslation()
  const toggleAnnouncementInfo = useAnnouncementInfoToggle()
  const showAnnouncementInfo = useAnnouncementInfoVisible()

  return (
    <PhishAlert isActive={showAnnouncementInfo} onClick={toggleAnnouncementInfo}>
      <div style={{ display: 'flex' }}>
        <AlertCircle style={{ marginRight: 6 }} size={12} /> {t('You have a new announcement')}
      </div>
    </PhishAlert>
  )
}
