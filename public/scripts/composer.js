$(document).ready(() => {
  $(".scrollup-button").hide();
  console.log("button should be hidden now");
  $(document).scroll(() => {
    $(".scrollup-button").show();
    if (window.scrollY == 0) {
      $(".scrollup-button").hide();
    }
  });

  // don't use inline css
  // assign variables to j-query selectors that repeat/are hard to refer to
  // avoid too many comments, enhance the cleaness of codes
  // one function should do only one thing
  $(".scrollup-button").on("click", () => {
    $(window).scrollTop(0);

  });

// When the user clicks on the button, scroll to the top of the document
})
//Get the button:
