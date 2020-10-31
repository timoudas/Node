console.log('Client-side code running');
$(function(){

    $('#season-toggle').bind('click', function(event) {
        let value = event.target.value
        $('#season-toggle').bind('click', function(event) {
            let text = event.target.textContent
            $('#seasonDropDownMenyButton').html(text);
        });
        $.post('/table', { seasonValue: value }, () => {
            console.log('POST request with data: ' + value + ' was sucessfully sent.')
            location.reload();
        

        });
    });
});

$('#homeAwayToggle').bind('click', function(event) {
    let value = event.target.value
    $.post('/table', { homeAwayValue: value }, () => {
      console.log('POST request with data: ' + value + ' was sucessfully sent.')
      location.reload();
    });
})
