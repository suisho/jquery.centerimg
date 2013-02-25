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
      function fail(error,target){
        $(target).addClass("failed")
        throw error;
      }
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
          fail(e,target)
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
            fail(msg, target)
          }
        }
      }
      $(target).addClass("success")
    });
  });
});