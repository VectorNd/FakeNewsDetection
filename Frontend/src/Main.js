import React, { Component } from 'react';
import News from './News';
import Navbar from './Navbar';
import './App.css';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Text, Progress, FlexboxGrid, Input, InputGroup, Button } from 'rsuite';
import SendIcon from '@rsuite/icons/Send';

const styles = {
  width: 300,
  marginBottom: 10
};

export default function Main(props) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVal(e);
  };

  async function handleSubmit() {
    const data = { URL: val };
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      const fetchResponse = await fetch('http://127.0.0.1:5000/', params);
      const data = await fetchResponse.json();
      console.log(data);
      navigate('/result', {
        state: {
          data: data,
          url: val
        }
      });
    } catch (error) {
      console.error(error);
    }
    console.log(val);
  }
  const [val, setVal] = React.useState('');

  return (
    <>
      <div className="w-full">
        <h1 className="text-3xl text-center font-bold mb-8" style={{color: "#ffffff"}}>Check if news is real or fake!</h1>

        <FlexboxGrid justify="center">
          <InputGroup style={styles}>
            <Input value={val} onChange={handleChange} />
            <InputGroup.Button onClick={handleSubmit}>
              <SendIcon />
            </InputGroup.Button>
          </InputGroup>
        </FlexboxGrid>
        <News key={props.genre} genre={props.genre} />
      </div>
    </>
  );
}
