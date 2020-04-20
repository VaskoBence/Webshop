$(function(){
    let x = 0;
    let myCart=[];
    let kosar = {

            nev:"",
            ar:0,
            leiras:"",
            raktaron:0,
            kosarban:0
    }
    $(".kosar").on('click','.kosardel',function(){
        $(this).parent().parent().remove();
        x--;
        $('.kosar').find('p').text('('+(x)+')');
    });

    $("main").on('click','.megvesz',function(){
        let nev =$(this).prev().prev().html();
        let ar =$(this).prev().html();
        x++;
        $(".kosar").find('p').text('('+(x)+')');
        $(".kosardropdown").append("<div><ul><li></li><li></li><li class='kosardel'>X</li>");
       $(".kosardropdown").children().last('div').find('li').first().html(nev);
       $(".kosardropdown").children().last('div').find('li').first().next().html(ar);
    });

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


    //mennyiség kiválasztása
    $('.termek').on('click','.minusqt',function(){
        let x= $(this).next().attr('value');
        min = $(this).next().attr('min');
            if(x-1<min){
             $(this).next().attr('value',min);
            }
            else{
                $(this).next().attr('value',x-1);
            }
    });
    $('.termek').on('click','.plusqt',function(){
        let x= parseInt($(this).prev().attr('value'));
        max = $(this).prev().attr('max');
            if(x+1>max){
                $(this).prev().attr('value',max);
            }
            else{
                $(this).prev().attr('value',x+1);
            }
    })
    //termék megvétele
    $('.termek').on('click','.megvesz',function(){
        console.log( $(this).prev().prev().text().splice());
        let nev = $(this).prev().prev().prev().prev().text();
        let ar = $(this).prev().prev().prev().text();
        myCart.push(new kosar('',12000,'',2,5));
        console.log(myCart[myCart.length-1]);
        myCart[myCart.length-1]
    })
    //termék hozzáadása
    $('.termekplusz').on('click','termekplusz img',function(){
        
    });
    $('.termek input').on('change',function(){
        if($(this).val()>=$(this).attr('max')){
            $(this).val($(this).attr('max'));
        }
    });
});
