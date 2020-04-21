$(function(){
    
    let storage = localStorage.getItem("ItemList");
    let items;
    // Check if the local storage is empty
    storage == null ? (items = []) : (items = JSON.parse(storage));

    let cartstorage = localStorage.getItem("CartList");
    let cart;
    //ellenőrzi, hogy üres-e a local storage
    cartstorage == null ? (cart = []) : (cart = JSON.parse(cartstorage));
  
 
    // tooltip a túl hosszú címeknek
    $('.termek h2').on('mouseover',function(){
        if($(this)[0].offsetWidth < $(this)[0].scrollWidth){
            $(this).find('.tooltip').text("");
            $(this).find('.tooltip').text($(this).text());
        $(this).find('.tooltip').css('visibility','visible');
        }
    });
    $('.termek h2').on('mouseleave',function(){
        $(this).find('.tooltip').css('visibility','hidden');
    });

     /* localStorage.setItem("myCart", JSON.stringify(cartItems));
    function displayCartItems(){
        let cartItems = localStorage.getItem("myCart");
        cartItems = JSON.parse(cartItems);
        let cartElements = $(".cartelements");
        if(cartItems && cartElements){
            console.log("running");
        }

    }*/ 


    

    //----kosárba helyezés----

    //vigyázok rád, nehogy 0-val kezdd az inputod 
    $(".termek input").keyup(function(){
        var value = $(this).val();
        value = value.replace(/^(0*)/,"");
        $(this).val(value);
    });

    //kosárba helyezés gomb animációja
    $('.termek').on('mouseenter','.megvesz',function(){
        $(this).find('img').attr('src',' ');
        $(this).text('Kosárba tesz');
     })
     $('.termek').on('mouseleave','.megvesz',function(){
         $(this).text('');
         $(this).html('<img src ="images/carticon.png"></img>');
     })

    //local storageban elhelyezés
    $('.termek').on('click','.megvesz',function(){
       
        if($(this).prev().val()>$(this).prev().attr('max')){
            alert('Ebből a termékből nincs ennyi készleten!');
        }
        else if($(this).prev().val()<=0){
            alert('Ez így nem fog működni! ☺');
        }
        else{
            let index = $(this).parent().data('id');
            console.log(index);
            cart.push(items[index]);
            console.table([cart[index]]);
            localStorage.setItem("CartList", JSON.stringify(cart));
            localStorage.clear();
        }
    })
});
