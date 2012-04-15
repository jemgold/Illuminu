var store = window.localStorage;

hslify = function(el,h,s,l){
	// console.log(h,s,l);
	// var h,s,l;
	if(h === null) {
		h = 0;
	}

	if (s === null) {
		s = 50;
	}

	if (l === null) {
		l = 50;
	}

	hsl = h+","+s+"%,"+l+"%";
	chsl = "hsl("+hsl+")";
	// console.log(chsl);
	el.css({
		background:chsl
	});
};

initColors = function(){
	$('ul li').each(function(i){
		me = $(this).children('div');
		myid = me.attr('id');
		if (store[myid] === null) {
			// alert('null!');
			// console.log(store[myid]);
			hslify(me,0);
		} else{
			var pos = store[myid];
			var parent = $(this).width();
			h = pos/parent;
			hh = Math.round(h*360);
			hhh = Math.min(Math.max(0,hh),360);
			backToNormal(me,hhh);
			me.css({left:pos});
		}
	});
};

var paletteIt = function(){
	colors = {};
	for (var i = 0; i <= 8; i++) {
		var randomCol = Math.round(Math.random() * 360);
		var colPos = (randomCol/360) * ($('ul li').width()-100);
		console.log(colPos);
		$('#palette').append("<div id='"+randomCol+"'></div>");
		$('#'+randomCol).attr('data-pos',colPos);
		hslify($('#'+randomCol),randomCol);
		colors[i] = randomCol;
	}
	// console.log(colors);

	$('ul li').on('click','div', function(e){
		cousins = $(this).parent().siblings().children('div');
		cousins.animate({opacity:0}, 200);
		var active = $(this);
		$('#palette').on('click', 'div', function(e){
			// $(this).attr('id');
			var newcol = $(this).attr('id');
			var newpos = $(this).attr('data-pos');
			hslify(active,newcol);
			active.animate({left:newpos});
			cousins.animate({opacity:1}, 200);
		});
		//TODO: fix jankiness!;
	});
};

var changeCol = function(h) {
	hh = Math.round(h*360);
	hhh = Math.min(Math.max(0,hh),360);
	hslify($('#frame'),hhh);
};

var backToNormal = function(element,hue) {
	hslify($('#frame'),0,0,0);
	hslify(element,hue);
};

$(document).ready(function() {
	initColors();
	paletteIt();

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
			var parent = $(this).parent().width();
			hue = pos/parent;
			changeCol(hue);
		},
		stop: function(e,ui){
			var el = $(this);
			backToNormal(el,hhh);
			cousins = $(this).parent().siblings().children('div');
			cousins.animate({opacity:1}, 200);
			pos = ui.position.left;
			console.log(pos);
			// Todo: fix out of bounds
			// if (pos < 0) {
			// console.log('too far left!');
			// };
			// if
			var elid = el.attr('id');
			store[elid] = pos;
		}
	});
});