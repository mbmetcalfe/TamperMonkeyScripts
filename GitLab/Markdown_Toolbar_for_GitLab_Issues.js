// ==UserScript==
// @name         GitLab Markdown Toolbar
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Markdown toolbar for GitLab issues
// @author       mbmetcal
// @match        http://vac-git/*/issues/*/edit
// @match        http://vac-git/*/issues/new*
// @grant        GM_addStyle
//
// ==/UserScript==
/* jshint -W097 */
'use strict';

var x;

// If submit page.
if (false && window.location.href.indexOf('submit') > - 1) {
  // Add the toolbar to the 'NEW POST' textbox
  x = document.querySelectorAll('div.md > textarea:nth-child(1)')[0].parentNode;
  addFeatures(x);
}
else {
  var textareas = document.querySelectorAll('textarea');
  console.log(textareas)
  // Add the toolbar to the issue/comment editing.
  for (var i = 0; i < textareas.length; i++) {
    console.log(i)
    x = document.querySelectorAll('textarea') [i].parentNode;
    addFeatures(x);
  }
}

function addFeatures(n) {

    n.parentNode.textAreaNode = x.firstChild;

    GM_addStyle('\
      .Button {\
          display: inline-block;\
          cursor: pointer;\
          margin: 0px;\
          font-size: 12px;\
          font-color: blue;\
          line-height: 1;\
          font-weight: bold;\
          padding: 4px 6px;\
          background: -moz-linear-gradient(center bottom , #CCC 0%, #FAFAFA 100%) repeat scroll 0% 0% #F8F8F8;\
          border: 1px solid #999;\
          border-radius: 2px;\
          white-space: nowrap;\
          text-shadow: 0px 1px 0px #FFF;\
          box-shadow: 0px 1px 0px #FFF inset, 0px -1px 2px #BBB inset;\
          color: #333;}');


  // Add the buttons.
  btnMake(n, 'H3', 'Heading 3', '\n### ','', true);
  btnMake(n, 'H2', 'Heading 2', '\n## ','', true);
  btnMake(n, 'H1', 'Heading 1', '\n# ','', true);
  //btnMake(n, '^', 'Superscript', '^','', true);
  btnMake(n, '<s>S</s>', 'Strikethrough', '<s>','</s>');
  //btnMake(n, '<s>S</s>', 'Strikethrough', '~~');
  //btnMake(n, '<u>U</u>', 'Underline', '<u>','</u>');
  btnMake(n, '<i>I</i>', 'Italic', '*');
  btnMake(n, '<b>B</b>', 'Bold', '**');
  //btnMake(n, '\\n', 'Line break', '&nbsp;\n', '', true);
  btnMake(n, '---', 'Horizontal line', '\n\n---\n\n', '', true);
  btnMake(n, 'URL', 'Add URL to selected text',
          function(e) {
            try {edWrapInTag('[', ']('+prompt('URL:')+')', edInit(e.target))}
            catch(e) {};
          });
  // btnMake(n, 'Image', 'Convert selected https://url to inline image', '!['+'image'+'](', ')');
  btnMake(n, 'Table', 'Insert table template', '\n| head1 | head2 |\n|-------|-------|\n| cell1 | cell2 |\n| cell3 | cell4 |\n', '', true);
  btnMake(n, 'Code', 'Apply CODE markdown to selected text',
          function(e){
            var ed = edInit(e.target);
            if (ed.sel.indexOf('\n') < 0) {
              edWrapInTag('```', '  ', ed);
            }
            else {
              edWrapInTag(((ed.sel1==0) || (ed.text.charAt(ed.sel1-1) == '\n') ? '' : '\n') + '```' + (ed.sel.charAt(0) == '\n' ? '' : '\n'),
                          (ed.sel.substr(-1) == '\n' ? '' : '\n') + '```' + (ed.text.substr(ed.sel2,1) == '\n' ? '' : '\n'),
                          ed);
            }
          });
  //btnMake(n, 'Task', 'Task', '- [ ] ', '', true);
    btnMake(n, 'Task', 'Apply TASK markdown to selected text',
            function(e){
              var ed = edInit(e.target);
              if (ed.sel.indexOf('\n') < 0) {
                edWrapInTag('- [ ] ', '  ', ed);
              }
              else {
                alert('tbd');
              }
            });
}

function btnMake(afterNode, label, title, tag1, tag2, noWrap) {
  var a = document.createElement('a');
  a.className = 'Button';
  a.innerHTML = label;
  a.title = title;
  //a.style.setProperty('float','left');

  a.addEventListener('click',
            typeof(tag1) == 'function'
                     ? tag1
                     : noWrap ? function(e){edInsertText(tag1, edInit(e.target))}
                             : function(e){edWrapInTag(tag1, tag2, edInit(e.target))});

  var nparent = afterNode.parentNode;
  a.textAreaNode = nparent.textAreaNode;
  nparent.insertBefore(a, nparent.firstElementChild);
}

function edInit(btn) {

  var ed = {node: btn.parentNode.textAreaNode } ;

  ed.sel1 = ed.node.selectionStart;
  ed.sel2 = ed.node.selectionEnd;
  ed.text = ed.node.value;
  ed.sel = ed.text.substring(ed.sel1, ed.sel2);
  return ed;
}

function edWrapInTag(tag1, tag2, ed) {
  ed.node.value = ed.text.substr(0, ed.sel1) + tag1 + ed.sel + (tag2?tag2:tag1) + ed.text.substr(ed.sel2);
  ed.node.setSelectionRange(ed.sel1 + tag1.length, ed.sel1 + tag1.length + ed.sel.length);
  ed.node.focus();
}

function edInsertText(text, ed) {
  ed.node.value = ed.text.substr(0, ed.sel2) + text + ed.text.substr(ed.sel2);
  ed.node.setSelectionRange(ed.sel2 + text.length, ed.sel2 + text.length);
  ed.node.focus();
}
