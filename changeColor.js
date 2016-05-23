var originIdx = 0;
var colors = [
    [ '#1e6823', '#44a340', '#8cc665', '#d6e685', '#eee' ],
    [ '#ff5675', '#ff6a89', '#ff88a7', '#ff9cbb', '#ffb0cf' ],
    [ '#0064ff', '#1478ff', '#3296ff', '#46aaff', '#5abeff' ],
];

var updateColors = function(newIdx) {
  var originColors = colors[originIdx];
  var newColors = colors[newIdx];
  for (var i = 0; i < originColors.length; i += 1) {
      $('.day[fill='+originColors[i] + ']').attr('fill', newColors[i]);
      $('ul.legend li[style="background-color: '+originColors[i]+'"]').css('background-color', newColors[i]);
  }
  originIdx = newIdx;
  localStorage.colorGit = newIdx;
}

// Initialize
var idx = localStorage.colorGit;
if (idx === undefined) { idx = 0; }
idx *= 1;

$('#js-pjax-container').bind("DOMSubtreeModified", function() {
  if ($('.contributions-tab').length == 1) {
      try { updateColors(idx); } catch(err) { }
  }
});

updateColors(idx);

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) { 
  var value = request.value * 1;
  updateColors(value);
});

