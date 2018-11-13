// ==UserScript==
// @name         GitLab Board Mod
// @namespace    http://vac-git
// @version      0.1
// @description  Narrow board columns
// @include      http://vac-git/*
// @grant        none
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
// This line doesn't work well with the ".board is-expandable" columns, so just use it on the draggable ones for now.
addGlobalStyle('@media (min-width: 768px) {.board.is-draggable { width: 300px !important; padding-right: 1px; padding-left: 1px }}');
