import { Tabs } from '@mantine/core'
import { AboutContent, ContactContent, ErrorContent, ExcursionContent, GradientText, InfusionsContent, MainContent, SuccessContent } from '../../components'
import css from './index.module.scss'

const Admin = () => {
  return (
    <div className={css.page}>
      <GradientText text="Панель редактирования" />
      <div className={css.root}>
        <Tabs defaultValue="infusions">
          <Tabs.List>
            <Tabs.Tab value="excursion">Видео-экскурсия</Tabs.Tab>
            <Tabs.Tab value="main">Главная</Tabs.Tab>
            <Tabs.Tab value="infusions">Капельницы</Tabs.Tab>
            <Tabs.Tab value="about">О клинике</Tabs.Tab>
            <Tabs.Tab value="contacts">Контакты</Tabs.Tab>
            <Tabs.Tab value="error">Страница об ошибке</Tabs.Tab>
            <Tabs.Tab value="success">Страница о записи</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="excursion">
            <ExcursionContent />
          </Tabs.Panel>
          <Tabs.Panel value="main">
            <MainContent />
          </Tabs.Panel>
          <Tabs.Panel value="infusions">
            <InfusionsContent />
          </Tabs.Panel>
          <Tabs.Panel value="about"><AboutContent /></Tabs.Panel>
          <Tabs.Panel value="contacts"><ContactContent/></Tabs.Panel>
          <Tabs.Panel value="error"><ErrorContent /></Tabs.Panel>
          <Tabs.Panel value="success"><SuccessContent /></Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin
