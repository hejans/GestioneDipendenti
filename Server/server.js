//lib express
var express = require ('express');
//general lib
var app = express();
//inspect
var util = require('util');
//Cross-Origin Resource Sharing (CORS), used for enabling pre-flight option
cors = require('cors');

//student manager
var employeeManager = require('./EmployeeManager.js');

//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());// JSON

//set up the server
app.set('port', (process.env.PORT || 5000));
//enable pre-flight authoriuzation
app.options('*', cors());

/**
 * @brief returns a static welcome page.
 * @return a static page.
 */
app.get('/', function(request, response) 
{
	var headers = {};
	//answer
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end("OK! Server works correctly.");
});

/**
 * @brief returns the list of students
 * @return a static page.
 */
app.get('/showList', function(request, response) 
{
	var headers = {};
	headers["Content-Type"] = "text/html";
	response.writeHead(200, headers);
	response.end(JSON.stringify(employeeManager.getList()));
});

app.post('/deleteEmployee', function(request,response){

	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var empID;
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
		if ( typeof request.body.ID !== 'undefined' && request.body.ID)
            {
			 empID = request.body.ID;
            }
		else 
			empID = "not defined";
	
	}
	else
	{
		empID = "body undefined";
	}

	var employee;
	
    if (empID!="not defined" && empID!="body undefined")
	{
		//aceptable input
		//delete a student using ID
		employee = employeeManager.deleteEmployeeID(empID);
		if (employee!= null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(employee));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}

	}
    else    
		{
        	//unaceptable input
        	response.writeHead(406, headers);
			response.end(JSON.stringify("1"));
		}   


});

app.post('/searchEmployee', function(request, response) 
{
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var empID;
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
		if ( typeof request.body.ID !== 'undefined' && request.body.ID)
            {
			 empID = request.body.ID;
            }
		else 
			empID = "not defined";
	
	}
	else
	{
		empID = "body undefined";
	}
    
    if (empID!="not defined" && empID!="body undefined")
	{
		//aceptable input
		//search for a employee
		var employee = employeeManager.searchEmployeeID(empID);
		//if exists
		if (employee != null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(employee));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}

	}
    else    
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}   

});

/**
 * @brief add a student
 * @return add a student to the list of employee
 */
app.post('/insertEmployee', function(request, response) 
{	
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var eID;
	var eName
	var eSurname
	var eAddress;
	var eCity;
	var eLevel;
	var eSalary;
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
		if ( typeof request.body.ID !== 'undefined' && request.body.ID &&
			 typeof request.body.Name !== 'undefined' && request.body.Name &&
			 typeof request.body.Surname !== 'undefined' && request.body.Surname &&
			 typeof request.body.Address !== 'undefined' && request.body.Address &&
			 typeof request.body.City !== 'undefined' && request.body.City &&
			 typeof request.body.Level !== 'undefined' && request.body.Level &&
			 typeof request.body.Salary !== 'undefined' && request.body.Salary
		   )
            {
			 eID = request.body.ID;
			 eName = request.body.Name;
			 eSurname = request.body.Surname;
			 eAddress = request.body.Address;
			 eCity = request.body.City;
			 eLevel = request.body.Level;
			 eSalary = request.body.Salary;
            }
		else 
			eID = "not defined";
	}
	else
	{
		eID = "body undefined";
	}
    
    if (eID!="not defined" && eID!="body undefined")
	{
		//aceptable input
		//create the student object
		var employee = {
			ID: eID,
			name: eName,
			surname: eSurname,
			address: eAddress,
			city: eCity,
			level: eLevel,
			salary: eSalary
		}
		
		//if insertion works correctly
		if (employeeManager.insertEmployee(employee))
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(employee.name));
		}
		else
		{
			response.writeHead(400, headers);
			response.end(JSON.stringify());
		}

	}
    else    
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}   

});

/**
 * @brief add a student
 * @return add a student to the list of employee
 */
app.post('/changeEmployee', function(request, response) 
{	
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var eID;
	var eName
	var eSurname
	var eAddress;
	var eCity;
	var eSalary;
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
		if ( typeof request.body.ID !== 'undefined' && request.body.ID)
            {
			 eID = request.body.ID;
            }
		else {

			eID = "not defined";
	}
		if( typeof request.body.Name !== 'undefined' && request.body.Name){

			eName = request.body.Name;
		}
		else{

			eName = "not defined";
		}

		if( typeof request.body.Surname !== 'undefined' && request.body.Surname){

			eSurname = request.body.Surname;
		}
		else{

			eSurname = "not defined";
		}
		if( typeof request.body.Address !== 'undefined' && request.body.Address){

			eAddress = request.body.Address;
		}
		else{

			eAddress = "not defined";
		}
		if( typeof request.body.City !== 'undefined' && request.body.City){

			eCity = request.body.City;
		}
		else{

			eCity = "not defined";
		}
		if( typeof request.body.Salary !== 'undefined' && request.body.Salary){

			eSalary = request.body.Salary;
		}
		else{

			eSalary = "not defined";
		}



	}
	else
	{
		eID = "body undefined";
	}
    
    if (eID!="not defined" && eID!="body undefined")
	{
		//aceptable input
		//create the employee object
		var employee = {
			ID: eID,
			name: eName,
			surname: eSurname,
			address: eAddress,
			city: eCity,
			level: "not defined",
			salary: eSalary
		}
		
		//if insertion works correctly
		if (employeeManager.changeEmployee(employee))
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(employee.name));
		}
		else
		{
			response.writeHead(400, headers);
			response.end(JSON.stringify());
		}

	}
    else    
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}   

});

app.post('/searchLevel', function(request, response) 
{
	var headers = {};
	headers["Access-Control-Allow-Origin"] = "*";
	headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
	headers["Access-Control-Allow-Credentials"] = false;
	headers["Access-Control-Max-Age"] = '86400'; // 24 hours
	headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
	headers["Content-Type"] = "application/json";

	var elevel;
	
	//check body and parameters
	if ( typeof request.body !== 'undefined' && request.body)
	{
		if ( typeof request.body.level !== 'undefined' && request.body.level)
            {
			 elevel = request.body.level;
            }
		else 
			elevel = "not defined";
	
	}
	else
	{
		elevel = "body undefined";
	}
    
    if (elevel!="not defined" && elevel!="body undefined")
	{
		//aceptable input
		//search for a employee
		var list = employeeManager.searchLevel(elevel);
		//if exists
		if (list != null)
		{
			response.writeHead(200, headers);
			response.end(JSON.stringify(list));
		}
		else
		{
			response.writeHead(404, headers);
			response.end(JSON.stringify());
		}

	}
    else    
	{
		//unaceptable input
		response.writeHead(406, headers);
		response.end(JSON.stringify("1"));
	}   

});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});