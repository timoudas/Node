// Using .html in jQuery big NO NO: https://medium.com/@jenlindner22/the-risk-of-innerhtml-3981253fe217, switched to .text

// Get initial value from filters
var seasonSelection = $('#seasonToggle').children(":first").val()
var typeSelection = $('#homeAwayToggle').children(":first").val()
var MatchweekSelection = $('#homeAwayToggle').children(":first").val()
var leagueTableUpdateTimeStamp = 0


$('#updateDataButton').bind('click', function(event){
    console.log(event.timeStamp)
    $.ajax({
        type: 'POST',
        url: '/table',
        success: () => {
            console.log('success')
            window.location = "/";
        }
        
    })
});
//Click eventlistner for home-page player stats
const homeTable = document.querySelectorAll(".stats-item");
homeTable.forEach(element => {
    element.addEventListener('click', homeTableToggle)
})
function homeTableToggle(event){
    var queryVal = event.target.value
    console.log(queryVal)
    if (queryVal == 1){
        $.ajax({
            type: 'POST',
            url: '/?' + $.param({ statsType: queryVal}),
            success: (newVals) => {   
                $('#stats-placehld').text("AvgPlayTime")
                $('#stats-placehld1').text("AvgPasses")
                console.log($('#stats-placehld1').textContent)
                $('#playerStatsAvg').empty();
                for(let i = 0; i < 50; i++) {
                    let filteredTr = newVals[i]
                    let newHtml = `<tr>
                    <td>${filteredTr.name}</td>
                    <td>${filteredTr.teamName}</td>
                    <td>${filteredTr.position}</td>
                    <td>${filteredTr.averagePlaytime}</td>
                    <td>${filteredTr.averagePasses}</td>
                    </tr>`
    
                    $('#playerStatsAvg').append(newHtml)
                }
            }
        })
    } else if (queryVal == 2){
        $.ajax({
            type: 'POST',
            url: '/?' + $.param({ statsType: queryVal}),
            success: (newVals) => {     
                $('#stats-placehld').text("AvgShots")
                $('#stats-placehld1').text("AvgOnTarget")  
                $('#playerStatsAvg').empty();
                for(let i = 0; i < 50; i++) {
                    let filteredTr = newVals[i]
                    let newHtml = `<tr>
                    <td>${filteredTr.name}</td>
                    <td>${filteredTr.teamName}</td>
                    <td>${filteredTr.position}</td>
                    <td>${filteredTr.averageShotsPerGame}</td>
                    <td>${filteredTr.averageShotsOnTarget}</td>
                    </tr>`
    
                    $('#playerStatsAvg').append(newHtml)
                }
            }
        })
    }

}


//Click eventlistner for all table-filters
const selection = document.querySelectorAll(".dropdown-item");
selection.forEach(element => {
   element.addEventListener('click', pickSelection)
})
function pickSelection(event) {
    let text = ""
    switch(event.target.parentElement.id){
        case 'seasonToggle':
            text = event.target.textContent
            $('#seasonvalue').text(text)
            seasonSelection =  event.target.value
            break
        case 'homeAwayToggle':
            text = event.target.textContent
            $('#typevalue').text(text)
            typeSelection =  event.target.value
            break
        case 'matchWeekToggle':
            text = event.target.textContent
            $('#matchDropDownMenyButton').text(text)
            MatchweekSelection =  event.target.value
            break
    }
    //Get request for
    $.ajax({
        type: 'POST',
        url: '/table?' + $.param({ seasonVal: seasonSelection, 
                                typeVal: typeSelection,
                                matchWeekVal: MatchweekSelection}),
   success: (filteredSeasonValues) => {          
            $('#league-table-rows').empty();
            for(let i = 0; i < 20; i++) {
                let filteredTr = filteredSeasonValues[i]
                let newHtml = `<tr>
                <td>${i+1}</td>
                <td><img src='badges/${filteredTr.team_shortName}.png' />
                ${filteredTr.team_shortName}</td>
                <td>${filteredTr.played}</td>
                <td>${filteredTr.won}</td>
                <td>${filteredTr.drawn}</td>
                <td>${filteredTr.lost}</td>
                <td>${filteredTr.goalsFor}</td>
                <td>${filteredTr.goalsAgainst}</td>
                <td>${filteredTr.goalsDifference}</td>
                <td>${filteredTr.points}</td>
                </tr>`

                $('#league-table-rows').append(newHtml)
            }
        }
    })
}
