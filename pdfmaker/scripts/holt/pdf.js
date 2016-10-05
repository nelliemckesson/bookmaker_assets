function getAllElementsWithAttribute(tag, attribute, value)
{
  var matchingElements = [];
  var allSections = document.getElementsByTagName(tag);
  for (var i = 0, n = allSections.length; i < n; i++)
  {
    if (allSections[i].getAttribute(attribute) == value)
    {
      // Element exists with attribute. Add to array.
      matchingElements.push(allSections[i]);
    };
  };
  return matchingElements;
};

function moveIllustrationSource()
{
var illoSources = document.getElementsByClassName("IllustrationSourceis");
var copyright = getAllElementsWithAttribute('section',"data-type",'copyright-page')[0];
for (var j = 0; illoSources.length > j; j++) {
  var figID = illoSources[j].parentNode.getAttribute('id');
  var figLink = illoSources[j].childNodes[0];
  figLink.href = '#' + figID;
  if (illoSources[j].parentNode.parentNode.getAttribute('class') != 'abouttheauthor') {
    copyright.appendChild(illoSources[j]);
  };
  };
};

function addRunningElements() {
  var allParas = document.getElementsByTagName('p');
  for (var q = 0; allParas.length > q; q++) {
    var thisParent = allParas[q];
    var section = allParas[q].parentNode;
    var i = 0;
    var sectionHead = "NoChapterName";
    while (section.tagName != "SECTION" && section.tagName != "NAV" && i < 10) {
      var section = section.parentNode;
      i++;
    };
    var sectionType = section.getAttribute('data-type')
    if (sectionType == "preface" || sectionType == "toc") {
    if (section.querySelector('h1:first-of-type') != null) {
    var sectionHead = section.querySelector('h1:first-of-type').textContent;
    };

      var frontRunHeadRight = document.createElement("div");
      var frontRunHeadRightSpan = document.createElement("span");
      frontRunHeadRight.setAttribute("class", "frontrunheadright");
      frontRunHeadRight.appendChild(frontRunHeadRightSpan);
      frontRunHeadRightSpan.textContent=sectionHead;      
      thisParent.parentNode.insertBefore(frontRunHeadRight, thisParent.nextSibling);

      var frontRunHeadLeft = document.createElement("div");
      var frontRunHeadLeftSpan = document.createElement("span");
      frontRunHeadLeft.setAttribute("class", "frontrunheadleft");
      frontRunHeadLeft.appendChild(frontRunHeadLeftSpan);
      frontRunHeadLeftSpan.textContent=sectionHead;
      thisParent.parentNode.insertBefore(frontRunHeadLeft, thisParent.nextSibling);
    };
    if (sectionType == "chapter") {
    if (section.querySelector('h1.ChapTitlect') != null) {
          var sectionHead = section.querySelector('h1.ChapTitlect').textContent;
    } else if (section.querySelector('h1.ChapTitleNonprintingctnp') != null) {
        var sectionHead = section.querySelector('h1.ChapTitleNonprintingctnp').textContent;
    };
    if (sectionHead.length < 4 && sectionHead.match(/^[0-9]+$/) != null) {
      sectionHead = "Chapter " + sectionHead;
    };

      var runHeadRight = document.createElement("div");
      var runHeadRightSpan = document.createElement("span");
      runHeadRight.setAttribute("class", "runheadright");
      runHeadRight.appendChild(runHeadRightSpan);
      runHeadRightSpan.textContent=sectionHead;
      thisParent.parentNode.insertBefore(runHeadRight, thisParent.nextSibling);

      var bookTitle = BKMKRINSERTBKTITLE;
      var runHeadLeft = document.createElement("div");
      var runHeadLeftSpan = document.createElement("span");
      runHeadLeft.setAttribute("class", "runheadleft");
      runHeadLeft.appendChild(runHeadLeftSpan);
      runHeadLeftSpan.textContent=bookTitle;
      thisParent.parentNode.insertBefore(runHeadLeft, thisParent.nextSibling);
    };
    if (sectionType == 'appendix') {
    if (section.querySelector('h1[class*="BMHead"]') != null) {
    var sectionHead = section.querySelector('h1[class*="BMHead"]').textContent;
    };
      
      var runHeadRight = document.createElement("div");
      var runHeadRightSpan = document.createElement("span");
      runHeadRight.setAttribute("class", "runheadright");
      runHeadRight.appendChild(runHeadRightSpan);
      runHeadRightSpan.textContent=sectionHead;
      thisParent.parentNode.insertBefore(runHeadRight, thisParent.nextSibling);

      var backRunHeadLeft = document.createElement("div");
      var backRunHeadLeftSpan = document.createElement("span");
      backRunHeadLeft.setAttribute("class", "backrunheadleft");
      backRunHeadLeft.appendChild(backRunHeadLeftSpan);
      backRunHeadLeftSpan.textContent=sectionHead;      
      thisParent.parentNode.insertBefore(backRunHeadLeft, thisParent.nextSibling);
    };
  };
};

function fullpageFigures() {
  var allIllos = document.getElementsByTagName('img');
  var fullpageFigs = [];
  for (var h = 0; allIllos.length > h; h++) {
    var illoType = allIllos[h].getAttribute('src');
    if (illoType.indexOf("fullpage") > -1) {
      fullpageFigs.push(allIllos[h]);
    };
  };
  for (var f = 0; fullpageFigs.length > f; f++) {
    var parentFig = fullpageFigs[f].parentNode;
    var section = parentFig.parentNode;
    var i = 0;
    while (section.tagName != "SECTION" && section.tagName != "NAV" && i < 10) {
      var section = section.parentNode;
      i++;
    };
    var sectionType = section.getAttribute('data-type')
    if (sectionType == "preface" || sectionType == "toc") {
      var frontRunHeadRight = document.createElement("div");
      var textnode = document.createTextNode(" ");
      frontRunHeadRight.setAttribute("class", "frontrunheadright");
      frontRunHeadRight.appendChild(textnode);
      parentFig.insertBefore(frontRunHeadRight,parentFig.firstChild);

      var frontRunHeadLeft = document.createElement("div");
      var textnode = document.createTextNode(" ");
      frontRunHeadLeft.setAttribute("class", "frontrunheadleft");
      frontRunHeadLeft.appendChild(textnode);
      parentFig.insertBefore(frontRunHeadLeft,parentFig.firstChild);
    };
    if (sectionType == "chapter") {
      var runHeadRight = document.createElement("div");
      var textnode = document.createTextNode(" ");
      runHeadRight.setAttribute("class", "runheadright");
      runHeadRight.appendChild(textnode);
        parentFig.insertBefore(runHeadRight,parentFig.firstChild);

      var runHeadLeft = document.createElement("div");
      var textnode = document.createTextNode(" ");
      runHeadLeft.setAttribute("class", "runheadleft");
      runHeadLeft.appendChild(textnode);
      parentFig.insertBefore(runHeadLeft,parentFig.firstChild);
    };
    if (sectionType == 'appendix') {
      var runHeadRight = document.createElement("div");
      var textnode = document.createTextNode(" ");
      runHeadRight.setAttribute("class", "runheadright");
      runHeadRight.appendChild(textnode);
        parentFig.insertBefore(runHeadRight,parentFig.firstChild);

      var backRunHeadLeft = document.createElement("div");
      var textnode = document.createTextNode(" ");
      backRunHeadLeft.setAttribute("class", "backrunheadleft");
      backRunHeadLeft.appendChild(textnode);
      parentFig.insertBefore(backRunHeadLeft,parentFig.firstChild);
    };
  };
};

window.onload = function() {
  moveIllustrationSource();
  addRunningElements();
  fullpageFigures();
};

// exclude author photo
// test in prince: done: run with --javascript flag (need to enable in DR)
// remove first funtion if poss?
// implement custom script support in pdfmaker