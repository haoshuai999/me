import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const ARTICLE = [
  { id: "article-0", image: "Image-Recognizer.jpeg", title: "Use JavaScipt for Deep Learning Classification Model", date: "Nov. 19, 2019", description: "I built a simple deep learning image classifcation model in the browser to recognize the landmarks of Columbia University.", link: "https://haoshuai999.github.io/image-classifier/"},
  { id: "article-1", image: "NLP.jpeg", title: "News article summarization", date: "Feb. 24, 2020", description: "I attempted to generate summaries of news articles by extracting important sentences using NLP algorithms.", link: "https://github.com/haoshuai999/News-summarization"},
  { id: "article-2", image: "Korea.png", title: "Smart Chart: Tracking North Korea’s Missile Program", date: "Sept. 22, 2017", description: "I wrote a story about the type of North Korean missiles. A D3 chart was created to show the range of the missiles.", link: "https://www.caixinglobal.com/2017-09-22/smart-chart-tracking-north-koreas-missile-program-101147919.html"},
  { id: "article-3", image: "Poland-abortion-cost.jpeg", title: "Polish women turn to arthritis medication for abortions", date: "Dec. 13 2018", description: "I interviewed young women in Poland and wrote about their frustration with abortion laws.", link: "https://web.archive.org/web/20190514054352/http://jerichoonline.com/2019/01/16/polish-women-turn-to-arthritis-medication-for-abortions/"},
  { id: "article-4", image: null, title: "Chinese Companies Look for Ways to Cope with Trade War", date: "Nov. 29, 2018", description: "I interviewed salesmen in China about how entrepot trade helps companies during the US-China trade war.", link: "https://observablehq.com/@shuaihaofzny/chinese-companies-look-for-ways-to-cope-with-trade-war"},
  { id: "article-5", image: null, title: "The Second Biggest Rehabilitation Center in Philippines Faces Challenges", date: "Dec. 8, 2018", description: "I talked to workers in rehab centers in Philippines and asked how they helped patients during President Duterte's drug war.", link: "https://observablehq.com/@shuaihaofzny/the-second-biggest-rehabilitation-center-in-philippines-f"}
]

const CHART = [
  { id: "chart-0", image: "Slavery.jpeg", title: "Slavery’s Explosive Growth, in Charts: How ’20 and odd’ Became Millions", date: "Aug. 28, 2019", description: "The largest project I worked on at USA TODAY Network is about the history of slavery in the US since 1619.", link: "https://www.usatoday.com/pages/interactives/1619-african-slavery-history-maps-routes-interactive-graphic/"},
  { id: "chart-1", image: "final-project.jpeg", title: "Evolution of Terrorism", date: "Sept. 26, 2019", description: "I explored why and how terrorism evolved over the years by analyzing 180,000 rows of data using D3.js and scrollama.js.", link: "https://haoshuai999.github.io"},
  { id: "chart-3", image: "woman.png", title: "Know her name: The women who fought for the right to vote", date: "Aug. 14, 2019", description: "I modify a timeline template in Angular.js to show the history of women's suffrage", link: "https://www.usatoday.com/pages/interactives/women-suffrage-timeline/"},
  { id: "chart-4", image: "weed.jpeg", title: "The Use of Marijuana During Pregnancy", date: "Aug. 28, 2019", description: "A map visualization showing the marijuana-related legislation in each state in the US.", link: "https://www.usatoday.com/pages/interactives/1619-african-slavery-history-maps-routes-interactive-graphic/"},
  { id: "chart-5", image: "alexander.jpeg", title: "Conquer Cities with Alexander the Great", date: "Sept. 26, 2019", description: "I built a user interface with Model View Controller design pattern in Flask, Bootstrap and D3.js through which visitors can gain knowledge about cities conquered or ruled by Alexander the Great and take a quiz about how well they know Alexander.", link: "https://www.youtube.com/watch?v=o40lbDjqQ3M&feature=youtu.be"},
  { id: "chart-6", image: "Figma.png", title: "Feed for Thought – News Product", date: "Mar. 14 2020", description: "I designed Feed for Thought, a technology news aggregation application prototype, using Figma and made a intro video using Protopie.", link: "https://www.youtube.com/watch?v=bZgdGAhI1vo&t=20s"},
  { id: "chart-7", image: "databases.jpeg", title: "NYC Parks Database", date: "Sept. 26, 2019", description: "The demo shows a database system I designed in PostgreSQL including crimes, monuments, eateries and hiking trails in all public parks at New York City.", link: "https://www.youtube.com/watch?v=NBeRTGNiOnY"},
  { id: "chart-8", image: "astronomy.png", title: "Astronomy Picture Search", date: "Mar. 23, 2019", description: "I designed a database storing Astronomy Picture of the Day published by NASA.", link: "https://www.youtube.com/watch?v=qBN3LDeLQLg"},
  { id: "chart-9", image: "Sleep-Deprivation1.jpeg", title: "Sleep Deprivation", date: "Dec. 16, 2018", description: "The website shows Chinese young people's night life using the Javascript library skrollr.", link: "https://www.youtube.com/watch?v=qXACAU0BRAQ&feature=youtu.be"},
  { id: "chart-10", image: "china-map.jpeg", title: "How Far Between the Chinese and Global National Parks? The length of a High-price Ticket", date: "Dec. 23, 2017", description: "I wrote the data journalism story in April 2017 and got the 13th place in 2017 Data Journalism Competition of China.", link: "https://haoshuai999.github.io/China_national_park/"},
  { id: "chart-11", image: "FRED.jpeg", title: "Will Toronto Raptors stand out in the playoffs?", date: "Apr. 12, 2018", description: "I wrote about the performance of the Toronto Raptors during the 2018 NBA regular season, focusing on how they succeeded in the league.", link: "https://observablehq.com/@shuaihaofzny/will-toronto-raptors-stand-out-in-the-playoffs"}
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
