$('#teaser_container .teasers').each(function(i,e){
    $(e).addClass('item_' + i);
});

var teaserSlider = {
    clickable: true,
    teaserWidth: $('#teaser_container').width(),
    interval: '',
    countTeaser : $('.teasers').length,
    currentTeaser : 0,
    nextTeaser : function(){
        var from = this.currentTeaser;

        if( (this.currentTeaser+1) < this.countTeaser){
            this.currentTeaser++;
        }else{
            this.currentTeaser=0;
        }
        this.gotoTeaser(from,this.currentTeaser,'left');
    },
    prevTeaser : function(){
        var from = this.currentTeaser;
        if( this.currentTeaser > 0){
            this.currentTeaser--;
        }else{
            this.currentTeaser = this.countTeaser -1;
        }
        this.gotoTeaser(from,this.currentTeaser,'right');
    },
    gotoTeaser : function(from,to,dir){

        display_methode = $('.item_' + to + ' img').attr("rel");

        $('#teaser_navigation .navigation').removeClass('active');
        $('#teaser_navigation .navigation[rel='+to+']').addClass('active');

        if( display_methode == 'fadeIn' ){
            teaserSlider.fadeTeaser(from,to);
        }else{
            teaserSlider.slideTeaser(from,to,dir);
        }

        this.currentTeaser = to;
    },
    fadeTeaser : function(from,to){
        $('.item_' + to).css({"display" : "none" , "left": "0px" , "top": "0px"});
        $('.item_' + from).css({"left": "0px" , "top": "0px"});
        $('.item_' + to ).fadeIn(2000,function(){
            teaserSlider.clickable = true;
        });
        $('.item_' + from ).fadeOut(2000,function(){
            teaserSlider.clickable = true;
        });
    },
    slideTeaser : function(from,to,dir){

        if( dir == 'right' ){
            $('.item_' + to).css({"display" : "block" ,"left": "-"+teaserSlider.teaserWidth+"px"});
            $('.item_' + from).css({"left": "0px"});
            $('.item_' + from ).animate({"left": "+="+teaserSlider.teaserWidth+"px"}, "slow");
            $('.item_' +to ).animate({"left": "+="+teaserSlider.teaserWidth+"px"}, "slow",function(){
                teaserSlider.clickable = true;
            });
        }else{
            $('.item_' + to).css({"display" : "block" , "left": ""+teaserSlider.teaserWidth+"px"});
            $('.item_' + from).css({"left": "0px"});
            $('.item_' + from).animate({"left": "-="+teaserSlider.teaserWidth+"px"}, "slow");
            $('.item_' +to ).animate({"left": "-="+teaserSlider.teaserWidth+"px"}, "slow",function(){
                teaserSlider.clickable = true;
            });
        }
    }
};

if( $('.teasers').length > 1 ){
    $( $('.teasers').get() ).each(function(index,element){
        var pos = $('.teasers').length - index;
        $('<a rel="'+(pos-1)+'" href="#" class="navigation"><span>'+(pos)+'</span></a>').appendTo('#teaser_navigation');
    });
    $('.navigation[rel=0]').addClass('active');
    teaserSlider.interval = setInterval("teaserSlider.nextTeaser()",6000);
    $('#teaser_container_out .navigation').click(function(event){
        event.preventDefault();
        clearInterval(teaserSlider.interval);
        if( teaserSlider.clickable == true ){
            //  teaserSlider.clickable = false;
            if( teaserSlider.currentTeaser != $(event.currentTarget).attr('rel') ){
                teaserSlider.gotoTeaser(teaserSlider.currentTeaser,$(event.currentTarget).attr('rel') ,'left');
            }
        }
        return false;
    });
}

if( $('.slideshow-previous').length > 0 ){

    $('.slideshow-previous').click(function(event){
        event.preventDefault();
        teaserSlider.prevTeaser();
    });

}
if( $('.slideshow-next').length > 0 ){

    $('.slideshow-next').click(function(event){
        event.preventDefault();
        teaserSlider.nextTeaser();
    });

}


if( $('.teasers').length > 0 ) {
    teaserSlider.gotoTeaser(-1, 0, 'left');
}