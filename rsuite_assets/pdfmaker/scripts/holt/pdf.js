function getAllElementsWithAttribute(tag, attribute, value)
{
  var matchingElements = [];
  var allSections = document.getElementsByTagName(tag);
  for (var i = 0; i < allSections.length; i++)
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
  var illoSources = document.querySelectorAll("figure p[class*='Credit-LineCrd']");
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
    var sectionHead = " ";

    var runHeadLeft = document.createElement("div");
    var runHeadLeftSpan = document.createElement("span");
    runHeadLeft.setAttribute("class", "runheadleft");
    var textnode = document.createTextNode("BKMKRINSERTBKTITLE");

    while (section.tagName != "SECTION" && section.tagName != "NAV" && section.tagName != "DIV" && i < 10) {
      var section = section.parentNode;
      i++;
    };

    var sectionType = section.getAttribute('data-type');
    if (sectionType == "preface" || sectionType == "toc" || sectionType == 'appendix') {
      if (section.getElementsByTagName('h1')[0] != null) {
        var sectionHead = section.getElementsByTagName('h1')[0].textContent;
      };
      textnode = document.createTextNode(sectionHead);
    };

    if (sectionType == "chapter") {
      if (section.getElementsByClassName('TitleTtl')[0] != null) {
        var sectionHead = section.getElementsByClassName('TitleTtl')[0].textContent;
      } else if (section.getElementsByClassName('NumberNum')[0] != null) {
        var sectionHead = section.getElementsByClassName('NumberNum')[0].textContent;
      };
      if (sectionHead.length < 4 && sectionHead.match(/^[0-9]+$/) != null) {
        sectionHead = "Chapter " + sectionHead;
      };
      textnode = document.createTextNode(" ");
    };

    if (sectionType == "part") {
      if (section.getElementsByClassName('TitleTtl')[0] != null) {
        var sectionHead = section.getElementsByClassName('TitleTtl')[0].textContent;
      } else if (section.getElementsByClassName('NumberNum')[0] != null) {
        var sectionHead = section.getElementsByClassName('NumberNum')[0].textContent;
      };
      if (sectionHead.length < 4 && sectionHead.match(/^[0-9]+$/) != null) {
        sectionHead = "Part " + sectionHead;
      };
      textnode = document.createTextNode(" ");
    };

    runHeadLeftSpan.appendChild(textnode);
    runHeadLeft.appendChild(runHeadLeftSpan);
    thisParent.parentNode.insertBefore(runHeadLeft, thisParent.nextSibling);

    var runHeadRight = document.createElement("div");
    var runHeadRightSpan = document.createElement("span");
    runHeadRight.setAttribute("class", "runheadright");
    runHeadRightSpan.textContent=sectionHead;
    runHeadRight.appendChild(runHeadRightSpan);
    thisParent.parentNode.insertBefore(runHeadRight, thisParent.nextSibling);
  };
};

function fullpageFigures() {
  var allIllos = document.getElementsByTagName('img');
  var fullpageFigs = [];
  for (var h = 0; allIllos.length > h; h++) {
    var illoType = allIllos[h].getAttribute('src');
    if (illoType.indexOf("fullpage") > -1)
    {
      fullpageFigs.push(allIllos[h]);
    };
  };
  for (var f = 0; fullpageFigs.length > f; f++) {
    // let's also delete the runhead elements prceding the figure
    var parentFig = fullpageFigs[f].parentNode;
    var runHeadLeft = document.createElement("div");
    var textnode = document.createTextNode(" ");
    runHeadLeft.setAttribute("class", "runheadleft");
    runHeadLeft.appendChild(textnode);
    var runHeadRight = document.createElement("div");
    var textnode = document.createTextNode(" ");
    runHeadRight.setAttribute("class", "runheadright");
    runHeadRight.appendChild(textnode);
    var runFoot = document.createElement("div");
    var textnode = document.createTextNode(" ");
    runFoot.setAttribute("class", "runfoot");
    runFoot.appendChild(textnode);
    parentFig.setAttribute("class", "Image-PlacementImg fullpage");
    parentFig.insertBefore(runHeadLeft,parentFig.firstChild);
    parentFig.insertBefore(runHeadRight,parentFig.firstChild);
    parentFig.insertBefore(runFoot,parentFig.firstChild);
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