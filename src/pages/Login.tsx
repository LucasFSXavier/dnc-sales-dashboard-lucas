import { Box, Container, Grid } from '@mui/material'
import {
  BannerImage,
  FormComponent,
  StyledH1,
  StyledP,
  Logo,
} from '@/components'
import { pxToRem } from '@/utils'

function Login() {
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
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <Logo height={41} width={100} />
              </Box>
              <Box sx={{ marginBottom: pxToRem(24) }}>
                <StyledH1>Bem-vindo</StyledH1>
                <StyledP>Entre com suas credenciais</StyledP>
              </Box>
              <FormComponent
                inputs={[
                  { placeholder: 'Email', type: 'email' },
                  { placeholder: 'Password', type: 'password' },
                ]}
                buttons={[
                  { children: 'Login', type: 'submit', className: 'primary' },
                ]}
                message={{ type: 'error', msg: 'Credenciais inválidas' }}
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

export default Login
