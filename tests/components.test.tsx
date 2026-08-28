import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ThemeProvider } from 'styled-components'
import {
  BannerImage,
  CardComponent,
  Logo,
  StyledButton,
} from '@/components'
import { darkTheme, lightTheme } from '@/styles/theme'

describe('componentes visuais', () => {
  it.each([
    ['light', lightTheme],
    ['dark', darkTheme],
  ])('renderiza o logo de acordo com o tema %s', (_themeName, theme) => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Logo height={41} width={100} />
      </ThemeProvider>
    )
    const logo = container.querySelector('figure')

    expect(logo).toBeInTheDocument()
    const logoStyles = getComputedStyle(logo as HTMLElement)
    expect(logoStyles.backgroundImage).toContain(theme.appLogo)
    expect(logoStyles.backgroundSize).toBe('cover')
    expect(logoStyles.height).toBe('41px')
    expect(logoStyles.width).toBe('100px')
  })

  it('renderiza o banner com a imagem e altura esperadas', () => {
    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <BannerImage />
      </ThemeProvider>
    )
    const banner = container.firstElementChild

    expect(banner).toBeInTheDocument()
    const bannerStyles = getComputedStyle(banner as HTMLElement)
    expect(bannerStyles.backgroundImage).toContain('image-login.svg')
    expect(bannerStyles.backgroundSize).toBe('cover')
    expect(bannerStyles.height).toBe('768px')
  })

  it('aplica as cores do tema nas classes do StyledButton', () => {
    const { container, rerender } = render(
      <ThemeProvider theme={lightTheme}>
        <StyledButton className="primary">Salvar</StyledButton>
      </ThemeProvider>
    )
    let button = container.querySelector('button') as HTMLButtonElement

    expect(getComputedStyle(button).backgroundColor).toBe('rgb(12, 112, 242)')
    expect(getComputedStyle(button).color).toBe('rgb(255, 255, 255)')

    rerender(
      <ThemeProvider theme={darkTheme}>
        <StyledButton className="alert" disabled>
          Excluir
        </StyledButton>
      </ThemeProvider>
    )
    button = container.querySelector('button') as HTMLButtonElement

    expect(getComputedStyle(button).backgroundColor).toBe('rgb(49, 54, 73)')
    expect(getComputedStyle(button).color).toBe('rgb(109, 120, 142)')
    expect(getComputedStyle(button).cursor).toBe('not-allowed')
  })

  it('mantem snapshots dos componentes e suas classes', () => {
    const { asFragment: renderCard } = render(
      <ThemeProvider theme={lightTheme}>
        <CardComponent className="success">Conteudo do card</CardComponent>
      </ThemeProvider>
    )
    const {
      asFragment: renderPrimaryButton,
      container: primaryButtonContainer,
    } = render(
      <ThemeProvider theme={lightTheme}>
        <StyledButton className="primary">Salvar</StyledButton>
      </ThemeProvider>
    )
    const {
      asFragment: renderAlertButton,
      container: alertButtonContainer,
    } = render(
      <ThemeProvider theme={darkTheme}>
        <StyledButton className="alert" disabled>
          Excluir
        </StyledButton>
      </ThemeProvider>
    )

    expect(renderCard()).toMatchSnapshot('card-success')
    expect(renderPrimaryButton()).toMatchSnapshot('button-primary')
    expect(renderAlertButton()).toMatchSnapshot('button-alert-disabled')
    expect({
      backgroundColor: getComputedStyle(
        primaryButtonContainer.querySelector('button') as HTMLButtonElement
      ).backgroundColor,
      color: getComputedStyle(
        primaryButtonContainer.querySelector('button') as HTMLButtonElement
      ).color,
    }).toMatchSnapshot('button-primary-styles')
    expect({
      backgroundColor: getComputedStyle(
        alertButtonContainer.querySelector('button') as HTMLButtonElement
      ).backgroundColor,
      color: getComputedStyle(
        alertButtonContainer.querySelector('button') as HTMLButtonElement
      ).color,
      cursor: getComputedStyle(
        alertButtonContainer.querySelector('button') as HTMLButtonElement
      ).cursor,
    }).toMatchSnapshot('button-alert-disabled-styles')
  })
})