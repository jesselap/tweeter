/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1621209880373
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1621296280373
  }
];

const renderTweet = function(data) {
  for (let tweet of data) {
    $('#tweet-container').append(createTweetElement(tweet));
  }
};
const createTweetElement = (tweetData) => {
  let $tweet = $(`<article>
  <header>
    <div class="user">
    <img src="${tweetData.user.avatars}"/>
      <span>${tweetData.user.name}</span>
    </div>
    <span class="handle">${tweetData.user.handle}</span>
  </header>
  <div class="tweet-content">
    <p>${tweetData.content.text}</p>
  </div>
  <footer>
    <span class="time">${timeago.format(tweetData.created_at)}</span>
    <div class="icons">
      <i class="fas fa-flag flag"></i>
      <i class="fas fa-retweet retweet"></i>
      <i class="fas fa-heart like"></i>
    </div>
  </footer>
  </article>`);
  return $tweet;
};
$(document).ready(() => {
  console.log(data[0])
  renderTweet(data); 
  console.log("hello")
})
