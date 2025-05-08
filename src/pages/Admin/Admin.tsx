import { Tabs } from '@mantine/core'
import { Helmet } from 'react-helmet-async'
import {
  AboutContent,
  AnalyzesContent,
  ContactContent,
  CryoContent,
  ErrorContent,
  ExcursionContent,
  GradientText,
  HomeVisitContent,
  InfusionsContent,
  MainContent,
  MassageContent,
  PlasmoliftingContent,
  SolariumContent,
  SuccessContent,
} from '../../components'
import css from './index.module.scss'

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Администратор</title>
        <meta name="description" content="Капельницы Clean Clinic" />
        <meta name="keywords" content="Капельницы, здоровье, красота, Clean Clinic" />
      </Helmet>
      <div className={css.page}>
        <GradientText text="Панель редактирования" />
        <div className={css.root}>
          <Tabs defaultValue="main">
            <Tabs.List>
              <Tabs.Tab value="main">Главная</Tabs.Tab>
              <Tabs.Tab value="infusions">Капельницы</Tabs.Tab>
              <Tabs.Tab value="cryo">Криотерапия</Tabs.Tab>
              <Tabs.Tab value="solarium">Солярий</Tabs.Tab>
              <Tabs.Tab value="plasmolifting">Плазмолифтинг</Tabs.Tab>
              <Tabs.Tab value="massage">Массаж</Tabs.Tab>
              <Tabs.Tab value="analyzes">Анализы</Tabs.Tab>
              <Tabs.Tab value="homeVisit">Выезд на дом</Tabs.Tab>
              <Tabs.Tab value="about">О клинике</Tabs.Tab>
              <Tabs.Tab value="contacts">Контакты</Tabs.Tab>
              <Tabs.Tab value="excursion">Видео-экскурсия</Tabs.Tab>
              <Tabs.Tab value="error">Страница об ошибке</Tabs.Tab>
              <Tabs.Tab value="success">Страница о записи</Tabs.Tab>
            </Tabs.List>

            {/* <Tabs.Panel value="excursion"> */}
            {/* <ExcursionContent /> */}
            {/* </Tabs.Panel> */}
            <Tabs.Panel value="main">
              <MainContent />
            </Tabs.Panel>
            <Tabs.Panel value="infusions">
              <InfusionsContent />
            </Tabs.Panel>
            <Tabs.Panel value="cryo">
              <CryoContent />
            </Tabs.Panel>
            <Tabs.Panel value="solarium">
              <SolariumContent />
            </Tabs.Panel>
            <Tabs.Panel value="massage">
              <MassageContent />
            </Tabs.Panel>
            <Tabs.Panel value="plasmolifting">
              <PlasmoliftingContent />
            </Tabs.Panel>
            <Tabs.Panel value="analyzes">
              <AnalyzesContent />
            </Tabs.Panel>
            <Tabs.Panel value="homeVisit">
              <HomeVisitContent />
            </Tabs.Panel>
            {/* <Tabs.Panel value="about">
              <AboutContent />
            </Tabs.Panel> */}
            <Tabs.Panel value="contacts">
              <ContactContent />
            </Tabs.Panel>
            <Tabs.Panel value="error">
              <ErrorContent />
            </Tabs.Panel>
            <Tabs.Panel value="success">
              <SuccessContent />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Admin
