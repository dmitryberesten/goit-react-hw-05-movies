import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  margin-right: 15px;
  font-size: 16px;
`;

export const Button = styled.button`
  background-color: #b5d1f2;
  border: 1px solid #0d57aa;
  border-radius: 4px;
  padding: 8px 18px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: #0d57aa;
    color: #ffffff;
  }
`;
