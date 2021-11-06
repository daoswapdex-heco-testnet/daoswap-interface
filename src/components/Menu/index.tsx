import React, { useRef } from 'react'
import { BookOpen, Info, MessageCircle, PieChart, Link, Gift, Layers } from 'react-feather'
import styled from 'styled-components'
import { ReactComponent as MenuIcon } from '../../assets/images/menu.svg'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

import { ExternalLink } from '../../theme'
import { useTranslation } from 'react-i18next'

const StyledMenuIcon = styled(MenuIcon)`
  path {
    stroke: ${({ theme }) => theme.text1};
  }
`

const StyledMenuButton = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};

  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 13.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -18.25rem;
  `};
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

const MenuItemHref = styled.a`
  flex: 1;
  padding: 0.5rem 0.5rem;
  color: ${({ theme }) => theme.text2};
  text-decoration: none;
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }
  > svg {
    margin-right: 8px;
  }
`

// TODO:Daoswap UNI -> DAO
export default function Menu() {
  const { t } = useTranslation()

  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    // TODO:Daoswap Display Comments
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>
        <StyledMenuIcon />
      </StyledMenuButton>

      {open && (
        <MenuFlyout>
          <MenuItem id="link" href="https://test.www.daoswap.cc/">
            <Info size={14} />
            {t('Daoswap')}
          </MenuItem>
          <MenuItem id="link" href="https://test.www.daoswap.cc/Whitepaper.pdf">
            <BookOpen size={14} />
            {t('Docs')}
          </MenuItem>
          <MenuItem id="link" href="https://twitter.com/Daoswapdex">
            <MessageCircle size={14} />
            Twitter
          </MenuItem>
          <MenuItemHref id="link" href="https://info.heco.daoswap.cc" target="_self">
            <PieChart size={14} />
            {t('Charts')}
          </MenuItemHref>
          <MenuItemHref id="link" href="https://bridge.heco.daoswap.cc/token/DAO" target="_self">
            <Link size={14} />
            {t('Bridge')}
          </MenuItemHref>
          <MenuItemHref id="link" href="https://test.www.daoswap.cc/hash-mining" target="_self">
            <Layers size={14} />
            {t('Hash Mining')}
          </MenuItemHref>
          <MenuItemHref id="link" href="https://test.www.daoswap.cc/competition-mining" target="_self">
            <Gift size={14} />
            {t('Competition Mining')}
          </MenuItemHref>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
