import React, { Component, useEffect } from 'react';
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import './App.css';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Text, Progress, FlexboxGrid, Input, InputGroup, Button } from 'rsuite';

export default function NewsItem(props) {
  let { apiTitle, excerpt, media, published_date, url, publisher, result } = props;

  const navigate = useNavigate();

  async function handleSubmit() {
    const data = { URL: url };
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
          url: url
        }
      });
    } catch (error) {
      console.error(error);
    }
    console.log(url);
  }

  return (
    <div
      style={{
        flex: '30%',
        margin: '0.2em',
        padding: '1em',
        minWidth: '219px'
      }}>
      <div>
        <div className="card col-md-12">
          <img style={{height: "200px"}}src={media} className="card-img-top" alt="..." />
          <div className="card-body" style={{ border: '3px solid #7E7D89', marginTop: '3px' }}>
            <h5 className="card-title">{apiTitle}</h5>
            <p className="card-text">
              {excerpt == null ? '' : excerpt.length < 200 ? excerpt : excerpt.slice(0, 200)}
            </p>
            <h6 className="card-text">
            </h6>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">
              Read More
            </a>
            <span
              className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
              style={{ right: '-50px' }}>
              {publisher}
              <span className="visually-hidden">unread messages</span>
            </span>
          </div>
          {result == "ok" ? <></> : <><Text weight="semibold" style={{ textAlign: 'center' }}>
            Is This News Real/Fake ?
          </Text>
          <FlexboxGrid justify="center">
          <Button color="green" appearance="primary" onClick={()=>handleSubmit()}>
            Check
          </Button>
          </FlexboxGrid>
          </>}
          
        </div>

        {/* {console.log(this.month)} */}
      </div>
    </div>
  );
}
