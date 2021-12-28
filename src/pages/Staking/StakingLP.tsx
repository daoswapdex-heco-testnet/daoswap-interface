import React from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { TYPE } from '../../theme'
import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earnHistory/styled'
import { useTranslation } from 'react-i18next'
import PoolCard from '../../components/staking/PoolCardForLP'
import { NodeTabs } from '../../components/NavigationTabs/node'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

export default function StakingLP() {
  const { t } = useTranslation()

  const stakingList: any[] = [
    {
      period: 2,
      name: 'StakingPeriod2',
      capAmount: 50000,
      apr: 120,
      aprDAO: 60,
      aprDST: 60
    },
    {
      period: 1,
      name: 'StakingPeriod1',
      capAmount: 50000,
      apr: 120,
      aprDAO: 60,
      aprDST: 60
    }
  ]

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>{t('Hash Node Staking')}</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={9}>
                  {t('Stake DAO/USDT LP, share 1/3 fee.')}
                  <br />
                  <TYPE.white fontSize={9}>0xa9bB710996d6ed61B83a5EAB583bAe683199c2de</TYPE.white>
                </TYPE.white>
              </RowBetween>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection>

      <NodeTabs active={'staking-lp'} />

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <PoolSection>
          {stakingList?.length === 0
            ? t('No active staking')
            : stakingList?.map(stakingInfo => {
                return <PoolCard key={stakingInfo.period} stakingInfo={stakingInfo} />
              })}
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}
