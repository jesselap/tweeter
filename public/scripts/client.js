/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
    <p>${escape(tweetData.content.text)}</p>
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


const errorMessage = (errorString) => {
  let message = $(`<p>Error: ${errorString}</p>`)
  return message;
};
const renderError = function(error) {
  if ($("#error").is(":hidden")) {
    $('#error').empty();
    $('#error').append(errorMessage(error));
    $("#error").slideDown("slow");
  
  } else if ($("#error").is(":visible")) {
    $("#error").slideUp("slow");
    $('#error').empty();
    $('#error').append(errorMessage(error));
    $("#error").slideDown("slow");
  }
};

const renderTweet = function(data) {
    for (let tweet of data) {
      $('#tweet-container').prepend(createTweetElement(tweet));
    }
  };


$(document).ready(() => {
  
  $("#tweet-post").submit(function(event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    if (!event.target[0].value.length) {
      renderError('Say something!');
    } else if (event.target[0].value.length > 140) {
      renderError('Can you condense that a bit?');
    } else {
      if ($("#error").is(":visible")) {
        $("#error").slideUp("slow");
        $.post("/tweets", tweet).then((tweet)=>{
          loadTweets();
          $("#tweet-text").val('');
          $(".counter").val(140);
        })
      } else {
        $.post("/tweets", tweet).then((tweet)=>{
        loadTweets();
        $("#tweet-text").val('');
        $(".counter").val(140);
      })
      }
      
    }  
  })

  const loadTweets = function() {
    $.ajax("/tweets", {method: "GET"})
    .then(function (tweets) {
      renderTweet(tweets);
    })
  };

  loadTweets()

})
