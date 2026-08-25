import { Link } from 'react-router-dom'

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
  const { data: salesYearsData, loading: salesYearsLoading, error: salesYearsError } = useGet<CustomChartProps>('sales/year')
  const { data: salesStarsData, loading: salesStarsLoading, error: salesStarsError } = useGet<StarsData[]>('sales/stars')
  const { data: newsData, loading: newsLoading, error: newsError } = useGet<NewsData[]>('news')

  return (
    <>
      <Header />
      <Container maxWidth="lg" className='mb-2'>
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
                      <Link to="/leads">
                        <StyledH2 className='mb-1'>Leads contactados</StyledH2>
                        <StyledH3 className='mb-1' size={40} lineheight={40}>{highlightsData[2].value}</StyledH3>
                        <StyledSpan>{highlightsData[2].subtitle}</StyledSpan>
                      </Link>
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
            {
              !salesStarsError && (
              <CardComponent className={salesStarsLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''}>
                {
                  !salesStarsLoading && salesStarsData && (
                    <>
                      <StyledH2 className='mb-1'>Maiores vendedores do mês</StyledH2>
                      <AvatarList 
                        listData={salesStarsData.map((star) => ({
                          avatar: '/dnc-avatar.svg',
                          name: star.name,
                          subtitle: toBRL(star.value),
                        }))} 
                      />
                    </>
                  )
                }
              </CardComponent>
              )
            }
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            {
              !newsError && (
              <CardComponent className={newsLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''}>
                {
                  !newsLoading && newsData && (
                    <>
                      <StyledH2 className='mb-1'>Notícias relevantes</StyledH2>
                      <CustomTable
                          headers={['Título', 'Horário']}
                          row={newsData.map((news) => [
                            <a className='ellipsis ellipsis-sm' href={news.link} target='_blank'>{news.title}</a>,
                            <a href={news.link} target='_blank'>{news.date}</a>,
                          ])}
                      />
                    </>
                  )
                }
              </CardComponent>
              )
            }
          </Grid>
          <Grid size={{ xs: 12, md: 7}}>
            {
              !salesYearsError && (
              <CardComponent className={salesYearsLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''}>
                {
                  !salesYearsLoading && salesYearsData && (
                    <>
                      <StyledH2 className='mb-1'>Valor de vendas por mês</StyledH2>
                      <CustomChart
                        labels={salesYearsData.labels.map((label) => label)}
                        data={salesYearsData.data.map((data) => data)}
                        type={salesYearsData.type}
                      />
                    </>
                  )
                }
              </CardComponent>
              )
            }
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home
