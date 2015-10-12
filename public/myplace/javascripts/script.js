//lets try~~~~~~
//alert('lets try ~~~~ how can you know it when you dont even try!!');

var height = $('#myFace').css('height');
var entries;
var ID;
var loginBtn = $('template#login').html();
var logoutBtn = $('template#logout').html();

var checkStatus = function(){
	if(localStorage.id == undefined){
		console.log('no cache');
		return false;
	}
	else return true;	
};


if(typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
	ID = localStorage.id;
} else {
    // Sorry! No Web Storage support..
};



var topleft = function() {	
	$(this).animate({
		'top': '2.5%',
		'left': '1%',	
		'margin': '0px',
		'z-index' : '-2',
		'height' : '95%'
	},500);
	$('#headshot').animate({		
		'height': '100px',
		
	}, 500,function(){
		$('#back').show(400);
	});
	
	panelIn();
}

var reverse = function(){
	panelOut();
	$('#myFace').animate({
		'left': '50%',
		'margin-left': '-250px',
		'top': '50%',
		'margin-top': '-100px',
		'z-index' : '1',
		'height': height,		
	},500);
	$('#headshot').animate({
		'height': height
	}, 500, function(){
		$('#back').hide(400);
	});
}

var panelIn = function(){
	$('#panel').show();
	$('#panel').animate({
		'right': '0px',
		'opacity': '1'
	},400,loadEntries);
}

var panelOut = function(){
	$('#panel').animate({
		'right': '-10%',
		'opacity' : '0'
	},400,function(){
		$(this).hide();
	});
}

var loadEntries = function(){
	if(entries == undefined){
		$.ajax({
			url: 'http://thirdtry.cloudapp.net:28017/test/projects/',
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'jsonp', // mongod is expecting the parameter name to be called "jsonp"
			success: function (data) {
				console.log('success', data.rows[0].title);
				entries = "<div id = 'in'> </div>" ;
				$('#panel').append(entries);
				for(var i in data.rows){
					var entry = "<div class ='panel panel-default'><div class='panel-heading'> <h3 class = 'panel-title'>"
								+ data.rows[i].title + " </h3></div>"
								+ "<div class='panel-body'>  " + data.rows[i].description 
								"  </div></div>";
					$('div#in').append(entry);
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				console.log('error', errorThrown);
			}
		});
	}
};

var logIn_sign = function(){
	if($('.container').is(":visible")){
		$('.container').hide();
	}
	else {
		$('.container').show();
	}
}


var logout = function(){
		localStorage.removeItem('id');
		changeBtn();
		$('#showLoginDiv').append(' | new user'); 
	};

var changeBtn = function(){
	$('#btn-area').html(function(){
		if(!checkStatus()){
			return loginBtn;
		}
		else return logoutBtn;
	});
}
$(document).ready(function(){
	changeBtn();
	if(ID != undefined){
		console.log(ID);
		$('#log_out').append(' | ' +ID);
	};
	$('#myFace').click(topleft);
	$('#back').click(reverse);
	//$('#showLoginDiv').click(logIn_sign);
	$('#enter').click(logIn);
	//$('p#logout').click(logout());
});