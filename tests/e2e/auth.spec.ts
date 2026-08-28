import { expect, test } from '@playwright/test'

test.describe('autenticacao', () => {
  test('impede acesso a area protegida sem autenticacao', async ({ page }) => {
    await page.goto('/home')
    await expect(page).toHaveURL('/')
    await expect(page.getByRole('heading', { name: 'Bem-vindo' })).toBeVisible()
  })

  test('faz login e direciona para o dashboard', async ({ page }) => {
    await page.route('**/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ jwt_token: 'eyJhbGciOiJub25lIn0.eyJleHAiOjQxMDI0NDQ4MDB9.' }),
      })
    })
    await page.route('**/sales/highlights', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { value: 1000, subtitle: 'Total' },
          { value: 2000, subtitle: 'success' },
          { value: 3, subtitle: 'este mês' },
        ]),
      })
    })
    await page.route('**/sales/month', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ labels: [], data: [], type: 'bar' }) })
    })
    await page.route('**/sales/year', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ labels: [], data: [], type: 'bar' }) })
    })
    await page.route('**/sales/stars', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) })
    })
    await page.route('**/news', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify([]) })
    })

    await page.goto('/')
    await page.getByPlaceholder('E-mail').fill('ana@example.com')
    await page.getByPlaceholder('Senha').fill('Strong@123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page).toHaveURL('/home')
    await expect(page.getByRole('link', { name: /Leads contactados/i })).toBeVisible()
  })

  test('completa o cadastro em duas etapas', async ({ page }) => {
    await page.route('**/profile/create', async (route) => {
      await route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ id: 1 }) })
    })

    await page.goto('/cadastro')
    await page.getByPlaceholder('Nome').fill('Ana Silva')
    await page.getByPlaceholder('Email').fill('ana@example.com')
    await page.getByPlaceholder('Telefone').fill('11999999999')
    await page.getByRole('button', { name: 'Próximo' }).click()

    await expect(page.getByRole('heading', { name: 'Defina sua senha' })).toBeVisible()
    await page.getByPlaceholder('Senha').fill('Strong@123')
    await page.getByRole('button', { name: 'Enviar' }).click()

    await expect(page).toHaveURL('/')
    await expect(page.getByText('Usuário criado com sucesso.')).toBeVisible()
  })
})