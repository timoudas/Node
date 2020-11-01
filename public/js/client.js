// console.log('Client-side code running');
// $(function(){

//     $('#season-toggle').bind('click', function(event) {
//         let value = event.target.value
//         $('#season-toggle').bind('click', function(event) {
//             let text = event.target.textContent
//             $('#seasonDropDownMenyButton').html(text);
//         });
//         $.post('/table/:id', { seasonValue: value }, (data) =>{
//             console.log(data)
//         });
//     });
// });

//Get value/text from season-toggle
$('#season-toggle').bind('click', function(event) {
    let value = event.target.value
    $('#season-toggle').bind('click', function(event) {
        let text = event.target.textContent
        $('#seasonDropDownMenyButton').html(text);
    });

    //Post request to update league table
    $.ajax({
        type: 'POST',
        url: '/table/:id',
        data: jQuery.param({seasonValue: value}),
        success: function (result) {
            console.log(result)
            var source   = $('#season-html').html();
            var template = Handlebars.compile(source);
            var html = template(result);
            $('#league-table-rows').html(html);
        },
    })
});


$('#homeAwayToggle').bind('click', function(event) {
    let value = event.target.value
    $.post('/table/:id', { homeAwayValue: value });
})
