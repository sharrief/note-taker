import { AlertProps } from '@/components/Alert';
import { useState } from 'react';

const useRegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [busy, setBusy] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);
  return {
    username,
    setUsername,
    password,
    setPassword,
    alert,
    setAlert,
    busy,
    setBusy,
    regSuccess,
    setRegSuccess,
  };
};

export default useRegistrationForm;
