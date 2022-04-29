$(document).ready(() => {
  $(".scrollup-button").hide();
  console.log("button should be hidden now");
  $(document).scroll(() => {
    $(".scrollup-button").show();
    if (window.scrollY == 0) {
      $(".scrollup-button").hide();
    }
  });
  // const scrollFunction = () => {
  //   if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
  //     $(".scrollup-button").style.display = "block";
  //   } else {
  //     $(".scrollup-button").style.display = "none";
  //   }
  // }
  // don't use inline css
  // assign variables to j-query selectors that repeat/are hard to refer to
  $(".scrollup-button").on("click", () => {
    $(window).scrollTop(0);

  });

// When the user clicks on the button, scroll to the top of the document
})
//Get the button:
