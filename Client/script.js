$(document).ready(function()
{	
	var baseAddress = "http://127.0.0.1:5000";

	
	$("#btn1").click(function(){
		var eid = document.getElementById('ID2').value;
		$.post(baseAddress + "/searchEmployee",
		{
			ID: eid
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n name: " + data.name +
				  "\n surname: " + data.surname +
				  "\n address: " + data.address +
				  "\n city: " + data.city +
				  "\n level: " + data.level +
				  "\n salary: " + data.salary +
				  "\n Status: " + status);
		},
		"json");
	});

	$("#btn2").click(function(){
		var eid = document.getElementById('ID3').value;
		alert(eid);
		$.post(baseAddress + "/deleteEmployee",
		{
			ID: eid
		},
		function(data, status){
			alert("ID: " + data.ID + 
				  "\n name: " + data.name +
				  "\n surname: " + data.surname +
				  "\n address: " + data.address +
				  "\n city: " + data.city +
				  "\n level: " + data.level +
				  "\n salary: " + data.salary +
				  "\n Status: " + status);
		},
		"json");
	});

	$("#btn4").click(function(){
		var eid = document.getElementById('ID').value;
		var name = document.getElementById('realname').value;
		var surname = document.getElementById('realsurname').value;
		var address = document.getElementById('adress').value;
		var city = document.getElementById('city').value;
		var salary = document.getElementById('salary').value;
		var level = "99";

		$.post(baseAddress + "/insertEmployee",
		{
			ID: eid,
			Name: name,
			Surname: surname,
			Address: address,
			City: city,
			Level: level,
			Salary: salary
		},
		function(data, status){
			alert("A new employee has been add: " + data +
				  "\n Status: " + status);
		},
		"json");
	});

	$("#btn6").click(function(){
		var eid = document.getElementById('ID').value;
		var name = document.getElementById('realname').value;
		var surname = document.getElementById('realsurname').value;
		var address = document.getElementById('adress').value;
		var city = document.getElementById('city').value;
		var salary = document.getElementById('salary').value;
		var level = "99";

		$.post(baseAddress + "/changeEmployee",
		{
			ID: eid,
			Name: name,
			Surname: surname,
			Address: address,
			City: city,
			Level: level,
			Salary: salary
		},
		function(data, status){
			alert("A new employee has been change: " + data +
				  "\n Status: " + status);
		},
		"json");
	});

	$("#btn5").click(function(){
		var elevel = document.getElementById('level').value;

		$.post(baseAddress + "/searchLevel",
		{
			level : elevel
		},
		function(data, status){
			alert("Employee: " + data +
				  "\n Status: " + status);
		},
		"json");
	});
	
});