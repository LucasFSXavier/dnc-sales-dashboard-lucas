import { useContext, useEffect, useState, type ChangeEvent } from 'react'
import { AppThemeContext } from '@/context/AppThemeContext.tsx'
import Cookies from 'js-cookie'

// COMPONENTS
import { CardComponent, FormComponent, Header, StyledButton, StyledH2 } from '@/components'
import { Container, Grid } from '@mui/material'

// HOOK
import { useFormValidation, useGet, usePut, useDelete } from '@/hooks'

// SERVICES
import { logout } from '@/services';

// TYPES
import type { InputProps, ProfileData, ProfileEditableData, MessageProps } from '@/types'

function Profile() {
  const themeContext = useContext(AppThemeContext)

  // HOOOKS
  const [updateMessage, setUpdateMessage] = useState<MessageProps>({ msg: '', type: 'success' })
  const clearMessage = () => {
    setTimeout(() => {
      setUpdateMessage({ msg: '', type: 'success' })
    }, 3000)
  }
  const { data: profileData, loading: profileLoading, error: profileError } = useGet<ProfileData>('profile')
  const { data: profileUpdateData, putData: profilePutData, loading: profileUpdateLoading, error: profileUpdateError } = usePut<ProfileEditableData>('profile/update')
  const { deleteData: profileDeleteData, loading: profileDeleteLoading } = useDelete('profile/delete')

  useEffect(() => {
    if (profileData) {
      handleChange(0, profileData.name)
      handleChange(1, profileData.email)
      handleChange(2, profileData.phone)
    }
  }, [profileData])

  // FORM
  const inputs: InputProps[] = [
    { name: 'name', type: 'text', placeholder: 'Nome', required: true }, 
    { name: 'email', type: 'email', placeholder: 'Email', disabled: true },
    { name: 'phone', type: 'tel', placeholder: 'Telefone', required: true },
  ]
  const { formValues, formValid, handleChange } = useFormValidation(inputs)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await profilePutData(
      {
        name: String(formValues[0]),
        phone: String(formValues[2])
      }
    )
  }
  const handleDelete = async () => {
    if (confirm('Tem certeza que deseja excluir sua conta? Serão excluidos todos os leads associados a ela!')) {
      try {
        await profileDeleteData()
        alert('Perfil deletado com sucesso!')
        Cookies.remove('Authorization')
        window.location.href = '/'
      } catch (e) {
          alert('Erro ao deletar perfil. Entre em contato com nosso suporte.')
        }
    }
  }

  useEffect(() => {
    if (profileUpdateData !== null) {
      setUpdateMessage({
        msg: 'Perfil Atualizado com sucesso',
        type: 'success'
      })
    } else if (profileUpdateError) {
      setUpdateMessage({
        msg: 'Erro ao atualizar perfil',
        type: 'error'
      })
    } clearMessage()
  }, [profileUpdateData, profileUpdateError])

  return (
    <>
      <Header />
      <Container className='mb-2' maxWidth='lg'>
        <Grid container spacing={4}>
          <Grid size={{xs: 12, md: 6}}>
            {
              !profileError && (
                <CardComponent className={profileLoading ? 'skeleton-loading skeleton-loading-mh-2' : ''}>
                  {
                    !profileLoading && profileData && (
                      <>
                        <StyledH2 className='mb-1'>Seus Dados</StyledH2>
                        <FormComponent
                          inputs={inputs.map((input, index) => ({
                            ...input,
                            type: input.type,
                            placeholder: input.placeholder,
                            value: formValues[index] || '',
                            onChange: (e: ChangeEvent<HTMLInputElement>) =>
                              handleChange(index, (e.target as HTMLInputElement).value),
                          }))}
                          buttons={[
                            {
                              className: 'primary',
                              disabled: !formValid || profileUpdateLoading,
                              type: 'submit',
                              onClick: handleSubmit,
                              children: profileUpdateLoading ? 'Aguarde ...' : 'Atualizar meu perfil',
                            },
                            {
                              className: 'alert',
                              disabled: profileDeleteLoading,
                              type: 'button',
                              onClick: handleDelete,
                              children: profileDeleteLoading ? 'Aguarde ...' : 'Excluir minha conta',
                            },
                          ]}
                          message={updateMessage}
                        />
                      </>
                  )
                }
                </CardComponent>
              )
            }
          </Grid>
          <Grid size={{xs: 12, md: 6}}>
            <CardComponent>
              <StyledH2 className='mb-1'>Definições de Conta</StyledH2>
              <StyledButton className="primary mb-1" onClick={themeContext?.toggleTheme}>
                Trocar para tema{' '}
                {themeContext?.appTheme === 'light' ? 'escuro' : 'claro'}
              </StyledButton>
              <StyledButton className='alert' onClick={logout}>
                Logout
              </StyledButton>
            </CardComponent>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Profile
