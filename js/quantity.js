$(document).ready(function(){
var quantitiy=0;
   $('.quantity-right-plus').click(function(e){
        
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity').val());
                    
            $('#quantity').val(quantity + 1);        
    });
     $('.quantity-left-minus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        var quantity = parseInt($('#quantity').val());
                    // Increment
            if(quantity>0){
                $('#quantity').val(quantity - 1);
            }
    });
    
});