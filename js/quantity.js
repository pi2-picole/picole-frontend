$(document).ready(function(){

var total=0
var totalPrice = 0

   $('#button0-plus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity0').val())
        price = $('#flavor0').text()

        var flavor0 = $('#flavor0')
            $('#quantity0').val(quantity + 1)
            total+= 1
            totalPrice += parseValue(price)
            $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
            localStorage.setItem("totalPrice", totalPrice)

    })
     $('#button0-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity0').val())
        price = $('#flavor0').text()
                    // Increment
            if(quantity>0){
                $('#quantity0').val(quantity - 1)
                total += -1
                totalPrice -= parseValue(price)
                $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
                localStorage.setItem("totalPrice", totalPrice)
            }
    })
    $('#button1-plus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity1').val())
        price = $('#flavor1').text()

            $('#quantity1').val(quantity + 1)
            total += 1
            totalPrice += parseValue(price)
            $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
            localStorage.setItem("totalPrice", totalPrice)
    })
     $('#button1-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity1').val())
        price = $('#flavor1').text()
                    // Increment
            if(quantity>0){
                $('#quantity1').val(quantity - 1)
                total += -1
                totalPrice -= parseValue(price)
                $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
                localStorage.setItem("totalPrice", totalPrice)
            }
    })
    $('#button2-plus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity2').val())
        price = $('#flavor2').text()

            $('#quantity2').val(quantity + 1)
            total += 1
            totalPrice += parseValue(price)
            $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
            localStorage.setItem("totalPrice", totalPrice)

    })
     $('#button2-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity2').val())
        price = $('#flavor2').text()
                    // Increment
            if(quantity>0){
                $('#quantity2').val(quantity - 1)
                total += -1
                totalPrice -= parseValue(price)
                $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
                localStorage.setItem("totalPrice", totalPrice)
            }
    })
    $('#button3-plus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity3').val())
        price = $('#flavor3').text()

            $('#quantity3').val(quantity + 1)
            total += 1
            totalPrice += parseValue(price)
            $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
            localStorage.setItem("totalPrice", totalPrice)

    })
     $('#button3-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity3').val())
        price = $('#flavor3').text()
                    // Increment
            if(quantity>0){
                $('#quantity3').val(quantity - 1)
                total += -1
                totalPrice -= parseValue(price)
                $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
                localStorage.setItem("totalPrice", totalPrice)
            }
    })
})

function parseValue(price){
    price = price.split("$")
    price = parseFloat(price[1].replace(/,/g, ''))
    return price
}

function formatPrice(price){
  price = price.toString()
  price = price.replace(/(\d{1})(\d{1,2})$/,"$1,$2")
  return price
}

function pay(){
    console.log("Pay")
    var data = {
    "machine_id": 1,
    "popsicles": [
                { "amount":1, "flavor": "Morango", "price": "150", "popsicle_id": 1 }
            ]
     }
    $.ajax({
        url: "http://picole-pi2.herokuapp.com/purchases/",
        data: JSON.stringify(data),
        type: "POST",
        traditional: true,
        beforeSend: function(xhr){
             xhr.setRequestHeader('Content-Type', 'application/json')
        },
        success: function(data) {window.location.replace(data.url);},
        error: function(erro) {console.log(erro)} 
        }
    )}
