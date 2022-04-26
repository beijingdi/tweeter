$(document).ready(()=> {
  console.log("loaded");
  let charCounter = 0;
  $("textarea").on("input", ()=> {
    charCounter = $("textarea").val().length;
    $(".counter").text(140 - charCounter);
    
  });
  // --- our code goes here ---
});