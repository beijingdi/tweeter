/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
** cross-site scripting protection - use where there is text input
*/
const escapee = (str)=> {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
/*
** create the html element for a tweet 
*/
const createTweetElement = function(tweet) {
  let $tweet =  `
  <article class = "tweet">
    <header>
      <span>
        <img src= ${tweet.user.avatars}>
        <p> ${tweet.user.name}</p>
      </span>
      <span>${tweet.user.handle}</span>
    </header>
    <div>
      ${escapee(tweet.content.text)}
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
    //escape the input for corss-site scripting protection
    const formData = $("form").serialize();

   // const safeHTML = `<p>${escape(textFromUser)}</p>`;
    // error handling for empty tweets
    console.log(formData);
    if (formData.length == 5) {
      window.alert("tweet cannot be emplty");
    }
    // error handling for tweets exceeding 140 chars
    if (formData.length > 145) {
      window.alert("tweet cannot exceeds 140 characters");
      throw error;
    }
    //load the tweet on successful submission and empty the tweet box
    $.ajax({
      method: "POST",
      data: formData,
      url: "/tweets"
    })
    .then((res) => {
      $("#tweet-text").val("");
      loadTweets(res);
    })
    .catch((error) => {console.log(error);});
  };

  $("form").on("submit",(event) => {postNewTweet(event)});
  loadTweets();

});


