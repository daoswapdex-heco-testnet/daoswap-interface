import React from 'react'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import styled from 'styled-components'
import { TYPE } from '../../theme'
import { ButtonPrimary } from '../Button'
import { Break, CardNoise, CardBGImage } from './styled'
import { useTranslation } from 'react-i18next'
import { useColor } from '../../hooks/useColor'

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 1rem;
`

const Wrapper = styled(AutoColumn)<{ showBackground: boolean; bgColor: any }>`
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
  position: relative;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '1')};
  background: ${({ theme, bgColor, showBackground }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${bgColor} 0%, ${showBackground ? theme.black : theme.bg5} 100%) `};
  color: ${({ theme, showBackground }) => (showBackground ? theme.white : theme.text1)} !important;

  ${({ showBackground }) =>
    showBackground &&
    `  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);`}
`

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  padding: 1rem;
  z-index: 1;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: 48px 1fr 96px;
  `};
`

const BottomSection = styled.div<{ showBackground: boolean }>`
  padding: 12px 16px;
  opacity: ${({ showBackground }) => (showBackground ? '1' : '0.4')};
  border-radius: 0 0 12px 12px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  z-index: 1;
`

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

export default function PoolCard({ stakingInfo }: { stakingInfo: any }) {
  const { t } = useTranslation()
  const backgroundColor = useColor(undefined)
  return (
    <Wrapper showBackground={true} bgColor={backgroundColor}>
      <CardBGImage desaturate />
      <CardNoise />

      <TopSection>
        <TYPE.white fontWeight={600} fontSize={24} style={{ width: '100%' }}>
          {t(stakingInfo.name)}
        </TYPE.white>
      </TopSection>

      <StatContainer>
        <RowBetween>
          <TYPE.white>{t('Annual rate')}</TYPE.white>
          <TYPE.white>{stakingInfo.apr} %</TYPE.white>
        </RowBetween>
      </StatContainer>

      <Break />

      <>
        <BottomSection showBackground={true}>
          <StyledLink
            href={`https://test.staking.heco.daoswap.cc/staking/single/${stakingInfo.period}`}
            style={{ width: '100%' }}
          >
            <ButtonPrimary padding="8px" borderRadius="8px">
              {t('Stake')}
            </ButtonPrimary>
          </StyledLink>
        </BottomSection>
      </>
    </Wrapper>
  )
}
