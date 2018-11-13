// ==UserScript==
// @name           GitLab Project favicon
// @author         mbmetcal
// @version        0.1
// @namespace      vac-git
// @description    Use og:image as favicon on Gitlab pages
// @unwrap
// @noframes
// @run-at         document-end
// @include        http://vac-git/*
// @match          http://vac-git/*
// ==/UserScript==

(function(){
    'use strict';
	var u ='undefined', win = typeof unsafeWindow !=u ? unsafeWindow: window;
	var $ = win.$;

	win.onerror = function(error, file, line){
		console.log(error +' (line '+line+')');
	};

  if(win.top != win.self){
    return false; // ignore iframes
  }

  $(function(){
    var project_img = $('meta[property="og:image"]').attr('content');
    if(project_img){
        $('#favicon').attr('href', project_img);
    }
  });
})();
