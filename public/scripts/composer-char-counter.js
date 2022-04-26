$(document).ready(()=> {
  let charCounter = 0;
  $("textarea").on("input", ()=> {
    charCounter = $("textarea").val().length;
    $(".counter").text(140 - charCounter);
    if (charCounter > 140) {
      $(".counter").css('color','red');
    }
  });
  // --- our code goes here ---
});