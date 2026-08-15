import {
  AvatarList,
  CardComponent,
  CustomChart,
  CustomTable,
  Header,
} from '@/components'
import { Container } from '@mui/material'
import { toBRL } from '@/utils'

function Home() {
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
        <CardComponent>
          <h1>Card Component</h1>
        </CardComponent>
        <CardComponent>
          <AvatarList listData={mockListData} />
        </CardComponent>
        <CardComponent>
          <CustomTable
            headers={mockTableData.headers}
            row={mockTableData.row}
          />
        </CardComponent>
        <CardComponent>
          <CustomChart
            labels={['January', 'February', 'March', 'April', 'May', 'June']}
            data={[65, 59, 80, 81, 56, 55]}
            type="line"
          />
        </CardComponent>
      </Container>
    </>
  )
}

export default Home
