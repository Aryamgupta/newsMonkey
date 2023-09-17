import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spiiner from './Spiiner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        category: 'science',
        country: 'in',
        pageSize: 25,
        totalResults : 0,
        hasEnd : true,
    }

    articles = [];
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
        document.title = `NewsMonkey - ${this.props.category}`;
    }

    setbackColor(color) {
        let colorvar = "";
        let bodyColor = "pink";
        switch (color) {
            case 'general':
                colorvar = 'primary';
                bodyColor = 'rgb(178 188 207)';
                break;
            case 'science':
                colorvar = 'secondary';
                bodyColor = '#858687';
                break;
            case 'entertainment':
                bodyColor = '#279762';
                colorvar = 'success';
                break;
            case 'business':
                colorvar = 'dark';
                bodyColor = '#727477';
                break;
            case 'health':
                colorvar = 'warning';
                bodyColor = '#c5a33c';
                break;
            case 'sports':
                colorvar = 'info';
                bodyColor = '#73a5ad';
                break;
            case 'technology':
                colorvar = 'danger';
                bodyColor = '#dd6772';
                break;
            default:
                colorvar = 'white';
                bodyColor = 'white';
                break;
        }
    
        document.body.style.backgroundColor = bodyColor;
        return colorvar;
    }
    async updatePanel() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        this.setbackColor("defa");
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
            colorvar: this.setbackColor(this.props.category)
        });
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.updatePanel();
    }

    handleOnPrev = async () => {
        this.setState({
            page: this.state.page - 1
        });

        this.updatePanel();
    }
    handleOnNext = async () => {
        this.setState({
            page: this.state.page + 1,

        });
        this.updatePanel();
    }

    captalise(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({page : this.state.page+1});
        // this.setState({ loading: true });
        // this.setbackColor("defa");
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            hasEnd : parsedData.articles.length === 0,
            articleslen : parsedData.articles.length,
            colorvar: this.setbackColor(this.props.category)
        });
      };

    render(props) {

        return (
            <>
                <h2 className='mt-3 mb-3 text-center'>NewsMonkey - Top {this.captalise(this.props.category)} Headlines</h2>
                {/* {this.state.loading && <Spiiner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={!this.state.hasEnd}
                    loader={<Spiiner />}
                > 
                <div className='container'>
                <div className="row">
                    {this.state.articles.map((ele) => {
                        return <div className="col-md-4" key={ele.url}>
                            <NewsItem title={ele.title ? ele.title.slice(0, 50) : ""} des={ele.description ? ele.description.slice(0, 100) : ""} imgUrl={ele.urlToImage} newsUrl={ele.url} time={ele.publishedAt.slice(0, 10)} author={ele.author} namee={ele.source.name} colorvar={this.state.colorvar} />
                        </div>
                    })}
                </div>
                </div>
                </InfiniteScroll>
                {/* <div className="container mt-3 mb-3" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <button type="button" disabled={this.state.page === 1} className="btn btn-dark p-2 nextBtn" onClick={this.handleOnPrev}>&#8592; Previous</button>
                        <span className='pageNode'>{this.state.page} / {Math.ceil(this.state.totalResults / this.props.pageSize)} </span>
                        <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark p-2 nextBtn" onClick={this.handleOnNext}>Next &#8594;</button>
                    </div> */}
            </>
        );
    }
}

export default News;
