
$( "#x1" ).click(function() {
    $.get('https://openexchangerates.org/api/currencies.json', function(data) {
        console.log(data);
    });
});