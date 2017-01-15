//list of employee
//list of objects
var employeeList = [
    {
		ID: "1",
		name: "Andrea", 
		surname: "Rossi",
		address: "via Roma 32",
        city: "Verona",
		level: "5",
		salary: "2000"
	},
    {
		ID: "2",
		name: "Valentina", 
		surname: "Bianchi",
		address: "via Venezia 62",
        city: "Vicenza",
		level: "21",
		salary: "1345"
	},
	{
		ID: "3",
		name: "Mirko", 
		surname: "Verdi",
		address: "via Fiume 21",
        city: "Trento",
		level: "3",
		salary: "3250"
	},
];

/**
 * @brief This function search for a employee, given his ID
 * @param StringID
 */
var searchEmployeeID = function searchEmployeeID(ID)
{
    for (i=0; i < employeeList.length; i++)
	{
		if (employeeList[i].ID == ID)
		{
			return employeeList[i];
		}
	}
    //if reach this point return null
    return null;
}

/**
* @brief This function search for a employee, given the type and the param
* @param StringID
*/

var search = function search(types, param)
{
	for(i=0; i < employeeList.length; i++)
	{
		if(employeeList[i].types == param)
		{
			return employeeList[i];
		}
	}
	//if reach this point return null
	return null;
}

/**
 * @brief getter of the list of user
 * @return the list of user
 */
var getList = function getList(){
    return employeeList;
}

/**
 * @brief This function delete for a employee, given his ID
 * @param StringID
 * @return true if the employee is deleted, false if the employee does not exist
 */
var deleteEmployeeID = function deleteEmployeeID(ID)
{
	var position = null;
	
    //search for the position
    for (i=0; i < employeeList.length; i++)
	{
            if (employeeList[i].ID == ID)
                {
					position = i;
                }
        }
	
    //if is not found return null
	if (position == null)
    	return null;
	else
	{
		return employeeList.splice(position, 1)[0];
	}
}

/**
 * @brief This function add a new employee
 * @param Object
 * @return true if the employee is added, false if the employee id already in database
 */
var insertEmployee = function insertEmployee(newemployee)
{
	if (searchEmployeeID(newemployee.ID)==null)
	{
		employeeList.push(newemployee);
		return true;
	}
	else
		return false;
}

var changeEmployee = function changeEmployee(oldemployee){


	if (searchEmployeeID(oldemployee.ID)!=null)
	{
		for(i=0; i < employeeList.length; i++){
			

			if(employeeList[i].ID == oldemployee.ID){

				if(oldemployee.name != 'not defined'){
					employeeList[i].name = oldemployee.name;
				}
				if(oldemployee.surname != 'not defined'){
					employeeList[i].surname = oldemployee.surname;
				}
				if(oldemployee.address != 'not defined'){
					employeeList[i].address = oldemployee.address;
				}
				if(oldemployee.city != 'not defined'){
					employeeList[i].city = oldemployee.city;
				}
				if(oldemployee.salary != 'not defined'){
					employeeList[i].salary = oldemployee.salary;
				}
			}
		}
		return true;
	}
	else
		return false;

}

var searchLevel = function searchLevel(level){
     
     var list = [];
     var opr = level.slice(0,1);
     var lvl = parseInt(level.slice(1));

     if(opr == ">"){
          for(i=0; i < employeeList.length; i++){

          	if(parseInt(employeeList[i].level) > lvl)
          		list.push(employeeList[i].name);
          }
     }

     if(opr == "<"){
          for(i=0; i < employeeList.length; i++){

          	if(parseInt(employeeList[i].level) < lvl)
          		list.push(employeeList[i].name);
          }
     }
      
      return list;
    
}

//export functions
exports.searchEmployeeID = searchEmployeeID; 
exports.search = search; 
exports.deleteEmployeeID = deleteEmployeeID; 
exports.insertEmployee = insertEmployee;  
exports.getList = getList; 
exports.changeEmployee = changeEmployee;
exports.searchLevel = searchLevel;