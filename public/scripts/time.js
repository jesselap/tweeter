$(document).ready(function() {
  const newTime = timeago.format(new Date());
  const timeClass = $(".time");
  timeClass.text(newTime);
})