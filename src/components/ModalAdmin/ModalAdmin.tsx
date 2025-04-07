// components/SecretModal.tsx
import { Modal, PasswordInput, Button, Group } from '@mantine/core';
import { useState } from 'react';

type SecretModalProps = {
  opened: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const ModalAdmin = ({ opened, onClose, onSuccess }: SecretModalProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const checkPassword = () => {
    if (password === import.meta.env.VITE_SECRET_PASSWORD) {
      onSuccess();
      setPassword('');
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Введите пароль"
      centered
      withCloseButton
    >
      <PasswordInput
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        error={error}
        required
      />
      <Group mt="md">
        <Button onClick={checkPassword} color="blue">
          ОК
        </Button>
      </Group>
    </Modal>
  );
};

export default ModalAdmin
