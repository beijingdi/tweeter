/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
** create the html element for a tweet 
*/
const createTweetElement = function(tweet) {
  let $tweet =  `
  <article class = "tweet">
    <header>
      <span>
        <img src=${tweet.user.avatars}>
        <p>${tweet.user.name}</p>
      </span>
      <span>${tweet.user.handle}</span>
    </header>
    <div>
      ${tweet.content.text}
    </div>
    <footer>
      <span>${timeago.format(tweet.created_at)}</span>
      <span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-retweet"></i>
      </span>
    </footer>
  </article>`;
  return $tweet;
}
/*
**rendering tweets
*/
const  renderTweets = (tweets) => {
  //clear #all-tweets to avoid duplication
  $('#all-tweets').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#all-tweets').append($tweet);
  }
}




$(document).ready(function() {

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
    // error handling for empty tweets
    if (formData.length == 5) {
      window.alert("tweet cannot be emplty");
    }
    // error handling for tweets exceeding 140 chars
    if (formData.length > 145) {
      window.alert("tweet cannot exceeds 140 characters");
      throw error;
    }
    $.ajax({
      method: "POST",
      data: formData,
      url: "/tweets"
    })
    .then((res) => loadTweets(res))
  };

  $("form").on("submit",(e) => {postNewTweet(e)});
  loadTweets();
});

