import React, { useState } from 'react';
import LoginSignUp from '../LoginSignUp/LoginSignUp';

const withAuthModal = (WrappedComponent) => {
  return (props)=> {
    const [showAuthModal, setShowAuthModal] = useState(false);

    const openAuthModal = () => setShowAuthModal(true);
    const closeAuthModal = () => setShowAuthModal(false);

    return (
      <>
        <WrappedComponent openAuthModal={openAuthModal}  {...props} />
        {showAuthModal && <LoginSignUp closeModal={closeAuthModal} />}
      </>
    );
  };
};

export default withAuthModal;