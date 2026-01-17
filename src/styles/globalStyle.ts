import { createGlobalStyle } from 'styled-components'
import type { DefaultTheme } from 'styled-components'

export const GlobalStyle = createGlobalStyle<{ theme?: DefaultTheme }>`
    body, html {
        background: ${(props) => props.theme.appBackground};
        color: ${(props) => props.theme.appColor};
        font-family: "Inter", sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
        margin: 0;
        padding: 0;
    }
    h1, h2, h3, h4, h5, h6 {
        font-family: inherit;
    }
    h1, h2, p, ul, li {
        margin: 0;
        padding: 0; 
    }
`
