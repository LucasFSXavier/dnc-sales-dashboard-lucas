import { Box, Container, Grid } from '@mui/material'
import { BannerImage, FormComponent } from '@/components'

function Registration() {
  return (
    <>
      <Box>
        <Grid container>
          <Grid
            size={{ xs: 12, sm: 6 }}
            sx={{
              alignItems: 'center',
              display: 'flex',
              minHeight: '100vh',
            }}
          >
            <Container maxWidth="sm">
              <h1>Cadastro</h1>
              <FormComponent
                inputs={[
                  { placeholder: 'Email', type: 'email' },
                  { placeholder: 'Password', type: 'password' }
                ]}
                buttons={[
                  { children: 'Login', type: 'submit', className: 'primary' }
                ]}
                message={{ type: 'error', msg: 'Sucesso credentials' }}
              />
            </Container>
          </Grid>
          <Grid size={{ sm: 6 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <BannerImage />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Registration
