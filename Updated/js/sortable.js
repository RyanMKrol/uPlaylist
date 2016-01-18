function setSortable() {
  $( "#listContent" ).sortable({
    handle: ".handle_content",
    revert: 75,
    scrollSensitivity: 100,
    scrollSpeed: 10,
    stop: elementDropped,
  });
  $( "#listContent" ).disableSelection();
}

function elementDropped(event, ui){
  $('.position_text').each(function(key,val){
    $(val).html(padNum(key));
  });
}
