
// Stolen from PPK at quirksmode

function getElementsByTagNames(list,obj) {
	if (!obj) var obj = document;
	var tagNames = list.split(',');
	var resultArray = new Array();
	for (var i=0;i<tagNames.length;i++) {
		var tags = obj.getElementsByTagName(tagNames[i]);
		for (var j=0;j<tags.length;j++) {
			resultArray.push(tags[j]);
		}
	}
	var testNode = resultArray[0];
	if (!testNode) return [];
	if (testNode.sourceIndex) {
		resultArray.sort(function (a,b) {
				return a.sourceIndex - b.sourceIndex;
		});
	}
	else if (testNode.compareDocumentPosition) {
		resultArray.sort(function (a,b) {
				return 3 - (a.compareDocumentPosition(b) & 6);
		});
	}
	return resultArray;
}

// Stolen from dustin diaz
function getElementsByClass(node,searchClass,tag) {
  var classElements = new Array();
  var els = node.getElementsByTagName(tag); // use "*" for all elements
  var elsLen = els.length;
  var pattern = new RegExp("\\b"+searchClass+"\\b");
  for (i = 0, j = 0; i < elsLen; i++) {
   if ( pattern.test(els[i].className) ) {
   classElements[j] = els[i];
   j++;
   }
  }
  return classElements;
}

function Snippet(s, c, i){
  this.snippetEl = s;
  this.captionEl = c;
  this.captionImgEl = i;

  this.toggle = function(){
    if(this.snippetEl.style.display!="block"){
      this.show()
    }else{
      this.hide();
    }
  }
  
  this.show = function(){
    this.snippetEl.style.display="block"
    this.captionImgEl.src = "images/minus_icon.png"
  }
  
  this.hide = function(){
    this.snippetEl.style.display="none"
    this.captionImgEl.src = "images/plus_icon.png"  
  }
  
}

Snippet.from_caption = function(captionEl){
  var snippetEl = captionEl.nextSibling;
  var imgEl = captionEl.firstChild;
  snippet = new Snippet(snippetEl, captionEl, imgEl)
  return snippet;
}

Snippet.from_snippet = function(snippetEl){
  var captionEl = snippetEl.previousSibling;
  var imgEl = captionEl.firstChild;
  snippet = new Snippet(snippetEl, captionEl, imgEl)
  return snippet;
}

Snippet.each_snippet = function(block){
  var snippetEls = getElementsByClass(document, 'code_snippet', 'div');
  for(var i=0; i<snippetEls.length; i++){
    block(Snippet.from_snippet(snippetEls[i]));
  }
}

function toggleSnippet(captionEl){
  Snippet.from_caption(captionEl).toggle();
}

function expandAllSnippets(){
  Snippet.each_snippet(function(s){ s.show() });
}

function collapseAllSnippets(){
  Snippet.each_snippet(function(s){ s.hide() });
}

function createTOC() {
	var y = document.createElement('div');
	y.id = 'innertoc';
	var a = y.appendChild(document.createElement('span'));
	a.onclick = showhideTOC;
	a.id = 'contentheader';
	a.innerHTML = 'hide table of contents';
	var z = y.appendChild(document.createElement('div'));
	//z.onclick = showhideTOC;0
	
	var tocContainer = document.createElement('div');
	tocContainer.id = 'toccontainer'
	z.appendChild(tocContainer);
	
	var toBeTOCced = getElementsByTagNames('h1,h2,h3,h4');
	if (toBeTOCced.length < 2) return false;

	for (var i=0;i<toBeTOCced.length;i++) {
		var tmp = document.createElement('a');
		tmp.innerHTML = toBeTOCced[i].innerHTML;
		tmp.className = 'page';
		tocContainer.appendChild(tmp);
		if (toBeTOCced[i].nodeName == 'H3')
			tmp.className += ' indent';
		if (toBeTOCced[i].nodeName == 'H4')
			tmp.className += ' extraindent';
		var headerId = toBeTOCced[i].id || 'link' + i;
		tmp.href = '#' + headerId;
		toBeTOCced[i].id = headerId;
		if (toBeTOCced[i].nodeName == 'H1') {
			tmp.innerHTML = 'Top';
			tmp.href = '#top';
			toBeTOCced[i].id = 'top';
		}
	}
	
	var expandSnippets = document.createElement('span')
	expandSnippets.id = 'expand_snippets'
	expandSnippets.innerHTML = "<img class='expand_image' src='images/plus_icon.png' width='10' height='10' />Expand all code snippets"
	expandSnippets.onclick = expandAllSnippets;
	z.appendChild(expandSnippets);

	var expandSnippets = document.createElement('span')
	expandSnippets.id = 'collapse_snippets'
	expandSnippets.innerHTML = "<img class='expand_image' src='images/minus_icon.png' width='10' height='10' />Collapse all code snippets"	
	expandSnippets.onclick = collapseAllSnippets;
	z.appendChild(expandSnippets);	
	
	return y;
}

var TOCstate = 'block';

function showhideTOC() {
	TOCstate = (TOCstate == 'none') ? 'block' : 'none';
	var newText = (TOCstate == 'none') ? 'show table of contents' : 'hide table of contents';
	document.getElementById('contentheader').innerHTML = newText;
	document.getElementById('innertoc').lastChild.style.display = TOCstate;
}


window.onload = function(){
  var tocEl = document.getElementById('toc');
  var toc = createTOC();
  tocEl.appendChild(toc);
}
