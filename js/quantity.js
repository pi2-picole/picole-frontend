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
    
    var firstNumber = $('#firstNumber').val()
    var secondNumber = $('#secondNumber').val()
    var thirdNumber = $('#thirdNumber').val()
    var fourthNumber = $('#fourthNumber').val()
    var ccv = $('#ccv').val()
    var expirationDate =  $('#month').val()+$('#year').val()
    var brand = $('#brand').val()

    var crediCardNumber =  firstNumber+secondNumber+thirdNumber+fourthNumber

    console.log(totalPrice, crediCardNumber)

    $.ajax({
        url: "http://picole-pi2.herokuapp.com/purchases/",
        data:{
        "machine_id": 1,
        "popsicles": [
            { "amount":parseInt($('#quantity0').val()), "popsicle_id": 1 },
            { "amount":parseInt($('#quantity1').val()), "popsicle_id": 2 },
            { "amount":parseInt($('#quantity2').val()), "popsicle_id": 3 },
            { "amount":parseInt($('#quantity3').val()), "popsicle_id": 4 }
         ]
        },
        "cielo_data": {
            "MerchantOrderId":"1091935197",
            "Payment":{
                "Type":"CreditCard",
                "Amount":totalPrice,
                "Installments":1,
                "CreditCard":{
                    "CardNumber":crediCardNumber,
                    "ExpirationDate":expirationDate,
                    "SecurityCode": ccv,
                    "Brand": brand
                }   
            }
         },
        type: "POST",
        success: function(data) { alert('Sucesso!'+ data ); },
        error: function(erro) { alert('Erro!'); 
        console.log(erro);}
    });
}

