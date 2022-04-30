$(document).ready(()=> {
  $("textarea").on("input", ()=> {
    charCounter = $("textarea").val().length;
    $(".counter").text(140 - charCounter);
    if (charCounter > 140) {
      $(".counter").css('color','red');
    } else {
    $(".counter").css('color','black');
    }
  });
});