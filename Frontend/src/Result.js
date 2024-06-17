import React, { Component } from 'react';
import './App.css';
import { useNavigate, useLocation, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Message, Text, Progress, FlexboxGrid, Input, InputGroup, Button } from 'rsuite';
import NewsItem from './NewsItem';
import { IconButton, ButtonToolbar } from 'rsuite';
import WarningRoundIcon from '@rsuite/icons/WarningRound';

const style2 = {
  width: 120,
  display: 'inline-block',
  marginRight: 10
};

export default function Result(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [msg, setMsg] = React.useState(false);
  console.log(state.url)

  async function submitFeedback(feedback) {
    const data = { feedback, URL: state.url };
    const params = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    try {
      const fetchResponse = await fetch('http://127.0.0.1:5000/feedback', params);
      const data = await fetchResponse.json();
      setMsg(true);
      console.log(data);
      // navigate('/');
    } catch (error) {
      // Alert.error('Your FeedBack is not submitted.')
      console.error(error, "hi");
    }
  }

  return (
    <>
      <div className="w-full">
        <FlexboxGrid justify="center" style={{ margin: '20px' }}>
          <Text weight="semibold" style={{color: "#ffffff"}}>{state.data.result.toUpperCase()}</Text>
        </FlexboxGrid>
        <FlexboxGrid justify="center">
          <div style={style2}>
            {parseInt(Number(state.data.real_prob * 100), 10) >= '50' ? (
              <Progress.Circle
                percent={parseInt(state.data.real_prob * 100, 10)}
                strokeColor="#4caf50"
              />
            ) : (
              <Progress.Circle
                percent={parseInt(Number(state.data.real_prob * 100), 10)}
                strokeColor="#f44336"
              />
            )}
          </div>
        </FlexboxGrid>
        <FlexboxGrid justify="center" style={{ margin: '20px' }}>
          <Text weight="semibold" style={{color: "#ffffff"}}>Give us some feedback if we predicted it wrong :)</Text>
        </FlexboxGrid>
        <FlexboxGrid justify="center">
          <Button color="green" appearance="primary" onClick={()=>submitFeedback('real')}>
            Real
          </Button>
          <Button color="red" appearance="primary" onClick={()=>submitFeedback('fake')}>
            Fake
          </Button>
        </FlexboxGrid>
        {msg ? <Message>
      <strong>Success!</strong> Thank You For Your FeedBack.<IconButton circle icon={<WarningRoundIcon />} appearance="default" onClick={()=>setMsg(false)} />
    </Message> : <></>}
        <NewsItem
            apiTitle={state.data.title}
            excerpt={state.data.content}
            media={
              state.data.image
                ? state.data.image
                : 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg'
            }
            published_date={state.data.date}
            url={state.data.url}
            result={"ok"}
          />
      </div>
    </>
  );
}
