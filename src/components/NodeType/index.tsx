import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { TYPE } from '../../theme'

import { Pair, JSBI } from '@daoswapdex-heco-testnet/daoswap-sdk'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { useActiveWeb3React } from '../../hooks'
import { useTranslation } from 'react-i18next'

import {
  USDT_DAO_PAIR_ADDRESS,
  USDT_DAO_STAKING_REWARDS_ADDRESS,
  NODE_TYPE_STELLAR_MIN_USD_VALUE,
  NODE_TYPE_PLANETARY_MIN_USD_VALUE
} from '../../constants/index'
import { useStakingContract } from '../../hooks/useContract'
import { useTokenBalance } from '../../state/wallet/hooks'
import { useSingleCallResult, NEVER_RELOAD } from '../../state/multicall/hooks'
import QuestionHelper from '../QuestionHelper'

const EmptyProposals = styled.div`
  border: 1px solid ${({ theme }) => theme.text4};
  padding: 16px 12px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export function NodeType({ pairs }: { pairs: Pair[] }) {
  const { t } = useTranslation()
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // Node Info Get
  // get usdt-dao pair balance in pool
  let nodeTypePairLiquidityToken = undefined
  useMemo(
    () =>
      pairs.map(pair => {
        if (USDT_DAO_PAIR_ADDRESS.toLowerCase().trim() === pair.liquidityToken.address.toLowerCase().trim()) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          nodeTypePairLiquidityToken = pair.liquidityToken
          return pair
        } else {
          return null
        }
      }),
    [pairs, nodeTypePairLiquidityToken]
  )
  const userPoolBalance = useTokenBalance(account ?? undefined, nodeTypePairLiquidityToken)
  // get usdt-dao balance in DAO Liquidity pool
  const stakingContract = useStakingContract(USDT_DAO_STAKING_REWARDS_ADDRESS)
  const { result } = useSingleCallResult(stakingContract, 'balanceOf', [account ?? undefined], NEVER_RELOAD)
  const userPoolBalanceNumber = JSBI.BigInt(userPoolBalance ? userPoolBalance.raw.toString() : 0)
  const userLiquidityPoolBalanceNumber = JSBI.BigInt(result ? result.toString() : 0)
  const userLiquidityPoolBalance = JSBI.add(userPoolBalanceNumber, userLiquidityPoolBalanceNumber)
  let NodeTypeName = 'None'
  if (JSBI.greaterThanOrEqual(userLiquidityPoolBalance, NODE_TYPE_STELLAR_MIN_USD_VALUE)) {
    NodeTypeName = 'Stellar'
  } else if (
    JSBI.lessThan(userLiquidityPoolBalance, NODE_TYPE_STELLAR_MIN_USD_VALUE) &&
    JSBI.greaterThanOrEqual(userLiquidityPoolBalance, NODE_TYPE_PLANETARY_MIN_USD_VALUE)
  ) {
    NodeTypeName = 'Planet'
  }

  return (
    <AutoColumn gap="lg" style={{ width: '100%', marginTop: '1rem' }}>
      <EmptyProposals>
        <RowBetween>
          <TYPE.body color={theme.text3} textAlign="center">
            {t('Node Type')}: {t(`NodeType ${NodeTypeName}`)}
          </TYPE.body>
          <QuestionHelper
            text={
              t(
                '1, Planet and Stellar node status will be determined by the number of DAO/USDT pool liquidity provider certificates (LP) held.'
              ) +
              '<br/>' +
              t('2, Planet nodes need >=1000 LP and Stellar need >=10000 LP.') +
              '<br/>' +
              t(
                '3, The above criteria are valid within DAO price <= 30USDT, after >= 30USDT it will be decided by community vote (whether to consider lowering LP value criteria).'
              ) +
              '<br/>' +
              t('Aurora CAC, effective on November 17, 2021.')
            }
          />
        </RowBetween>
      </EmptyProposals>
    </AutoColumn>
  )
}
