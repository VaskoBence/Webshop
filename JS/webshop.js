$(function(){
    
    //localstorage tömbök, ellenőrzi hogy üres-e 
    let storage = localStorage.getItem("ItemList");
    let items;

    storage == null ? (items = []) : (items = JSON.parse(storage));

    let cartstorage = localStorage.getItem("CartList");
    let cart;
 
    cartstorage == null ? (cart = []) : (cart = JSON.parse(cartstorage));
    
    //----oldalak betöltése storageból----


    
    //index.html storage-ból való betöltése
    function indexLoad(){
        let container = $('.container');
        if(storage != null){
            for(let i=0;i<items.length;i++){
                container.append("<div class='termek' data-id="+i+"><img src='images/tree1.png'><h2>"+items[i].name+"<span class='tooltip'></span></h2><h5>"+items[i].itemID+"</h5><h3>"+items[i].price+" Ft</h3><p>"+items[i].description+"</p><div>Raktáron: <span class='stock'>"+items[i].quantity+"</span></div><div>Vásárlás:</div><input class='qt' type='number'  value ='0' min='0' max="+items[i].quantity+"><div class="+(items[i].quantity==0 ? "disabled" :"megvesz")+"><img src ='images/carticon.png'></div></div>");
                if(items[i].quantity){

                }
            }    
        }
    container.append("<div class='termekplusz'><a href ='item_upload.html'><img src='images/plus.png'></a><h2>Termék hozzáadása</h2></div>");    
        $('#kosar').prev().text("("+cart.length+")");
    }
    indexLoad();


    //cart.html storage-ból való betöltése
    function cartLoad(){
        let cartelements = $('.cartelements');
        if(cart != null && cart.length!=0){
            for(i=0;i<cart.length;i++){
                cartelements.append("<div class='carttermek'> <div class='cart-name'>"+cart[i].name+"</div> <div class ='cart-id'>"+cart[i].itemID+"</div> <div class='cart-price'>"+cart[i].price+" Ft</div> <div class='cart-qt'>"+cart[i].quantity+" </div> <div class='cart-total'>"+(cart[i].quantity*cart[i].price)+"</div></div>");
            }
        }else{
        cartelements.append("<div class='carttermek'>Jelenleg üres a kosarad!</div>");
        }
    }  
    cartLoad();
    

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


    //----kosárba helyezés----


    //az inputnál figyel, nehogy 0-val kezdd, és hogy ne adj meg többet, mint a maximum érték 
    $(".termek input").keyup(function(){
        let value = $(this).val();
        value = value.replace(/^(0*)/,""); 
        max = $(this).attr('max');
        if(parseInt(value)>parseInt(max)){
            value = max;
        }
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


    //a termék elhelyezése local storageban (CartList)
    $('.termek').on('click','.megvesz',function(){
        let index = $(this).parent().data('id');    // a div index-e
        let itemid = $(this).parent().find('h5').text();   //itemID
        let szerepelt = true;
        // ha többet írsz be, mint amennyi készleten van, akkor hibaüzenet
        if(parseInt($(this).prev().val())>parseInt($(this).prev().attr('max'))){
            console.log(qt, max);
            alert('Ebből a termékből nincs ennyi készleten!');
        }
        // ha 0-t vagy kevesebbet írsz be, akkor is hibaüzenet
        else if(parseInt($(this).prev().val())<=0){
            alert('Ez így nem fog működni! 😔');
        }
        // ha a termék már szerepel a kosaradba, akkor is hibaüzenet
        else{       
            if(cartstorage!=null){
                let i=0;
                while(i<cart.length){
                    if(itemid==cart[i].itemID){
                        alert("Ez a termék már szerepel a kosaradban! 😔");
                        szerepelt = false;
                    }
                i++;
                } 
            }
            // ha a kosár üres, vagy a termék nem szerepel a kosaradban, akkor a kosárba helyezi a terméket
            if(cartstorage == null || szerepelt == true){
                cart.push(items[index]);
                cart[cart.length-1].quantity = parseInt($(this).prev().val());
                localStorage.setItem("CartList", JSON.stringify(cart));
                alert("A terméke(ke)t a kosaradba helyeztük! :)");
                $('#kosar').prev().text("("+cart.length+")");
            }
        }   
    })
});

