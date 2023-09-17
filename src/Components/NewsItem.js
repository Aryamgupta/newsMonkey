import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, des, imgUrl, newsUrl, time ,author,namee,colorvar} = this.props;
    // console.log(namee);
   let allColl = document.getElementsByClassName('badge');
   for(let i = 0 ; i < allColl.length ;i++){
    allColl[i].classList.add(`bg-${colorvar}`);
   }

   let allbtns = document.getElementsByClassName('readMoreBtn');
   for(let i = 0 ; i < allbtns.length ;i++){
    // console.log(colorvar);
    allbtns[i].classList.add(`btn-${colorvar}`);
   }
    


    return (
      <div className='my-3'>
        
        <div className="card" >
        <span className = "position-absolute top-0  translate-middle badge rounded-pill badge" style={{zIndex : 1,left:"50%"}}>{namee}</span>
        
          <img src={imgUrl ? imgUrl : "https://kchanews.com/wp-content/uploads/2014/09/bigstock-Breaking-News-Screen-36237841.jpg"} className="card-img-top" alt="..." height="200px" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <h6>by {author?author:"Unknown"} at {time}</h6>
            <p className="card-text">{des}...</p>
            <a href={newsUrl} target="_blank" className="btn  readMoreBtn btn-sm">Read More</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
