$(document).ready(function(){
  $(".detailInfo").hide();
  $(".infodiv").click(function() {
    $(this).find(".detailInfo").toggle("slow");
  })
})

$(document).ready(function(){
  $(".hoursInfo").hide();
  $(".hoursDiv").click(function() {
    $(this).find(".hoursInfo").toggle("slow");
  })
})
