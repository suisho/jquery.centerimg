
describe('jquery', function () {
  $(".testset").each(function(){
    var target = this;
    var title = $(target).find(".title").text();
    if(title == ""){
      console.log("title is none. skip");
      return;
    }
    it(title, function () {
      // execute plugin
      $(target).find(".input .centerimg").centerimg();
      assertHtml($(target))
    });
  });
});