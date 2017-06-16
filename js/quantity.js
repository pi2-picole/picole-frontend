$(document).ready(function(){
var quantitiy=0;
   $('#button1-plus').click(function(e){
        
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity1').val());
                    
            $('#quantity1').val(quantity + 1);        
    });
     $('#button1-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity1').val());
                    // Increment
            if(quantity>0){
                $('#quantity1').val(quantity - 1);
            }
    });
    $('#button2-plus').click(function(e){
        
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity2').val());
                    
            $('#quantity2').val(quantity + 1);        
    });
     $('#button2-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity2').val());
                    // Increment
            if(quantity>0){
                $('#quantity2').val(quantity - 1);
            }
    });
    $('#button3-plus').click(function(e){
        
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity3').val());
                    
            $('#quantity3').val(quantity + 1);        
    });
     $('#button3-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity3').val());
                    // Increment
            if(quantity>0){
                $('#quantity3').val(quantity - 1);
            }
    });
    $('#button4-plus').click(function(e){
        
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity4').val());
                    
            $('#quantity4').val(quantity + 1);        
    });
     $('#button4-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity4').val());
                    // Increment
            if(quantity>0){
                $('#quantity4').val(quantity - 1);
            }
    });
    $('#button5-plus').click(function(e){
        
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity5').val());
                    
            $('#quantity5').val(quantity + 1);        
    });
     $('#button5-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity5').val());
                    // Increment
            if(quantity>0){
                $('#quantity5').val(quantity - 1);
            }
    });
        $('#button6-plus').click(function(e){
        
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity6').val());
                    
            $('#quantity6').val(quantity + 1);        
    });
     $('#button6-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity6').val());
                    // Increment
            if(quantity>0){
                $('#quantity5').val(quantity - 1);
            }
    });
});


//post dos sabores

function postPurchase(){
    console.log("EEEEEEEEEEEEEEE olar")

    var machineId = 1
    var popsicleId = 10
    var amount = 2
    var flavor = "Milho Verde"

    if (amount !== 0){
        console.log("entrei no if")
        $.ajax({
        url: "https://picole-pi2.herokuapp.com/purchases/",
        data: JSON.stringify({
            "machine_id": machineId,
            "popsicles": [
                { "amount":amount, "flavor": flavor, "price": "134", "popsicle_id": popsicleId },
                { "amount":amount, "flavor": flavor, "price": "134", "popsicle_id": popsicleId }
            ]})
        ,
        contentType: "application/json",
        type: "POST",
        success: function(teste) { alert('Sucesso!' ); },
        error: function(error) { console.log(error.responseText); alert('Erro!'); }
        });
    }else{
        console.log("Não há picoles deste sabor no estoque")
    }
}
