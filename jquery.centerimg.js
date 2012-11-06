/*
 * Centerimg- jQuery plugin for create image centering block
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://github.com/suisho/jquery.centerimg
 *
 * jQuery Version:  1.7.2
 */
(function($, window) {
  $window = $(window);
  $.fn.centerimg = function(options) {
    var setting = $.extend({
      parentClass : "",
      linkClass : ""
    }, options || {});
    this.each(function(){
      var self = this;
      var _w = $(self).data("width") || 100;
      _w = _w+"px";
      var _h = $(self).data("height") || 100;
      _h = _h+"px";
      var link = $(self).data("link") || "";
      var src = $(self).data("src") || $(self).attr("src");
      var _parentClass = $(self).data("parent-class") || setting.parentClass;
      var _linkClass = $(self).data("link-class") || setting.linkClass;

      //create parent div
      var $parent = $("<div>").css({
        "width" : _w,
        "height" : _h,
      }).addClass("_parentClass");

      //create link tag
      var $link = $("<a>").css({
        "width" : _w,
        "height" : _h,
        "font-size" : 0,
        "display" : "block",
        "vertical-align" : "middle",
        "text-align" : "center",
        "text-decoration" : "none",
        "outline" : "none",
      }).addClass("_linkClass");
      if(link){
        $link.attr("href",link);
      }

      //clone image tag
      var $img = $(self).clone(true);
      if(src){
        $img.attr("src",src);
      }
      $img.css({
        "max-height" : _h,
        "max-width" : _w,
        "line-height" : _h,
        "vertical-align" : "middle",
        "border" : "none" // for ie
      });

      //create spring
      var $spling = $("<span>").css({
        "height" : _h,
        "display" : "inline-block",
        "font-size" : 0,
        "width" : "1px",
        "margin-left": "-1px",
        "overflow" : "hidden",
        "vertical-align" : "middle"
      });

      //struct div
      $link.append($img);
      $link.append($spling);
      $parent.append($link);

      //replace img tag
      $(self).replaceWith($parent);
    })
  }
})(jQuery, window);
