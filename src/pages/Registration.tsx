import slyled from 'styled-components'

const RegistrationArea = slyled.div`
    background: #666;
`

const RegistrationImage = slyled.div`
    background-image: url(/image-login.svg);
    background-size: cover;
    height: 100vh;
    width: 50vh;
`

function Registration() {
  return (
    <>
      <RegistrationArea>Registration</RegistrationArea>
      <RegistrationImage />
    </>
  )
}

export default Registration
