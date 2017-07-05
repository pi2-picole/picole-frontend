// Set the date we're counting down to
var date = new Date();
var countDownDate = new Date();
countDownDate.setHours (date.getHours() + 8 );

// Update the count down every 1 second
var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("hour").innerHTML = hours

    // Output the result in an element with id="demo"
    document.getElementById("minutes").innerHTML = minutes 

		// Output the result in an element with id="demo"
    document.getElementById("seconds").innerHTML =  seconds
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);

        document.getElementById("expire").innerHTML = "EXPIRADO";
    }
}, 1000);

function expire() {
    console.log("clicou")
    clearInterval(x);
    document.getElementById("expire").innerHTML = "EXPIRADO";
    document.getElementById("freeButton").style.display="none"
    freePopsicle()
}

function freePopsicle() {

    console.log(localStorage.getItem('purchases'))
    console.log("Pay FINAL")
    var data = {
         "purchases": localStorage.getItem('purchases')
     }
    $.ajax({
        url: "http://picole-pi2.herokuapp.com/purchases/release/",
        data: JSON.stringify(data),
        type: "POST",
        traditional: true,
        beforeSend: function(xhr){
             xhr.setRequestHeader('Content-Type', 'application/json')
        },
        success: function(data) {console.log(data)},
        error: function(erro) {console.log(erro)} 
        }
    )}
