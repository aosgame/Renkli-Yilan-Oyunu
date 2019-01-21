$(function(){//kodlar sayfa tamamen yüklendikten sonra çalışacak

    var svg=Pablo('#ground').svg({
        width:1095,
        height:690
    });

    var dugumDizisi=new Array();
    var dugumBoyutu=15;

    var renkDizisi=new Array("#f7d794","#778beb","#c44569","#63cdda","#e15f41");
    var renkIndex=0;

    var yon=1;

    yilanOlustur(4,300,300);
    var yemek;
    var yemekX;
    var yemekY;

    var yemekKontrol=1;
    var yilanX;
    var yilanY;

    var hiz=200;

    //yemekOlustur();
    

    setInterval(function(){
        yilaniHareketEttir();
        yemekYe();
    },hiz);

    

    function yilanOlustur(dugum,x,y){
        for(var i=0;i<dugum;i++){

            var renkIndex=Math.floor(Math.random()*5)
            var yilanDugumu=svg.rect({
                x:x,y:y,
                width:dugumBoyutu,height:dugumBoyutu,
                fill:renkDizisi[renkIndex],
                stroke:'#006',
                'stroke-width':2,
                'stroke-linejoin':'round'
            });
            x=x+dugumBoyutu;
            dugumDizisi.push(yilanDugumu);
        }
    }

    function yemekOlustur(){

        yemekX=Math.floor((Math.random()*67)+1)*15;//1100
        yemekY=Math.floor((Math.random()*45)+1)*15;//700

        yemek=svg.rect({
            x:yemekX,y:yemekY,
            width:dugumBoyutu,height:dugumBoyutu,
            fill:'#2345f6',
            stroke:'#006',
            'stroke-width':2,
            'stroke-linejoin':'round'
        });

        return yemek;
    }

    function yemekYe(){

        if(yemekKontrol==1){
            yemek=yemekOlustur();
            yemekKontrol=0;
            yemekX=yemek.attr('x');
            yemekY=yemek.attr('y');
        }

        yilanX=dugumDizisi[dugumDizisi.length-1].attr('x');
        yilanY=dugumDizisi[dugumDizisi.length-1].attr('y');

        if(yilanX==yemekX && yilanY==yemekY){
            yemek.remove();
            yemekKontrol=1;

            var yilanDugumu=svg.rect({
                x:yilanX,y:yilanY,
                width:dugumBoyutu,height:dugumBoyutu,
                fill:renkDizisi[renkIndex],
                stroke:'#006','stroke-width':2,'stroke-linejoin':'round'

            });

            dugumDizisi.push(yilanDugumu);
            yilanDugumu=yilanDugumu+1;

        }

    }

    
    function yilaniHareketEttir(){

        var x;
        var y;

        x=dugumDizisi[dugumDizisi.length-1].attr('x');
        y=dugumDizisi[dugumDizisi.length-1].attr('y');

        if(yon==1){
            x=parseInt(x)+dugumBoyutu;
        }
        if(yon==2){
            y=parseInt(y)+dugumBoyutu;
        }
        if(yon==3){
            x=parseInt(x)-dugumBoyutu;
        }
        if(yon==4){
            y=parseInt(y)-dugumBoyutu;
        }

        var renkIndex=Math.floor(Math.random()*5)
        var yilanDugumu=svg.rect({
            x:x,y:y,
            width:dugumBoyutu,height:dugumBoyutu,
            fill:renkDizisi[renkIndex],
            stroke:'#006',
            'stroke-width':2,
            'stroke-linejoin':'round'
        });

        dugumDizisi[0].remove();
        dugumDizisi.shift();

        dugumDizisi.push(yilanDugumu);
    }

    $(document).keydown(function(event){

        var code=event.which;

        if(yon==1||yon==3){
            if(code==38) yon=4;
            if(code==40) yon=2;
        }
        if(yon==2||yon==4){
            if(code==39) yon=1;
            if(code==37) yon=3;
        }
    })

    
})