var popsiclesArray = []
var totalPrice = 0

var amountSecond = 0
var amountFirst = 0
var amountThird = 0
var amountFourth = 0

var firstFlavor = ''
var secondFlavor = ''
var thirdFlavor = ''
var fourth = ''

$(document).ready(function(){
   $('#button0-plus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity0').val())
        price = $('#flavor0').text()
        var flavor0 = $('#flavor0')
            $('#quantity0').val(quantity + 1)
            amountFirst += 1
            totalPrice += parseValue(price)
            $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
            localStorage.setItem("totalPrice", totalPrice)
            firstFlavor = parseFlavorName($('#flavor0').text()) 

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
                amountFirst += -1
                totalPrice -= parseValue(price)
                $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
                localStorage.setItem("totalPrice", totalPrice)
                firstFlavor = parseFlavorName($('#flavor0').text())
            }
    })
    $('#button1-plus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity1').val())
        price = $('#flavor1').text()
            $('#quantity1').val(quantity + 1)
            amountSecond += 1
            totalPrice += parseValue(price)
            $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
            localStorage.setItem("totalPrice", totalPrice)
            secondFlavor = parseFlavorName($('#flavor1').text())
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
                amountSecond += -1
                totalPrice -= parseValue(price)
                $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
                localStorage.setItem("totalPrice", totalPrice)
                secondFlavor = parseFlavorName($('#flavor1').text())
            }
    })
    $('#button2-plus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity2').val())
        price = $('#flavor2').text()

            $('#quantity2').val(quantity + 1)
            amountThird += 1
            totalPrice += parseValue(price)
            $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
            localStorage.setItem("totalPrice", totalPrice)
            thirdFlavor = parseFlavorName($('#flavor2').text())
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
                amountThird += -1
                totalPrice -= parseValue(price)
                $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
                localStorage.setItem("totalPrice", totalPrice)
                thirdFlavor = parseFlavorName($('#flavor2').text())
            }
    })
    $('#button3-plus').click(function(e){
        // Stop acting like a button
        e.preventDefault()
        // Get the field name
        var quantity = parseInt($('#quantity3').val())
        price = $('#flavor3').text()

            $('#quantity3').val(quantity + 1)
            amountFourth += 1
            totalPrice += parseValue(price)
            $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
            localStorage.setItem("totalPrice", totalPrice)
            fourthFlavor = parseFlavorName($('#flavor3').text())

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
                amountFourth += -1
                totalPrice -= parseValue(price)
                $('#totalPrice').text('Total R$:'+ formatPrice(totalPrice))
                localStorage.setItem("totalPrice", totalPrice)
                fourthFlavor = parseFlavorName($('#flavor3').text())
            }
    })
})

function checkAmount(){
    if (amountFirst > 0){
        popsiclesArray.push( { "amount":amountFirst, "flavor": firstFlavor, "price": "150", "popsicle_id": 2 })
        console.log('maracuja -  '+firstFlavor)
    }
     if (amountSecond > 0){
        popsiclesArray.push( { "amount":amountSecond, "flavor": secondFlavor, "price": "250", "popsicle_id": 1 })
        console.log('skimo '+secondFlavor)
    }
    if (amountThird > 0){
        popsiclesArray.push( { "amount":amountThird, "flavor": thirdFlavor, "price": "150", "popsicle_id": 3 })
        console.log('limao '+thirdFlavor)
    }
    if (amountFourth > 0){
        popsiclesArray.push( { "amount":amountFourth, "flavor": fourthFlavor, "price": "200", "popsicle_id": 4 })
        console.log('leite '+fourthFlavor)
    }

    console.log('AAAA'+popsiclesArray)
}

function parseValue(price){
    price = price.split("$")
    price = parseFloat(price[1].replace(/,/g, ''))
    return price
}

function parseFlavorName(name){
    name = name.split('R')
    return name[0]
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
     console.log(data)
    $.ajax({
        url: "https://picole-pi2.herokuapp.com/purchases/",
        data: JSON.stringify(data),
        type: "POST",
        traditional: true,
        beforeSend: function(xhr){
             xhr.setRequestHeader('Content-Type', 'application/json')
        },
        success: function(data) {
            window.location.replace(data.url)
            localStorage.setItem('buy', true)
            localStorage.setItem('purchases',data.purchases)},
        error: function(erro) {console.log(erro)}
        })
}

    function getMachineID(){
         var id = document.getElementById('myModalLabel').innerHTML
         id = id.split(' ')
        return id[0]
    }