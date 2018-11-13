// ==UserScript==
// @name         GitLab Collapse Feed
// @namespace    http://vac-git
// @version      0.1
// @description  Collapse the update feed on issues.
// @author       mbmetcal
// @match        http://vac-git/
// @grant        none
// ==/UserScript==

(
    function(){ $(".system-note").each(function(index) { $(this).css("display", "none"); }); }
)();
