import { useEffect } from 'react';
import withAuthModal from '../withAuthModal/withAuthModal';

const CheckAuth = ({ children, openAuthModal }) => {
  const logined = Boolean(localStorage.getItem('user'));

  useEffect(() => {
    if (!logined) {
      openAuthModal();
    }
  }, [logined, openAuthModal]);

  return logined ? children : null;
};

export const WrapCheckAuth= withAuthModal(CheckAuth);
