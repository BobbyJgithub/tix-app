
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setError } from '../../redux/authSlice';
import { registerUser, loginUser } from '../../utils/auth';
import styles from './AuthModal.module.css';

function AuthModal({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = isLogin 
        ? loginUser(username, password)
        : registerUser(username, password);
      dispatch(setUser(user));
      onClose();
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default AuthModal;