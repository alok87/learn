/*!
 * jQuery-ajaxTransport-XDomainRequest - v1.0.2 - 2014-05-02
 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
 * Copyright (c) 2014 Jason Moon (@JSONMOON)
 * Licensed MIT (/blob/master/LICENSE.txt)
 */
(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){if($.support.cors||!$.ajaxTransport||!window.XDomainRequest){return}var n=/^https?:\/\//i;var o=/^get|post$/i;var p=new RegExp('^'+location.protocol,'i');$.ajaxTransport('* text html xml json',function(j,k,l){if(!j.crossDomain||!j.async||!o.test(j.type)||!n.test(j.url)||!p.test(j.url)){return}var m=null;return{send:function(f,g){var h='';var i=(k.dataType||'').toLowerCase();m=new XDomainRequest();if(/^\d+$/.test(k.timeout)){m.timeout=k.timeout}m.ontimeout=function(){g(500,'timeout')};m.onload=function(){var a='Content-Length: '+m.responseText.length+'\r\nContent-Type: '+m.contentType;var b={code:200,message:'success'};var c={text:m.responseText};try{if(i==='html'||/text\/html/i.test(m.contentType)){c.html=m.responseText}else if(i==='json'||(i!=='text'&&/\/json/i.test(m.contentType))){try{c.json=$.parseJSON(m.responseText)}catch(e){b.code=500;b.message='parseerror'}}else if(i==='xml'||(i!=='text'&&/\/xml/i.test(m.contentType))){var d=new ActiveXObject('Microsoft.XMLDOM');d.async=false;try{d.loadXML(m.responseText)}catch(e){d=undefined}if(!d||!d.documentElement||d.getElementsByTagName('parsererror').length){b.code=500;b.message='parseerror';throw'Invalid XML: '+m.responseText;}c.xml=d}}catch(parseMessage){throw parseMessage;}finally{g(b.code,b.message,c,a)}};m.onprogress=function(){};m.onerror=function(){g(500,'error',{text:m.responseText})};if(k.data){h=($.type(k.data)==='string')?k.data:$.param(k.data)}m.open(j.type,j.url);m.send(h)},abort:function(){if(m){m.abort()}}}})}));


$(function() {
	var departure_week = $("#outbounds-3-menu .yuimenubaritem .yuimenubaritemlabel").not(".yuimenubaritem-disabled .yuimenubaritemlabel");
	var return_week = $("#inbounds-3-menu .yuimenubaritem .yuimenubaritemlabel").not(".yuimenubaritem-disabled .yuimenubaritemlabel");
	
	var departure_str = "";
	var departure_flights = "";
	var departure_hours = "";
	var going_duration = "";
    var departure_price = "";
    
	var return_str = "";
	var return_flights = "";
	var return_hours = "";
	var return_duration = "";
	var return_price = "";
	
	var currency = "";

	var departure_date = $("#date_hidden0").attr("data-wl-value").split(" ")[0];
	var return_date = $("#date_hidden1").attr("data-wl-value").split(" ")[0];
  
	if (departure_week != null){
		$.each(departure_week, function(key, element) {
			var date = $(element).find(".date").attr("data-wl-date").split(" ")[0];
			currency = currency == "" ? $(element).find(".prices-currency").html() : currency;
			var price = $(element).find(".prices-amount").html();
			if(date != departure_date){
		       departure_str += date + "_" + price + "|";
		    }else if(date == departure_date){
		      departure_price = price;
		      var row = $("#outbounds tr:has(.prices-amount:contains('" + price + "')):first");
		      var departure_hour = $(row).find(".ItinHeaderFrom").children().eq(1).html();
		      var arrival_hour = $(row).find(".ItinHeaderTo").children().eq(1).html();
		      departure_hours = departure_hour + "_" + arrival_hour;
		      going_duration = $(row).find(".ItinHeaderTo").next().children(":last").html();
		      var index = 0;
		      $(row).find(".flight-number").each(function(){
		        var operated_by = $(this).parent().next().children().eq(index++).text().trim();
		        departure_flights += $(this).find("a").text() + "(" + operated_by + ")|";
		      })
		
		    }
		});
	}

	if (return_week != null){
		$.each(return_week, function(key, element) {
			var date = $(element).find(".date").attr("data-wl-date").split(" ")[0];
		    if(date == return_date){
				var price = $(element).find(".prices-amount").html();
				return_str += date + "_" + price + "|";
				return_price = price;
		        var row = $("#inbounds tr:has(.prices-amount:contains('" + price + "')):first");
		        var departure_hour = $(row).find(".ItinHeaderFrom").children().eq(1).html();
		        var arrival_hour = $(row).find(".ItinHeaderTo").children().eq(1).html();
		        return_hours = departure_hour + "_" + arrival_hour;
		        var index = 0;
		        return_duration = $(row).find(".ItinHeaderTo").next().children(":last").html();
		        $(row).find(".flight-number").each(function(){
		          var operated_by = $(this).parent().next().children().eq(index++).text().trim();
		          return_flights += $(this).find("a").text() + "(" + operated_by + ")|";
		        })
		    }
		});
	}

	departure_str = departure_str != "" ? departure_str.slice(0,-1) : "";
	return_str = return_str != "" ? return_str.slice(0,-1) : "";
	
	var origin_airport_code = $("#origin_airport_hidden0") != null ? $("#origin_airport_hidden0").attr("data-wl-value") : "";
	var destination_airport_code = $("#destination_airport_hidden0") != null ? $("#destination_airport_hidden0").attr("data-wl-value") : "";
	var adult_passengers = $("#ADT_id") != null ? $("#ADT_id").attr("data-wl-value") : ""; 
	var child_passengers = $("#CHD_id") != null ? $("#CHD_id").attr("data-wl-value") : ""; 
	
	var journey_type = $('input[name=journey]:checked') != null ? $('input[name=journey]:checked').val() : "";
	
	var cabin = $('[name="cabin"]') != null ? $('[name="cabin"]').attr("data-wl-value") : "";

	var params = "";
	
	var referrer = document.referrer;
	//var referrer = "http://www.etihad.com/en-us/";
	
	if(departure_date != "" && return_date != ""){
	   var re = new RegExp('/', 'g');
	  
	   var start = new Date(departure_date.replace(re,"-"));
	   var end   = new Date(return_date.replace(re,"-"));
	   var diff  = new Date(end - start);
	   var days  = diff/1000/60/60/24;
	    
	   if(days > 1 && days < 31){
		   var departure_hours_arr = departure_hours.split("_");
		   var return_hours_arr = return_hours.split("_");
		   
		   params = "oac=" + origin_airport_code + "&dac=" + destination_airport_code + "&departure_price_list=" + departure_str + "&returning_price_list=" + return_str + "&d_date=" + departure_date + "&r_date=" + return_date;
		   params += "&children=" + child_passengers + "&journey_type=" + journey_type + "&cabin=" + cabin + "&going_departure_time=" + departure_hours_arr[0] + "&going_arrival_time=" + departure_hours_arr[1];
		   params += "&origin_flights=" + departure_flights + "&returning_departure_time=" + return_hours_arr[0] + "&returning_arrival_time=" + return_hours_arr[1] + "&destination_flights=" + return_flights;
		   params += "&going_duration=" + going_duration + "&returning_duration=" + return_duration + "&currency=" + currency + "&referrer=" + referrer + "&trfx_domain=flights.etihad.com"  + "&adults=" + adult_passengers;
		   params += "&departure_price=" + departure_price + "&return_price=" + return_price;
	  }
	}

	if(params != ""){
		$.support.cors = true;

		//var url = "https://script.airtrfx.com/trfx_2/web/booking_stats/";
		//var url = "http://localhost/sf-2.4/trfx_mongo/web/app_dev.php/booking_stats/ey/script";
		//var url = "http://54.169.71.42/booking_data/web/app_dev.php/booking_stats/ey/script";
              //var url = "http://54.169.71.42/booking_data/web/app.php/booking_stats/ey/script";
                var url = "https://www.securitytrfx.com/booking_stats/ey/script";
		
		$.ajax({type: 'POST', url: url, data:params, script:true, cache:false, dataType: 'text',
	
			success: function(data) { 
				//alert(data);
				},
			error: function(data) { 
				
				//alert(data["responseText"]);
				//alert("error");
			}
	
		});
	}
	
})