import React, { Component } from 'react';
import NewsItem from './NewsItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      article: [],
      pageNo: 1,
      total_pages: 1,
      concat: 'no',
      loading: true
    };
  }
  time = new Date();
  year = this.time.getFullYear();
  month = this.time.getMonth() + 1;
  date = this.time.getDate() - 1;
  apiDate = `${this.year}-${this.month}-${this.date}`;
  apiDatePrev = `${this.year}-${this.month}-${this.date - 1}`;
  apiFetch = (pageNo, concat) => {
    // console.log(this.state.pageNo);
    let params = {
      method: 'GET',
      headers: {
        'X-Rapidapi-Key': '6232aa4bf3msh95d02defe99bdf9p19b94djsn363e7c738278',
        'X-Rapidapi-Host': 'newscatcher.p.rapidapi.com',
        Host: 'newscatcher.p.rapidapi.com'
      }
      // body: `"q":"${this.props.genre}"+india","lang":"en","sort_by":"date","page":"${pageNo.toString()}","page_size":"9"
      // https://api.newscatcherapi.com/v1/search_free?q=${this.props.genre}&lang=en&sort_by=relevancy&countries=in&from=${this.apiDatePrev}&to=${this.apiDate}&page=${pageNo.toString()}&page_size=9`
    };
    fetch(
      `https://newsdata.io/api/1/latest?apikey=pub_464098b016547fa68e21449555d8173f9a014&q=${this.props.genre}&language=en`,
      params
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (concat === 'yes') {
          this.setState({
            article: this.state.article.concat(data.results)
            // total_pages: data.total_pages,
          });
        } else {
          this.setState({
            article: data.results
            // total_pages: data.total_pages,
          });
        }
        // console.log(this.state.total_pages);
        // this.setState({ loading: false });
      });
  };
  componentDidMount = () => {
    this.setState({ loading: true });
    this.setState({ concat: 'yes' });
    this.apiFetch(this.state.pageNo, this.state.concat);
    this.setState({ pageNo: this.state.pageNo + 1 });
  };

  nextPage = () => {
    this.setState({ loading: true });
    // console.log(this.state.total_pages<this.state.pageNo*9);
    // console.log(this.state.pageNo < this.state.total_pages);
    if (this.state.pageNo >= this.state.total_pages) {
      this.setState({ loading: false });
    }
    if (this.state.pageNo <= this.state.total_pages) {
      this.setState({ pageNo: this.state.pageNo + 1 });
      this.setState({ concat: 'yes' });
      this.apiFetch(this.state.pageNo, this.state.concat);
      // console.log(this.state.pageNo);
    }
  };

  styleSpinner = { display: 'block', margin: '0 auto', borderColor: 'red' };
  render() {
    let items = [];
    {
      this.state.article.forEach((e, x) => {
        // console.log(typeof(e.description))
        items.push(
          <NewsItem
            key={x}
            apiTitle={e.title}
            excerpt={e.description}
            //   e.excerpt[e.excerpt.length - 14] === "["
            //     ? e.excerpt.slice(0, -14)
            //     : e.excerpt.slice(0, -13)
            // }
            media={
              e.image_url
                ? e.image_url
                : 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg'
            }
            published_date={e.pubDate}
            url={e.link}
            publisher={
              e.source_id.slice(0, -3)[e.source_id.slice(0, -3).length - 1] === '.'
                ? e.source_id.slice(0, -4)
                : e.source_id.slice(0, -3)
            }
          />
        );
        // console.log(e.rights.slice(0,-3)[e.rights.slice(0,-3).length-1]==="."?e.rights.slice(0,-4):e.rights.slice(0,-3));
      });
    }
    return (
      <div>
        <h1
          className="title text-center"
          style={{
            paddingTop: '5rem',
            fontFamily: 'serif',
            background: '-webkit-linear-gradient(45deg,rgb(0,110,225), rgb(255,31,1))',
            webkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2rem'
          }}>
          {' '}
          Top News : {this.props.genre.toUpperCase()}
        </h1>
        <>
          <InfiniteScroll
            dataLength={items.length}
            next={this.nextPage}
            hasMore={this.state.article.length !== this.state.total_pages}
            loader={
              <div style={{ width: '90%', overflow: 'hidden' }}>
                <ClipLoader
                  color={'white'}
                  loading={this.state.loading}
                  cssOverride={this.styleSpinner}
                  size={80}
                />
              </div>
            }
            endMessage={
              <div style={{ width: '90%', overflow: 'hidden' }}>
                <ClipLoader
                  color={'white'}
                  loading={this.state.loading}
                  cssOverride={this.styleSpinner}
                  size={50}
                />
              </div>
            }>
            {/* {items} */}
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>{items}</div>
          </InfiniteScroll>
        </>
      </div>
    );
  }
}
