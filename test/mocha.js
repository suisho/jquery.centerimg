
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
      var input = formatHtml($(target).find(".input"))
      var expect = formatHtml($(target).find(".expect"))
      
      var result = (input) == (expect)
      if (result){
        $(target).addClass("success")
      }else{
        $(target).addClass("failed")
        throw new Error(title + ' dom HTML is not equal\n' + expect+"\n"+ input);
      }
    });
  });
});