import { Tabs } from '@mantine/core'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  AboutContent,
  AnalyzesContent,
  ContactContent,
  CryoContent,
  ErrorContent,
  GradientText,
  InfusionsContent,
  MainContent,
  MassageContent,
  PlasmoliftingContent,
  SolariumContent,
  SuccessContent,
  FooterContent,
  DocumentsContent,
} from '../../components'
import { DocumentType, InfusionCatalogType, MainPageType } from '../../lib/types'
import css from './index.module.scss'

type AdminProps = {
  infusionCatalog: InfusionCatalogType
  setInfusionCatalog: React.Dispatch<React.SetStateAction<InfusionCatalogType>>
  main: MainPageType
  setMain: React.Dispatch<React.SetStateAction<MainPageType>>
  documents: DocumentType[]
  setDocuments: React.Dispatch<React.SetStateAction<DocumentType[]>>
}

const Admin: React.FC<AdminProps> = ({
  infusionCatalog,
  setInfusionCatalog,
  main,
  setMain,
  documents,
  setDocuments,
}) => {
  useEffect(() => {
    document.title = 'Панель редактирования'
  }, [])
  return (
    <>
      <Helmet>
        <title>Администратор</title>
        <meta name="description" content="Капельницы Клин Клиник" />
        <meta name="keywords" content="Капельницы, здоровье, красота, Клин Клиник" />
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
              <Tabs.Tab value="documents">Документы</Tabs.Tab>
              {/* <Tabs.Tab value="excursion">Видео-экскурсия</Tabs.Tab> */}
              <Tabs.Tab value="error">Страница об ошибке</Tabs.Tab>
              <Tabs.Tab value="success">Страница о записи</Tabs.Tab>
              <Tabs.Tab value="footer">Футер</Tabs.Tab>
            </Tabs.List>

            {/* <Tabs.Panel value="excursion">
              <ExcursionContent />
            </Tabs.Panel> */}
            <Tabs.Panel value="main">
              <MainContent data={main} setData={setMain} />
            </Tabs.Panel>
            <Tabs.Panel value="infusions">
              <InfusionsContent data={infusionCatalog} setData={setInfusionCatalog} />
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
            <Tabs.Panel value="about">
              <AboutContent />
            </Tabs.Panel>
            <Tabs.Panel value="contacts">
              <ContactContent />
            </Tabs.Panel>
            <Tabs.Panel value="documents">
              <DocumentsContent documents={documents} setDocuments={setDocuments} />
            </Tabs.Panel>
            <Tabs.Panel value="error">
              <ErrorContent />
            </Tabs.Panel>
            <Tabs.Panel value="success">
              <SuccessContent />
            </Tabs.Panel>
            <Tabs.Panel value="footer">
              <FooterContent />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Admin
