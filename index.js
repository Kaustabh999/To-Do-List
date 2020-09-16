 // itemJsonArray2 = [1,2,3,4];
        // localStorage.setItem('items', JSON.stringify(itemJsonArray2));
        function getAndUpdate(){
            console.log("Updating List...");
            tit = document.getElementById("title").value;
            desc = document.getElementById("description").value;
            if(localStorage.getItem('itemsJson') == null){
                itemJsonArray = [];
                itemJsonArray.push([tit, desc]);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray)); // The JSON.stringify() method converts a JavaScript object or value to a JSON string.
            }
            else{
                itemJsonArrayStr = localStorage.getItem('itemsJson');
                itemJsonArray = JSON.parse(itemJsonArrayStr); //The JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string.
                itemJsonArray.push([tit, desc]);
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            }
            update();
        }    
        function update(){
            if(localStorage.getItem('itemsJson') == null){
                itemJsonArray = [];
                localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
            }
            else{
                itemJsonArrayStr = localStorage.getItem('itemsJson');
                itemJsonArray = JSON.parse(itemJsonArrayStr);
            }
            // Populate the table
            let tableBody = document.getElementById("tableBody");
            let str = "";
            itemJsonArray.forEach((element, index) => {   //forEach is a loop where element carry the value and index carry the array index. 
                str += `
                <tr>
                    <th scope="row">${index+1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
                </tr>`
            });
            tableBody.innerHTML = str;
        }
        update();
        add = document.getElementById("add");
        add.addEventListener("click", getAndUpdate);

        // "deleted" function is a onClick function of "Delete" button  
        function deleted(itemIndex){
            console.log("Delete", itemIndex);
            itemJsonArrayStr = localStorage.getItem('itemsJson');
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            // Delete itemIndex element from the array
            itemJsonArray.splice(itemIndex, 1);  // Here the first parameter "itemIndex" denote the index of the array and second parameter denote the no of elements to be delete in the array.
            //The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. 
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
            update();
        }
 
        //"clearStorage" is onClick function of "clear list" button
        function clearStorage(){
            if(confirm("Do you want to clear?")){
            console.log("Clearing the storage");
            localStorage.clear();
            update();
            }     
        }