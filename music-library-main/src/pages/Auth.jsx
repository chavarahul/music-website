import React, { useContext } from 'react';
import AuthForm from '../components/auth/AuthForm';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Auth = () => {
  const {token} = useContext(AuthContext);
  if(token){
    return <Navigate to={"/"} replace/>
  }
  return (
      <AuthForm />
  );
}

export default Auth;