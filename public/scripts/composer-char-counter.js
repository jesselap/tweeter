$(document).ready(() => {
  console.log("hello");
  const textArea = $("#tweet-text");
  textArea.on("input", function() {
    textArea.css("color", "#545149")
    const counter = $(this).closest("form").find(".counter")[0];
    counter.value = 140 - this.value.length;
    
    if (counter.value < 0) {
        $(counter).css("color", "red")
      } else {
        $(counter).css("color", "#545149");
      }

    
  });
});



