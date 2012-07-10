/*
 * Centerimg- jQuery plugin for create image centering block
 *
 * Copyright (c) 2012 suisho
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version:  1.7.2
 *
 */
(function($, window) {
  $window = $(window);
  $.fn.centerimg = function(options) {
    this.each(function(){
      var self = this;
      var _w = $(self).data("width") || 100;
      var _h = $(self).data("height") || 100;
      var link = $(self).data("link");
      var src = $(self).data("src") || $(self).attr("src");
      var $parentDiv = $("<div>").css({
        width : _w,
        height : _h
      });
      var $cover;
      if(link){
        $cover = $("<a>").attr("href",link);
      }else{
        $cover = $("<span>");
      }
      $cover.css({
        "width" : _w,
        "height" : _h,
        "line-height" : _h,
        "display" : "block",
        "vertical-align" : "middle",
        "text-align" : "center",
        "text-decoration" : "none"
      })
      var $img = $(self).clone(true);
      if(src){
        $img.attr("src",src);
      }
      $img.css({
        "max-height" : _h,
        "max-width" : _w,
        "line-height" : _h,
        "display" : "inline",
        "vertical-align" : "middle"
      });
      var $spling = $("<span>").css({
        "height" : _h,
        "display" : "inline-block",
        "font-size" : 0,
        "width" : "1px",
        "margin-left": "-1px",
        "overflow" : "hidden",
        "vertical-align" : "middle"
      });
      $cover.append($img);
      $cover.append($spling);
      $parentDiv.append($cover);
      $(self).replaceWith($parentDiv);
    })
  }
})(jQuery, window);
