$(function(){
  $(window).bind("resize", function(e) {
    var w_width = $("form").width();
    var h_width = 0;//$("h1").outerWidth();
    var s_width = $('input[type="submit"]').outerWidth();


    var t_area  = $('textarea');
    var padd    = t_area.outerWidth() - t_area.width();
    var t_width = (w_width - (h_width + s_width + padd)) - 40; // padding-left + padding-right = 40px
    $('textarea').css({
      'min-width': t_width,
      'max-width': t_width,
      'width'    : t_width
    });
    var w_height = $(window).height();
    var t_height = $("#topbar").outerHeight(true);
    var f_height = w_height - t_height - 4;
    $('iframe').css({
      "height": f_height
    });
  });


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

    return false;
  });

  $(window).resize();
});
