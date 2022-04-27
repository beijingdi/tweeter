/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];




  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
$(document).ready(function() {


const createTweetElement = function(tweet) {
  let $tweet =  `
  <article class = "tweet">
    <header></header>
    <div>
      ${tweet.content.text}
    </div>
    <footer>
      <span>2 days ago</span>
      <span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-retweet"></i>
      </span>
    </footer>
  </article>`;

  console.log($tweet);

  return $tweet;

}

const  renderTweets = (tweets) => {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#all-tweets').append($tweet);
  }
}


renderTweets(data);

});
