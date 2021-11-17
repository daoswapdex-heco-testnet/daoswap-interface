import React from 'react'
import styled from 'styled-components'
import Modal from '../Modal'
import { Text } from 'rebass'
import { CloseIcon } from '../../theme/components'
import { RowBetween } from '../Row'
import { AutoColumn } from '../Column'
import { useAnnouncementInfoToggle, useAnnouncementInfoVisible } from '../../state/announcement/hooks'
import { useTranslation } from 'react-i18next'

const Wrapper = styled.div`
  width: 100%;
  max-width: 420px;
`
const Section = styled(AutoColumn)`
  padding: 24px;
`

function ConfirmationContent({ onDismiss }: { onDismiss: () => void }) {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <Section>
        <RowBetween>
          <Text fontWeight={500} fontSize={16}>
            {t('Announcement')}
          </Text>
          <CloseIcon onClick={onDismiss} />
        </RowBetween>
        <AutoColumn gap="auto" justify={'start'}>
          <Text fontWeight={500} fontSize={14} margin={10}>
            {t(
              '1, The first liquidity mining will be opened from November 9, 2021 at 11&#58;00 AM to November 23, 2021 at 11&#58;00 AM for the following mining pools.'
            )}
            <br />
            USDT/DAO，USDT/ETH，USDT/HFIL，USDT/HT。
          </Text>
          <Text fontWeight={500} fontSize={14} margin={10}>
            2, {t('About Node')}:
            <Text fontWeight={500} fontSize={14} margin={10}>
              {t(
                '1, Planet and Stellar node status will be determined by the number of DAO/USDT pool liquidity provider certificates (LP) held.'
              )}
            </Text>
            <Text fontWeight={500} fontSize={14} margin={10}>
              {t('2, Planet nodes need >=1000 LP and Stellar need >=10000 LP.')}
            </Text>
            <Text fontWeight={500} fontSize={14} margin={10}>
              {t(
                '3, The above criteria are valid within DAO price <= 30USDT, after >= 30USDT it will be decided by community vote (whether to consider lowering LP value criteria).'
              )}
            </Text>
          </Text>
          <Text fontWeight={500} fontSize={14} margin={10}>
            {t('Aurora CAC, effective on November 17, 2021.')}
          </Text>
          {/* <Text fontWeight={500} fontSize={14} margin={10}>
            {t(
              '2, According to official news, DAOSWAP DEX, which lays out the meta-universe ecology, has passed security audit by CertiK. CertiK tests the security of smart contracts against various types of attack issues by manually checking the entire code base line by line by technical experts and ensuring that the contracts comply with current industry standards and customer specifications, etc. The report shows that there are no serious and significant vulnerabilities in DAOSWAOP, and some minor issues have been resolved.'
            )}
          </Text>
          <Text fontWeight={500} fontSize={14} margin={10}>
            {t(
              '3, DAOSWAP trading paris increased to&#58; DAO, ETH, UNI, FIL, HT, MDEX, DOGE, SHIB, ZEC, ZKS etc. Now you can buy the above tokens directly through USDT and DAO.'
            )}
          </Text> */}
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}

export default function AnnouncementModal() {
  const toggleAnnouncementInfo = useAnnouncementInfoToggle()
  const showAnnouncementInfo = useAnnouncementInfoVisible()

  return (
    <Modal isOpen={!showAnnouncementInfo} onDismiss={toggleAnnouncementInfo} maxHeight={90}>
      <ConfirmationContent onDismiss={toggleAnnouncementInfo} />
    </Modal>
  )
}
