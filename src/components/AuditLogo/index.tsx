import React from 'react'
// import AuditLogoPic from '../../assets/other/audit-logo.jpg'
import AuditLogoSvg from '../../assets/other/certik-logotype.svg'
import AuditLogoSvgDark from '../../assets/other/certik-logotype-white.svg'
import { useDarkModeManager } from '../../state/user/hooks'
import styled from 'styled-components'
import { AutoColumn } from '../Column'

const Wrapper = styled.div`
  width: 100%;
  max-width: 420px;
`
const Section = styled(AutoColumn)`
  padding: 24px;
`

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
    justify-content: center;
  `};
  :hover {
    cursor: pointer;
  }
`
const LogoLinkSection = styled(AutoColumn)`
  width: 60%;
`

export default function AuditLogo() {
  const [isDark] = useDarkModeManager()

  return (
    <Wrapper>
      <Section>
        <AutoColumn gap="12px" justify={'center'}>
          <LogoLinkSection>
            <LogoLink href="https://www.certik.org/projects/daoswap">
              <img width={'100%'} src={isDark ? AuditLogoSvgDark : AuditLogoSvg} alt="audit-logo" />
            </LogoLink>
          </LogoLinkSection>
        </AutoColumn>
      </Section>
    </Wrapper>
  )
}
