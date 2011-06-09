$(function(){
  $("#button").bind("click", function(e) {
    var contents = $("#contents").val();

    if (contents.length <= 0) {
      return false;
    }

    $.ajax({
      cache: false,
      dataType: "json",
      url: "http://richsnippets.heroku.com/contents",
      type: "POST",
      data: {contents: contents},
      success: function(data, dataType){
        $("iframe").attr("src", data["test_url"]);
      }
    });
  });
});
