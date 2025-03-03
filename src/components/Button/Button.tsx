import { Modal } from '@mantine/core';
import { TextInput, Textarea } from '@mantine/core';
import { useField } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import clsx from 'clsx';
import { useState, useMemo } from 'react';
import { formInputs } from '../../lib/data';
import CheckPolicy from '../CheckPolicy/CheckPolicy';
import css from './index.module.scss';

type ButtonProps = {
  text?: string;
  size?: 'big' | 'small';
  isDisabled?: boolean;
  onClick?: () => void;
  form?: boolean;
};

const Button: React.FC<ButtonProps> = ({ 
  text = 'Записаться', 
  size = 'big', 
  isDisabled = false, 
  onClick,
  form = true,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const name = useField({
    initialValue: '',
    validate: (value) => {
      if (value.trim().length < 2 && value.trim().length !== 0) {
        return 'Имя слишком короткое';
      }
      return null;
    },
  });

  const phone = useField({
    initialValue: '+7',
    validate: (value) => {
      const cleaned = value.replace(/\D/g, '');
      const isValidFormat = /^(\+79|89)\d{9}$/.test(value.trim());
      const isCorrectLength = cleaned.length === 11;

      if ((!isValidFormat || !isCorrectLength) && value.trim() !== '+7' && value.trim().length !== 0) {
        return 'Неправильный номер телефона';
      }
      return null;
    },
  });

  const question = useField({
    initialValue: '',
    validate: (value) => (value.trim().length < 2 && value.trim().length !== 0 ? 'Слишком короткое значение' : null),
  });

  const [checked, setChecked] = useState(false);

  const disabled = useMemo(() => {
    return !checked || !!name.error || !!phone.error || !name.getValue().trim() || !phone.getValue().trim();
  }, [checked, name.error, phone.error, name.getValue(), phone.getValue()]);

  // Сброс значений полей при закрытии модальной формы
  const resetFields = () => {
    name.setValue('');
    phone.setValue('+7');
    question.setValue('');
    setChecked(false);
  };

  return (
    <>
      <button 
        disabled={isDisabled} 
        className={size === 'big' ? css.bigButton : css.smallButton} 
        onClick={form ? open : onClick} // Вызываем переданную функцию при клике
      >
        {text}
      </button>

      <Modal opened={opened} onClose={() => { close(); resetFields(); }} centered radius='md' withCloseButton={false}>
        <div className={css.form}>
          <h2 className='blue'>Записаться бесплатно</h2>
          <p>Перезвоним и ответим на все вопросы</p>
          <div className={css.margin}></div>
          <div className={css.inputs}>
            <TextInput
              classNames={{ label: clsx(css.label) }}
              className={css.input}
              {...name.getInputProps()}
              onBlur={() => name.validate()}
              radius="md"
              label={formInputs[0].label}
              placeholder={formInputs[0].placeholder}
            />
            <TextInput
              classNames={{ label: clsx(css.label) }}
              className={css.input}
              {...phone.getInputProps()}
              onBlur={() => phone.validate()}
              radius="md"
              label={formInputs[1].label}
              placeholder={formInputs[1].placeholder}
            />
            <Textarea
              classNames={{ label: clsx(css.label) }}
              {...question.getInputProps()}
              className={css.input}
              radius="md"
              placeholder={formInputs[2].placeholder}
              label={formInputs[2].label}
              autosize
              minRows={2}
              maxRows={2}
            />
            
            <div className={css.margin}></div>
            <CheckPolicy {...{ checked, setChecked }} />
            <div className={css.margin}></div>
            <Button size="small" isDisabled={disabled} form={false} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Button;
