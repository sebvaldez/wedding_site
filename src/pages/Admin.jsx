import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    margin: auto;
    margin-top: 50px;
`;

const Heading = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
`;

const InputGroup = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #007BFF;
        outline: none;
    }
`;

const LoginButton = styled.button`
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const isAuthenticated = mockApiCall(email, password);

    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  const mockApiCall = (email, password) => {
    if (email === 'seb@example.com' && password === 'admin') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <LoginContainer>
        <Heading>Admin Login</Heading>
        <form onSubmit={handleLogin}>
          <InputGroup>
            <Label>Email:</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          <LoginButton type="submit">Login</LoginButton>
        </form>
      </LoginContainer>
    </>
  );
};

export default Admin;
