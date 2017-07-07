var popsiclesArray = []
var totalPrice = 0

var amountChocolate = 0
var amountCoco = 0
var amountMorango = 0
var amountLeiteCondensado = 0

$(document).ready(function(){
   $('#button0-plus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity0').val())
        price = $('#flavor0').text()
        var flavor0 = $('#flavor0')
            $('#quantity0').val(quantity + 1)
            amountCoco += 1
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
                var amount = $('#quantity0').val(quantity - 1)
                amountCoco += -1
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
            amountChocolate += 1
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
                amountChocolate += -1
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
            amountMorango += 1
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
                amountMorango += -1
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
            amountLeiteCondensado += 1
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
                amountLeiteCondensado += -1
                totalPrice -= parseValue(price)
                $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
                localStorage.setItem("totalPrice", totalPrice)
            }
    })
})

function checkAmount(){
    if (amountChocolate > 0){
        popsiclesArray.push( { "amount":amountChocolate, "flavor": "Chocolate", "price": "250", "popsicle_id": 1 })
    }
    if (amountCoco > 0){
        popsiclesArray.push( { "amount":amountCoco, "flavor": "Coco", "price": "150", "popsicle_id": 2 })
    }
    if (amountMorango > 0){
        popsiclesArray.push( { "amount":amountMorango, "flavor": "Morango", "price": "100", "popsicle_id": 3 })
    }
    if (amountLeiteCondensado > 0){
        popsiclesArray.push( { "amount":amountLeiteCondensado, "flavor": "Leite Condensado", "price": "250", "popsicle_id": 4 })
    }

    console.log(popsiclesArray)
}

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
    checkAmount()
    var data = {
    "machine_id": getMachineID(),
    "popsicles": popsiclesArray
     }
    $.ajax({
        url: "https://picole-pi2.herokuapp.com/purchases/",
        data: JSON.stringify(data),
        type: "POST",
        traditional: true,
        beforeSend: function(xhr){
             xhr.setRequestHeader('Content-Type', 'application/json')
        },
        success: function(data) {window.location.replace(data.url); localStorage.setItem('purchases',data.purchases)},
        error: function(erro) {console.log(erro)}
        })
}

    function getMachineID(){
         var id = document.getElementById('myModalLabel').innerHTML
         id = id.split(' ')
        return id[0]
    }