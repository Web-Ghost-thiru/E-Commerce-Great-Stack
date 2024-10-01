import React, { useState, useContext, useRef, useEffect } from 'react';
import './LoginSignUp.css';
import { ShopContext } from '../../Context/ShopContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignUp = ({ closeModal }) => {
  const { signUpUser, setUser } = useContext(ShopContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const modalContentRef = useRef(null);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSignUp = () => {
    if (name && email && password && agreeToTerms) {
      const newUser = { name, email, password };
      signUpUser(newUser);
      closeModal();
    } else {
      toast.warning('Please fill in all fields and agree to the terms!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      if (existingUser.password === password) {
        localStorage.setItem('user', JSON.stringify(existingUser));
        setUser(existingUser);
        toast.success('Login Successful!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        closeModal();
      } else {
        toast.error('Incorrect password!', {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast.error('User does not exist!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        closeModal();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="auth-modal">
      <div className="auth-modal-content" ref={modalContentRef}>
        <button className="close-button" onClick={closeModal}>X</button>
        {isLogin ? (
          <div className="login-container">
            <h1>Login</h1>
            <div className="login-fields">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleLogin}>Login</button>
            <p className="switch-auth">
              Don't have an account?{' '}
              <span className='toggle' onClick={toggleAuthMode}>Sign Up</span>
            </p>
          </div>
        ) : (
          <div className="signup-container">
            <h1>Sign Up</h1>
            <div className="signup-fields">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="signup-agree">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
              />
              <p>I agree to the terms of use & privacy policy</p>
            </div>
            <button onClick={handleSignUp}>Sign Up</button>
            <p className="switch-auth">
              Already have an account?{' '}
              <span className='toggle' onClick={toggleAuthMode}>Login</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
