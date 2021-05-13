import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// import poland from './images/Poland-abortion-cost.jpeg';
// import recognizer from './images/Image-Recognizer.jpeg';

const ARTICLE = [
  { id: "article-0", image: "Image-Recognizer.jpeg", title: "Use JavaScipt for Deep Learning Classification Model", date: "Nov. 19, 2019", description: "I built a simple deep learning image classifcation model in the browser to recognize the landmarks of Columbia University.", link: "https://haoshuai999.github.io/image-classifier/"},
  { id: "article-1", image: "Poland-abortion-cost.jpeg", title: "Polish women turn to arthritis medication for abortions", date: "Dec. 13 2018", description: "Opening a pack of medicine for joint-pain, Julia Zareba, a student from northeast Poland, took 12 pills out and swallowed them all at once...", link: "https://web.archive.org/web/20190514054352/http://jerichoonline.com/2019/01/16/polish-women-turn-to-arthritis-medication-for-abortions/"},
  { id: "article-2", image: null, title: "The Second Biggest Rehabilitation Center in Philippines Faces Challenges", date: "Dec. 8, 2018", description: "On a normal workday, Christian Andres wore his uniform and employee’s card as usual and went out to attend a patient admission interview...", link: null},
  { id: "article-3", image: null, title: "Smart Chart: Tracking North Korea’s Missile Program", date: "Sept. 22, 2017", description: "North Korean missiletraveled 3,700 kilometers (2,300 miles), putting the U.S. Pacific territory of Guam within reach...", link: "https://www.caixinglobal.com/2017-09-22/smart-chart-tracking-north-koreas-missile-program-101147919.html"}
]

ReactDOM.render(
  <App articles={ARTICLE}/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
