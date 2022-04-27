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


const postNewTweet = (event) => {
  event.preventDefault();
  const formData = $(this).serialize();
  console.log(formData);
  $.ajax({
    method: "POST",
    data: formData,
    url: "/tweets",
  });
}

$("#postNewTweet").submit(postNewTweet);

});




  

    // const addTweet = (user) => {
    //   // Create base HTML elements
    //   const $article = $("<article>");
    //   const $h1 = $("<h1>");
    //   const $ul = $("<ul>");

      // Create title of section
      // if (user.error) {
      //   $h1.text("There was an error while registering");
      // } else {
      //   $h1.text("Succesfull registration!");
      // }

      // // Add class to section if there is a problem
      // if (user.error) {
      //   $section.addClass("error");
      // }

      // If successfull, add list items to the ul
    //   if (!user.error) {
    //     for (const key in user) {
    //       const $li = $("<li>");
    //       $li.text(`${key}: ${user[key]}`);
    //       $ul.append($li);
    //     }
    //   }

    //   // Add the structure
    //   $section.append($h1);
    //   $section.append($ul);

    //   // Return the structure in the page
    //   $("body").append($section);
    // };