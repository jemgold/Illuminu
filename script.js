
var hslify = function(el,h,s,l){
	// console.log(h,s,l);
	var h,s,l;
	if(h == null) {
		h = 0;
	}

	if (s == null) {
		s = 50;
	}

	if (l == null) {
		l = 50;
	}

	hsl = h+","+s+"%,"+l+"%";
	chsl = "hsl("+hsl+")";
	// console.log(hsl);
	el.css({
		background:chsl
	});
}

var changeCol = function(h) {
	hh = Math.round(h*360);
	hhh = Math.min(Math.max(0,hh),360);
	hslify($('ul'),hhh);
	// sv = ", 50%, 50%";
	// // console.log(hhh+sv);
	// $('body').css({
	// 	background:"hsl("+hhh+sv+")"
	// });
}

var backToNormal = function(element) {
	hslify($('ul'),0,0,20);
	// $('body').css({
	// 	background:"hsl(0,0%,85%)"
	// });
	// element.css({
	// 	background:"hsl("+hhh+sv+")"
	// });
	hslify(element,hhh);
}

$(document).ready(function() {
	$('ul li div').draggable({
		axis:'x',
		containment:'parent',
		cursorAt: {
			left:0,
			top:0
		},
		// grid: [10,0],
		start: function(e,ui) {
			$(this).css({background: '#fff'});
			cousins = $(this).parent().siblings().children('div');
			cousins.animate({opacity:0}, 200);
			// console.log(e,ui);	
		},
		drag: function(e,ui){
			pos = ui.position.left;
			parent = $(this).parent().width();
			hue = pos/parent;
			changeCol(hue);
		},
		stop: function(e,ui){
			var el = $(this);
			backToNormal(el);
			cousins = $(this).parent().siblings().children('div');
			cousins.animate({opacity:1}, 200);
		},
	});
});
