/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
** create the html element for a tweet and render all tweets
*/

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
  return $tweet;
}
const  renderTweets = (tweets) => {
  //clear #all-tweets to avoid duplication
  $('#all-tweets').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#all-tweets').append($tweet);
  }
}




$(document).ready(function() {
  loadTweets();
  /*
  **load Tweets
  */
  const loadTweets = () => {
    $.ajax('/tweets', {method: 'GET'}).then((res) => renderTweets(res));
  };
  /*
  ** handler for posting new tweets
  */
  const postNewTweet = (event) => {
    event.preventDefault();
    const formData = $("form").serialize();
    console.log(formData);
    $.ajax({
      method: "POST",
      data: formData,
      url: "/tweets"
    })
    .then((res) => loadTweets(res));
  }
  $("form").on("submit",(e) => {postNewTweet(e)});
});

