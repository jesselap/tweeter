// Escape method to avoid XSS attacks through tweet form
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Boilerplate html for each displayed tweet
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

// Attaches tweet html to tweet data from Database
const renderTweet = function(data) {
  for (let tweet of data) {
    // Attaches tweets to page in chronological order
    $('#tweet-container').prepend(createTweetElement(tweet));
  }
};

// Ajax request to load tweets to webpage
const loadTweets = function() {
  $.ajax("/tweets", {method: "GET"})
    .then(function(tweets) {
      renderTweet(tweets);
    });
};


// Display appropriate error message
const renderError = function(error) {
  if ($("#error").is(":hidden")) {
    // Empty error message html
    $('#error').empty();
    // Fill error html with appropriate message
    $('#error').append(errorMessage(error));
    $("#error").slideDown("slow");
    setTimeout(function(){ $("#error").slideUp("slow"); }, 3000)
  
  } else if ($("#error").is(":visible")) {
    $('#error').empty();
    $('#error').append(errorMessage(error));
    setTimeout(function(){ $("#error").slideUp("slow"); }, 3000)
  }
};

// Boilerplate error html with appropriate message
const errorMessage = (errorString) => {
  let message = $(`<p>Error: ${errorString}</p>`);
  return message;
};


$(document).ready(() => {
  // Button to reveal new tweet form
  $(".button").click(function(event) {
    $(".new-tweet").slideToggle("slow");
  });

  // Tweet creation
  $("#tweet-post").submit(function(event) {
    event.preventDefault();

    const tweet = $(this).serialize();

    // Error handling
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
        });
      } else {
        // Add tweet
        $.post("/tweets", tweet).then((tweet)=>{
          loadTweets();
          $("#tweet-text").val('');
          $(".counter").val(140);
        });
      }
    }
  });

  loadTweets();

});
