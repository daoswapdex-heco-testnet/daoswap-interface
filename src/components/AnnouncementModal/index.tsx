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
            1，首次流动性挖矿将于2021年11月9日上午11点至2021年11月23日上午11点，针对以下矿池开启。
            <br />
            USDT/DAO，USDT/ETH，USDT/HFIL，USDT/HT。
          </Text>
          <Text fontWeight={500} fontSize={14} margin={10}>
            2，据官方消息，布局元宇宙生态的DAOSWAP
            DEX已通过区块链安全公司CertiK的安全审计。CertiK通过技术专家对整个代码库全面逐行手动检查，针对各类攻击问题测试智能合约的安全性，并确保合约符合当前行业标准与客户规范等。报告显示，DAOSWAOP并无严重和重大漏洞，部分次要问题已得到解决。
          </Text>
          <Text fontWeight={500} fontSize={14} margin={10}>
            3，DAOSWAP交易币种增加至：DAO，ETH，UNI，FIL，HT，MDEX，DOGE，SHIB、ZEC、ZKS等近十余种主流代币。并可直接通过USDT和DAO购买上述代币。
          </Text>
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
