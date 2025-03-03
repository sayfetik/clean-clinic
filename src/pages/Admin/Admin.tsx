import { Tabs } from '@mantine/core';
import { useEffect, useState } from 'react';
import { GradientText, MediaEditor, Button } from '../../components'
import css from './index.module.scss'

const Admin = () => {
  const [excurions, setExcursion] = useState<string>("");

  useEffect(() => {
    fetch("https://api.example.com/media")
      .then((response) => response.json())
      .then((data) => {
        setExcursion(data.mediaUrl);
      })
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  const handleFileChange = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch("https://api.example.com/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setExcursion(data.newMediaUrl); // Обновляем URL после загрузки
      })
      .catch((error) => console.error("Ошибка загрузки файла:", error));
  };

  const sendToBackExcursion = () => {

  }

return (
  <div>
    <GradientText text="Администратор" />
    <div className={css.root}>
        <Tabs defaultValue="excursion" orientation="vertical">
        <Tabs.List>
            <Tabs.Tab value="excursion">Видео-экскурсия</Tabs.Tab>
            <Tabs.Tab value="main">Главная</Tabs.Tab>
            <Tabs.Tab value="infusions">Капельницы</Tabs.Tab>
            <Tabs.Tab value="infusion">Описание капельницы</Tabs.Tab>
            <Tabs.Tab value="about">О клинике</Tabs.Tab>
            <Tabs.Tab value="contacts">Контакты</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="excursion">
          <div className={css.tabContent}>
            <MediaEditor initialSrc={excurions} onFileChange={handleFileChange}/>
            <Button text='Применить' size='small' onClick={sendToBackExcursion}/>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="main">
          <div className={css.tabContent}>
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="infusions">Settings tab content</Tabs.Panel>
        <Tabs.Panel value="infusion">Settings tab content</Tabs.Panel>
        <Tabs.Panel value="about">Settings tab content</Tabs.Panel>
        <Tabs.Panel value="contacts">Settings tab content</Tabs.Panel>
        </Tabs>
    </div>
  </div>
)
}

export default Admin
