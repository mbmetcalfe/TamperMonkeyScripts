// ==UserScript==
// @name            Register Steam Key
// @namespace       http://tampermonkey.net/
// @description     Goes to the Steam register key page using the selected text as the key.
// @version         0.2
// @author          That Guy (https://github.com/mbmetcalfe)
// @include         https://www.indiegala.com/profile/*
// @include         https://www.reddit.com/*
// @icon            https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2000px-Steam_icon_logo.svg.png
// @grant           GM_openInTab
// @run-at          context-menu
// ==/UserScript==]
(function() {
    'use strict';
    if (document.getSelection) {    // all browsers, except IE before version 9
        var selection = document.getSelection ();
        GM_openInTab("https://store.steampowered.com/account/registerkey?key=" + selection);
    }
})();
