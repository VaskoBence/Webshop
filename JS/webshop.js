$(function(){
    
    //localstorage tömbök, ellenőrzi hogy üres-e 
    let storage = localStorage.getItem("ItemList");
    let items;
    let nevek = ["Wc papír","Kéz fertőtlenítő","Orvosi maszk","Kesztyű","Kenyér","Gyógyszer","Menőbb wc papír","Szappan","Tej","kéz hidratáló"];
    // kezdő tömb, ha üres az egész
    let startitems = [];
    for(let i=0;i<10;i++){
        let item ={
            id: i,
            name: nevek[i],
            quantity: ((Math.floor(Math.random() * 50) + 1)*10),
            itemID: ("#"+(Math.floor(Math.random() * 1000) + 0)),
            price: (((Math.floor(Math.random() * 100) + 1)*10)-1),
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu venenatis ante, at rhoncus purus. Donec quis placerat leo."
            }
        startitems.push(item);
    }
    storage == null ? (items=startitems) : (items = JSON.parse(storage));
    localStorage.setItem('ItemList', JSON.stringify(items));



    let cartstorage = localStorage.getItem("CartList");
    let cart;
    cartstorage == null ? (cart = []) : (cart = JSON.parse(cartstorage));
    
    //----oldalak betöltése storageból----


    
    //index.html storage-ból való betöltése
    function indexLoad(){
        let container = $('.container');
        if(storage != null){
            for(let i=0;i<items.length;i++){
                // néhány random kép
                let kep = "images/placeholder.jpg";
                console.log(items[i].name);
                if(items[i].name.toLowerCase().includes("maszk")){
                    kep = "images/maszk.jpg";
                }
                else if(items[i].name.toLowerCase().includes("menőbb")){
                    kep = "images/menobbwc.jpg";
                }
                else if(items[i].name.toLowerCase().includes("wc")){
                    kep = "images/wcpapir.jpg";
                }
                else if(items[i].name.toLowerCase().includes("kéz")){
                    kep = "images/kezfert.jpg";
                }
                else if(items[i].name.toLowerCase().includes("kesztyű")){
                    kep = "images/kesztyu.jpg";
                }
                else if(items[i].name.toLowerCase().includes("gyógyszer")){
                    kep = "images/gyogyszer.jpg";
                }
                else if(items[i].name.toLowerCase().includes("kenyér")){
                    kep = "images/kenyer.jpg";
                }
                else if(items[i].name.toLowerCase().includes("szappan")){
                    kep = "images/szappan.jpg";
                }
                else if(items[i].name.toLowerCase().includes("tej")){
                    kep = "images/tej.jpg";
                }
                
                container.append("<div class='termek' data-id="+items[i].id+"> <div  class='delete'><img src='images/binicon.png'></div><img src="+kep+"><h2>"+items[i].name+"<span class='tooltip'></span></h2><h5>"+items[i].itemID+"</h5><h3>"+items[i].price+" Ft</h3><p>"+items[i].description+"</p><div>Raktáron: <span class='stock'>"+items[i].quantity+"</span></div><div>Vásárlás:</div><input class='qt' type='number'  value ='0' min='0' max="+items[i].quantity+"><div class="+(items[i].quantity==0 ? "disabled" :"megvesz")+"><img src ='images/carticon.png'></div></div>");
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
                cartelements.append("<div class='carttermek' data-id="+cart[i].id+"> <div class='cart-name'>"+cart[i].name+"</div> <div class ='cart-id'>"+cart[i].itemID+"</div> <div class='cart-price'>"+cart[i].price+" Ft</div> <div class='cart-qt'><input value ="+cart[i].quantity+" max ="+cart[i].quantity+" type='number'><button>Frissít</button></div> <div class='cart-total'>"+(cart[i].quantity*cart[i].price)+" Ft</div><div  class='cartdelete'><img src='images/binicon.png'></div></div>");
            }
            cartelements.append();
        }else{
        cartelements.append("<div class='carttermek'>Jelenleg üres a kosarad!</div>");
        }
        let ossz = 0;
        for(let i=0;i<cart.length;i++){
            ossz=ossz+(cart[i].quantity*cart[i].price);
        }
        $('.cartfooter div').text('Összesen: ' +ossz+ ' Ft');
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
    $(".cart-qt input").keyup(function(){
        let value = $(this).val();
        value = value.replace(/^(-1*)/,""); 
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
        let index;
        let id = $(this).parent().data('id');    // a div id-je
        for(let i=0;i<items.length;i++){
            console.log(items[i].id);
            if(id === items[i].id){
                index = i;
            }
        }
        let szerepelt = true;
        // ha többet írsz be, mint amennyi készleten van, akkor hibaüzenet
        if(parseInt($(this).prev().val())>parseInt($(this).prev().attr('max'))){
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
                    if(id==cart[i].id){
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

    // termékek törlése (index.html, items)
        $(".delete").on('click',function(){
            let id = parseInt($(this).parent().attr('data-id'));
            if(confirm("Biztosan törölni szeretnéd ezt az elemet?")){
                $(this).parent().remove();
                for(let i=0;i<items.length;i++){
                    if(items[i].id === id){
                        items.splice(i,1);
                    }
                }
                for(let i=0;i<cart.length;i++){
                    if(cart[i].id === id){
                        cart.splice(i,1);
                    }
                }
                localStorage.setItem('ItemList', JSON.stringify(items));
                localStorage.setItem('CartList', JSON.stringify(cart));
            }
        })


    // törlés kosárból  (cart.html, cart)
        $(".cartdelete").on('click',function(){
            let id = parseInt($(this).parent().attr('data-id'));
            if(confirm("Biztosan törölni szeretnéd a kosárból ezt az elemet?")){
                $(this).parent().remove();
                for(let i=0;i<cart.length;i++){
                    if(cart[i].id === id){
                        cart.splice(i,1);
                    }
                }
                localStorage.setItem('CartList', JSON.stringify(cart));
                
            }
        })


    // frissítés gomb
        $(".carttermek").on('click','.cart-qt button',function(){
            let qt = parseInt($(this).prev().val());
            if(qt === 0){
                //ugyanaz mint a törlés
                let id = parseInt($(this).parent().parent().attr('data-id'));
                $(this).parent().parent().remove();
                for(let i=0;i<cart.length;i++){
                    if(cart[i].id === id){
                        cart.splice(i,1);
                    }
                }
                localStorage.setItem('CartList', JSON.stringify(cart));
            }
            else if(qt>0){
                let id = parseInt($(this).parent().parent().attr('data-id'));
                for(let i=0;i<cart.length;i++){
                    if(cart[i].id === id){
                        cart[i].quantity = qt;
                        let ar = cart[i].price;
                        $(this).parent().next().text( (ar*qt)+" Ft");
                    }
                }
                localStorage.setItem('CartList', JSON.stringify(cart));
            }
            let ossz = 0;
            for(let i=0;i<cart.length;i++){
                ossz=ossz+(cart[i].quantity*cart[i].price);
            }
            $('.cartfooter div').text('Összesen: ' +ossz+ ' Ft');
        })


    // vásárlás gomb
        $('.cartfooter button').on('click', function(){
            if(confirm("Biztos meg szeretnéd vásárolni?")){
            alert("Köszönjük a vásárlást!");
            for(let i=0;i<cart.length;i++){
                for(let j=0;j<items.length;j++){
                    if(items[j].id === cart[i].id){
                        items[j].quantity = (items[j].quantity - cart[i].quantity);
                    }
                }
            }
            location.reload(); //oldal újra betöltése
            localStorage.removeItem("CartList");
            localStorage.setItem('ItemList', JSON.stringify(items));         
        }
        })

        //kereső funkció
        $('#searchbar input').keyup(function(){
            let input = $(this).val().toLowerCase();  
            for (i = 0; i < items.length; i++) {  
                if (!items[i].name.toLowerCase().includes(input)) {
                   li= document.getElementsByClassName('termek');
                   li[i].style.display = "none";
                }
                else { 
                    li[i].style.display = "block";              
                } 
            } 
        })

        
        // MARADJANAK OTTHON
        let audioElement = document.createElement('audio'); // audio változó
        audioElement.setAttribute('src', 'maradjotthon.mp3');    //audiofájl megadása  
        $('#pause').on('click',function(){  
            $(this).css('background-color','rgba(255,0,0,0.5)');
            $('#play').css('background-color','rgba(0,255,0,0)');
            audioElement.pause();   // háttérszín, zene szüneteltetése
        })
        $('#play').on('click',function(){
            $(this).css('background-color','rgba(0,255,0,0.5)');
            $('#pause').css('background-color','rgba(255,0,0,0)');
            audioElement.play();    //háttérszín, zene lejátszása
        })
        $('#volume').on('change',function(){
            let val = $(this).val();
            audioElement.volume=val/100;
        })
});

