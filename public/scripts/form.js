$(document).ready(() => {
  $("form").submit((event) => {postNewTweet(event)});
});

const postNewTweet = (event) => {
  event.preventDefault();
  const formData = $("form").serialize();

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



   /*
   ** send ajax request each time the form is submitted
   

  