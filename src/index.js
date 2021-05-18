import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const ARTICLE = [
  { id: "article-0", image: "Image-Recognizer.jpeg", title: "Use JavaScipt for Deep Learning Classification Model", date: "Nov. 19, 2019", description: "I built a simple deep learning image classifcation model in the browser to recognize the landmarks of Columbia University.", link: "https://haoshuai999.github.io/image-classifier/"},
  { id: "article-1", image: "Poland-abortion-cost.jpeg", title: "Polish women turn to arthritis medication for abortions", date: "Dec. 13 2018", description: "Opening a pack of medicine for joint-pain, Julia Zareba, a student from northeast Poland, took 12 pills out and swallowed them all at once...", link: "https://web.archive.org/web/20190514054352/http://jerichoonline.com/2019/01/16/polish-women-turn-to-arthritis-medication-for-abortions/"},
  { id: "article-2", image: null, title: "The Second Biggest Rehabilitation Center in Philippines Faces Challenges", date: "Dec. 8, 2018", description: "On a normal workday, Christian Andres wore his uniform and employee’s card as usual and went out to attend a patient admission interview...", link: null},
  { id: "article-3", image: null, title: "Smart Chart: Tracking North Korea’s Missile Program", date: "Sept. 22, 2017", description: "North Korean missiletraveled 3,700 kilometers (2,300 miles), putting the U.S. Pacific territory of Guam within reach...", link: "https://www.caixinglobal.com/2017-09-22/smart-chart-tracking-north-koreas-missile-program-101147919.html"}
]

const CHART = [
  { id: "chart-0", image: "Figma.png", title: "Feed for Thought – News Product", date: "Mar. 14 2020", description: "I designed Feed for Thought, a technology news aggregation application prototype, using Figma and made a intro video using Protopie.", link: "https://www.youtube.com/watch?v=bZgdGAhI1vo&t=20s"},
  { id: "chart-1", image: "Slavery.jpeg", title: "Slavery’s Explosive Growth, in Charts: How ’20 and odd’ Became Millions", date: "Aug. 28, 2019", description: "The largest project I worked on at USA TODAY Network is about the history of slavery in the US since 1619.", link: "https://www.usatoday.com/pages/interactives/1619-african-slavery-history-maps-routes-interactive-graphic/"},
  { id: "chart-2", image: "weed.jpeg", title: "The Use of Marijuana During Pregnancy", date: "Aug. 28, 2019", description: "A map visualization showing the marijuana-related legislation in each state in the US.", link: "https://www.usatoday.com/pages/interactives/1619-african-slavery-history-maps-routes-interactive-graphic/"},
  { id: "chart-3", image: "final-project.jpeg", title: "Evolution of Terrorism", date: "Sept. 26, 2019", description: "Terrorism has long been one of the biggest threats to safety and stability across the world. Different forms of terrorism exist, including state-sponsored, political and religious terrorism...", link: "https://haoshuai999.github.io"},
  { id: "chart-4", image: "Sleep-Deprivation1.jpeg", title: "Sleep Deprivation", date: "Dec. 16, 2018", description: "The website shows Chinese young people's night life using the Javascript library skrollr.", link: "https://www.youtube.com/watch?v=qXACAU0BRAQ&feature=youtu.be"},
  { id: "chart-5", image: "china-map.jpeg", title: "How Far Between the Chinese and Global National Parks? The length of a High-price Ticket", date: "Dec. 23, 2017", description: "The data journalism story was written by me in April 2017 and got the 13th place in 2017 Data Journalism Competition of China.", link: "http://haoshuai.000webhostapp.com/"}
]

const SLIDE = [
  { id: "slide-0", image: "Election.jpg", title: null, description: null},
  { id: "slide-1", image: "India.jpeg", title: null, description: null},
  { id: "slide-2", image: "Iran.jpeg", title: null, description: null},
  { id: "slide-3", image: "Mexico.jpeg", title: null, description: null},
  { id: "slide-4", image: "Venezuela.jpeg", title: null, description: null},
  { id: "slide-5", image: "Turkey.jpeg", title: null, description: null},
  { id: "slide-6", image: "BTC Price.jpeg", title: null, description: null},
  { id: "slide-7", image: "Bull_bear.jpg", title: null, description: null},
  { id: "slide-8", image: "BTC_heatmap.jpg", title: null, description: null}
]

ReactDOM.render(
  <App articles={ARTICLE} charts={CHART} slides={SLIDE}/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
