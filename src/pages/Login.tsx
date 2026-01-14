import slyled from 'styled-components'

const LoginArea = slyled.div`
    background: #666;
`

const LoginImage = slyled.div`
    background-image: url(/image-login.svg);
    background-size: cover;
    height: 100vh;
    width: 50vh;
`

function Login() {
  return (
    <>
      <LoginArea>LOGIN</LoginArea>
      <LoginImage />
    </>
  )
}

export default Login
