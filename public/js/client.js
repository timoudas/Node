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
        console.log(text)
        $('#seasonDropDownMenyButton').text(text); // Using .html in jQuery big NO NO: https://medium.com/@jenlindner22/the-risk-of-innerhtml-3981253fe217, switched to .text
    });

    //Post request to update league table
    $.ajax({
        type: 'POST',
        url: '/table?' + $.param({ seasonValue: value}),
        data: jQuery.param({seasonValue: value}),
        success: (filteredSeasonValues) => {
            console.log("result: ")
            console.log(filteredSeasonValues)
           
            $('#league-table-rows').empty();
            for(let i = 0; i < 20; i++) {
                let filteredTr = filteredSeasonValues[i]
                let newHtml = `<tr>
                <td>${filteredTr.position}</td>
                <td>${filteredTr.team_shortName}</td>
                <td>${filteredTr.overall_played}</td>
                <td>${filteredTr.overall_won}</td>
                <td>${filteredTr.overall_draw}</td>
                <td>${filteredTr.overall_lost}</td>
                <td>${filteredTr.overall_goalsFor}</td>
                <td>${filteredTr.overall_goalsAgainst}</td>
                <td>${filteredTr.overall_goalsDifference}</td>
                <td>${filteredTr.overall_points}</td>
                </tr>`

                $('#league-table-rows').append(newHtml)
            }
           
        },
    })
});


$('#homeAwayToggle').bind('click', function(event) {
    let value = event.target.value
    $.post('/table/:id', { homeAwayValue: value });
})
