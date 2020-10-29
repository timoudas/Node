console.log('Client-side code running');

// With JQuery, gather all dropdown-items, take their value and crate POST ajax request.
$('.dropdown-item').click(function() {
  let value = $(this).val()
  $.post('/', { value: value }, () => {
    console.log('POST request with data: ' + value + ' was sucessfully sent.')
  })
})
