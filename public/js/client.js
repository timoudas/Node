console.log('Client-side code running');

const button = document.getElementById('dropdownMenuButton');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
});

const seasonId = document.getElementById('seasonId').value;
console.log(seasonId.value)
