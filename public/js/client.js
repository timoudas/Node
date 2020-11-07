// Using .html in jQuery big NO NO: https://medium.com/@jenlindner22/the-risk-of-innerhtml-3981253fe217, switched to .text

// Get initial value from filters
var seasonSelection = $('#seasonToggle').children(":first").val()
var typeSelection = $('#homeAwayToggle').children(":first").val()
var MatchweekSelection = $('#homeAwayToggle').children(":first").val()



//Click eventlistner for all filters
const selection = document.querySelectorAll(".dropdown-item");
selection.forEach(element => {
   element.addEventListener('click', pickSelection)
})
function pickSelection(event) {
    switch(event.target.parentElement.id){
        case 'seasonToggle':
            seasonSelection =  event.target.value
            break
        case 'homeAwayToggle':
            typeSelection =  event.target.value
            break
        case 'matchWeekToggle':
            MatchweekSelection =  event.target.value
            break
    }
    $.ajax({
        type: 'GET',
        url: '/table?' + $.param({ seasonVal: seasonSelection, 
                                typeVal: typeSelection,
                                matchWeekVal: MatchweekSelection})
        
    })
}




 

//Post request to update league table
// $.ajax({
//     type: 'GET',
//     url: '/table',
//     data: jQuery.param({seasonValue: value,
//                         homeAwayValue: }),
//     success: (filteredSeasonValues) => {
//         console.log("result: ")
//         console.log(filteredSeasonValues)
        
//         $('#league-table-rows').empty();
//         for(let i = 0; i < 20; i++) {
//             let filteredTr = filteredSeasonValues[i]
//             let newHtml = `<tr>
//             <td>${filteredTr.position}</td>
//             <td>${filteredTr.team_shortName}</td>
//             <td>${filteredTr.played}</td>
//             <td>${filteredTr.won}</td>
//             <td>${filteredTr.drawn}</td>
//             <td>${filteredTr.lost}</td>
//             <td>${filteredTr.goalsFor}</td>
//             <td>${filteredTr.goalsAgainst}</td>
//             <td>${filteredTr.goalsDifference}</td>
//             <td>${filteredTr.points}</td>
//             </tr>`

//             $('#league-table-rows').append(newHtml)
//         }
        
//     },
// })


// //Get value/text from season-toggle
// $('#season-toggle').bind('click', function(event) {
//     let value = event.target.value
//     $('#season-toggle').bind('click', function(event) {
//         let text = event.target.textContent
//         console.log(text)
//         $('#seasonDropDownMenyButton').text(text); // Using .html in jQuery big NO NO: https://medium.com/@jenlindner22/the-risk-of-innerhtml-3981253fe217, switched to .text
//     });

//     //Post request to update league table
//     $.ajax({
//         type: 'POST',
//         url: '/table?' + $.param({ seasonValue: value}),
//         data: jQuery.param({seasonValue: value}),
//         success: (filteredSeasonValues) => {
//             console.log("result: ")
//             console.log(filteredSeasonValues)
           
//             $('#league-table-rows').empty();
//             for(let i = 0; i < 20; i++) {
//                 let filteredTr = filteredSeasonValues[i]
//                 let newHtml = `<tr>
//                 <td>${filteredTr.position}</td>
//                 <td>${filteredTr.team_shortName}</td>
//                 <td>${filteredTr.played}</td>
//                 <td>${filteredTr.won}</td>
//                 <td>${filteredTr.drawn}</td>
//                 <td>${filteredTr.lost}</td>
//                 <td>${filteredTr.goalsFor}</td>
//                 <td>${filteredTr.goalsAgainst}</td>
//                 <td>${filteredTr.goalsDifference}</td>
//                 <td>${filteredTr.points}</td>
//                 </tr>`

//                 $('#league-table-rows').append(newHtml)
//             }
           
//         },
//     })
// });



