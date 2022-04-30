/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  hideTweetBox();
  $("form").submit((event) => {postNewTweet(event)});
  loadTweets();
});

/*
** cross-site scripting protection - use where there is text input
*/
const escapee = (str)=> {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};



const createTweetElement = function(tweet) {
  let $tweet =  `
  <article class = "tweet">
    <header>
      <span class="profile-name">
        <img class="tweetpfp" src = ${tweet.user.avatars}>
        <span>${tweet.user.name}</span>
      </span>
      <span class="handler">${tweet.user.handle}</span>
    </header>
    <div>
      ${escapee(tweet.content.text)}
    </div>
    <footer>
      <span>${timeago.format(tweet.created_at, Date())}</span>
      <span>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-heart"></i>
        <i class="fa-solid fa-retweet"></i>
      </span>
    </footer>
  </article>`;
  return $tweet;
}


const loadTweets = () => {
  $.ajax('/tweets', {method: 'GET'}).then((res) => renderTweets(res));
};

const hideTweetBox = () => {
  $(".new-tweet").hide();
  $(".banner-tweet").on("click", () => {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus();
  });
}


const  renderTweets = (tweets) => {
  $('#all-tweets').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#all-tweets').prepend($tweet);
  }
}

const postNewTweet = (event) => {
  event.preventDefault();
  const formData = $("form").serialize();

  // error handling for empty tweets
  $("#error-message").slideUp(200);
  if ($("textarea").val().length == 0) {
    $("#error-message").text("Tweet cannot be empty").css({'color':'red', "margin-top": "10px", "padding":"8px", "font-style":"italic", "font-weight":"600"});
    $("#error-message").slideDown(200);
    return $error;
    } else 
  if ($("textarea").val().length > 140) {
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

