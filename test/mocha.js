(function($){
  function formatHtml(target){
    var html = $(target).html()
    html = html.replace(/^\s+/g,"");
    html = html.replace(/\n\s+/g,"");
    html = html.replace(/\n/g,"");
    return html
  }

  function assertTagName(a, b){
    var tagNameA = $(a).get(0).tagName;
    var tagNameB = $(b).get(0).tagName;
    assert.equal(tagNameA, tagNameB);
  }

  function assertAttribute(a, b){
    var tagName = $(a).get(0).tagName;
    var attrA = $(a).mapAttributes()
    var attrB = $(b).mapAttributes()
    for(var key in attrA){
      var valueA = attrA[key];
      var valueB = attrB[key];
      var msg = {
        attribute : key,
        tagName : tagName,
        actual : valueA,
        expect : valueB
      }
      assert.deepEqual(valueA, valueB, msg);
    }
  }
  function fail(target,error){
    $(target).addClass("failed")
    throw error;
  }
  
  function success(target){
    $(target).addClass("success")
  }
  

  describe('jquery', function () {
    $(".testset").each(function(){
      var target = this;
      var title = $(target).find(".title").text();
      if(title == ""){
        console.log("title is none. skip");
        return;
      }
      console.log(title);
      it(title, function () {
        
        console.log("Start:"+title);
        // execute plugin
        $(target).find(".input .centerimg").centerimg();
        var $inputs = $(target).find(".input *")
        var $expects = $(target).find(".expect *")
        
        for(var i=0; i < $inputs.length; i++){
          var $input = $($inputs[i])
          var $expect = $($expects[i])
          try{
            assertTagName($input, $expect)
          }catch(e){
            fail(target,e)
          }
          try{
            assertAttribute($input, $expect)
          }catch(e){
            var failed = true;
            var attr = e.message.attribute;
            if(/data-.*/.test(attr)){ // skip data attribute difference
             failed = false;
            }
            if(failed){
              console.log(e);
              var msg = "\nPrperty assert\n"
                      + "tag:"+ e.message.tagName+"\n"
                      + "attribute:"+ e.message.attribute + "\n"
                      + "actual:"+ e.message.actual + "\n"
                      + "expect:"+ e.message.expect
              e.message = msg;
              fail(target, e)
            }
          }
        }
        success(target);
      });
    });
  });
})(jQuery)