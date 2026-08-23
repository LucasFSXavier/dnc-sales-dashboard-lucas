// COMPONENTS
import {
  AvatarList,
  CardComponent,
  CustomChart,
  CustomTable,
  Header,
  StyledH2,
  StyledH3,
  StyledSpan
} from '@/components'
import { Container, Grid } from '@mui/material'

// HOOKS
import { useGet } from '@/hooks'

// UTILS
import { toBRL, HighlightTextConverter } from '@/utils'

// TYPES
import type { HighlightsData, StarsData, NewsData, CustomChartProps } from '@/types'

function Home() {
  const { data: highlightsData, loading: highlightsLoading, error: highlightsError } = useGet<HighlightsData[]>('sales/highlights')
  const { data: salesMonthData, loading: salesMonthLoading, error: salesMonthError } = useGet<CustomChartProps>('sales/month')
  const mockListData = [
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 1',
      subtitle: toBRL(3452.12),
    },
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 2',
      subtitle: toBRL(2000.0),
    },
    {
      avatar: '/dnc-avatar.svg',
      name: 'Nome Sobrenome 3',
      subtitle: toBRL(3000.0),
    },
  ]

  const mockTableData = {
    headers: ['Nome', 'Email', 'Actions'],
    row: [
      [
        <span>Nome 1</span>,
        <span>nome1@email.com</span>,
        <button>Action 1</button>,
      ],
      [
        <span>Nome 2</span>,
        <span>nome2@email.com</span>,
        <button>Action 2</button>,
      ],
      [
        <span>Nome 3</span>,
        <span>nome3@email.com</span>,
        <button>Action 3</button>,
      ],
    ],
  }
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {!highlightsError && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CardComponent className={highlightsLoading ? 'skeleton-loading skeleton-loading-mh-1' : ''}>
                  {
                    !highlightsLoading && highlightsData && (
                      <>
                        <StyledH2 className='mb-1'>Total de vendas do mês</StyledH2>
                        <StyledH3 className='mb-1' size={40} lineheight={40}>{toBRL(highlightsData[0].value)}</StyledH3>
                        <StyledSpan>{ highlightsData[0].subtitle}</StyledSpan>
                      </>
                    )
                  }
                </CardComponent>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CardComponent className={
                  highlightsData ? highlightsData[1].subtitle : 'skeleton-loading skeleton-loading-mh-1'                }>
                  {
                    !highlightsLoading && highlightsData && (
                      <>
                        <StyledH2 className='mb-1' color='white'>Meta do mês</StyledH2>
                        <StyledH3 className='mb-1' color='white' size={40} lineheight={40}>{toBRL(highlightsData[1].value)}</StyledH3>
                        <StyledSpan color='white'>{HighlightTextConverter(highlightsData[1].subtitle)}</StyledSpan>
                      </>
                    )
                  }
                </CardComponent>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CardComponent className={highlightsLoading ? 'skeleton-loading skeleton-loading-mh-1' : ''}>
                  {
                    !highlightsLoading && highlightsData && (
                      <>
                        <StyledH2 className='mb-1'>Leads contactados</StyledH2>
                        <StyledH3 className='mb-1' size={40} lineheight={40}>{highlightsData[2].value}</StyledH3>
                        <StyledSpan>{highlightsData[2].subtitle}</StyledSpan>
                      </>
                    )
                  }
                </CardComponent>
              </Grid>
              <Grid size={{ xs: 12, md: 7 }}>
                {
                  !salesMonthError && (
                  <CardComponent className={salesMonthLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''}>
                    {
                      !salesMonthLoading && salesMonthData && (
                        <>
                          <StyledH2 className='mb-1'>Valor de vendas no mês</StyledH2>
                          <CustomChart
                            labels={salesMonthData.labels.map((label) => label)}
                            data={salesMonthData.data.map((data) => data)}
                            type={salesMonthData.type}
                          />
                        </>
                      )
                    }
                  </CardComponent>
                  )
                }
              </Grid>
            </> 
          )}
          <Grid size={{ xs: 12, md: 5 }}>
            <CardComponent>
              <StyledH2 className='mb-1'>Maiores vendedores do mês</StyledH2>
              <AvatarList listData={mockListData} />
            </CardComponent>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <CardComponent>
              <StyledH2 className='mb-1'>Notícias relevantes</StyledH2>
              <CustomTable
                headers={mockTableData.headers}
                row={mockTableData.row}
              />
            </CardComponent>
          </Grid>
          <Grid size={{ xs: 12, md: 7}}>
            <CardComponent>
              <StyledH2 className='mb-1'>Valor de vendas por mês</StyledH2>
              <CustomChart
                labels={['January', 'February', 'March', 'April', 'May', 'June']}
                data={[65, 59, 80, 81, 56, 55]}
                type="bar"
              />
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home
