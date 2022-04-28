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
      <span class ="profile-name">
        <img class ="tweetpfp" src = ${tweet.user.avatars}>
        <span>${tweet.user.name}</span>
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
    $('#all-tweets').prepend($tweet);
  }
}


$(document).ready(function() {
  $(".new-tweet").hide();
  $(".banner-tweet").on("click", () => {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus();
  });

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

    // error handling for empty tweets
    $("#error-message").slideUp(200);
    if (formData.length == 5) {
      $("#error-message").text("Tweet cannot be empty").css({'color':'red', "margin-top": "10px", "padding":"8px", "font-style":"italic", "font-weight":"600"});
      $("#error-message").slideDown(200);
  
      return $error;
  
    } else 
    if (formData.length > 145) {
      $("#error-message").text("Tweet should not exceed 140 characters").css({'color':'red', "margin-top": "10px", "padding":"8px", "font-style":"italic", "font-weight":"600"});
      $("#error-message").slideDown(200);
  
      return $error;
  
    }
 
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


