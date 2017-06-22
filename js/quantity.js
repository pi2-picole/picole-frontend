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
  price = price.replace(/(\d{1})(\d{1,2})$/,"$1,$2") // coloca virgula antes dos ultimos 2 digitos
  return price
}

// function makePayment(){
//     {
//    "MerchantOrderId":"2014111703",
//    "Customer":{
//       "Name":"Comprador crédito simples"
//    },
//    "Payment":{
//      "Type":"CreditCard",
//      "Amount": totalPrice,
//      "Installments":1,
//      "SoftDescriptor":"123456789ABCD",
//      "CreditCard":{
//          "CardNumber":"1234123412341231",
//          "Holder":"Teste Holder",
//          "ExpirationDate":"12/2030",
//          "SecurityCode":"123",
//          "Brand":"Visa"
//      }
//    }
// }
// }