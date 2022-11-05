/*This code is to create a menu app for an office potluck event. It will hold
the common categories on a sign up sheet to include appetizers, entrees or main dishes,
soups or salads, side dishes, desserts, condiments, and beverages.It will then, 
list the name of the item and all it's ingredients.  This menu does several things.
First it helps show what is being brought so not everyone brings that same things and it will help 
individuals see if they can eat it according to his or her dietary needs, just as vegan, vegetarian, 
and any common food allergies that need to be avoided.*/

//Starting with the item being brought and creating the first Class using Pascl notation when
//naming classes 
 class FoodItem {
    //creating and initializing the objects with the my first class called FoodItem
    constructor(name, ingredients){
        //calling the objects
        this.name = name;
        this.ingredients = ingredients;
    }
    //describes/prints out the Food Item and it's list of ingredients 
    describe (){
        return `${this.name} contains these ${this.ingredients}`
    }
 }
 
//Next class is the category the Food Items this will contain an array for food items since there could  
//be multiple food itmes in each food category
 class FoodCategory{
    //creating and initializing the objects with the second class called FoodCategory
    constructor(category){
        this.category = category;
        //creating a blank array for food items 
        this.foodItems = [];
    }
    //Add to food item array by creating the following method
    addFoodItem(foodItem){
        //adding a check to see if our food item is an instance of the Food Item class
        if (foodItem instanceof FoodItem){
            //push is a method on the array so pushing a foodItem on the the fooditems array
            this.foodItems.push(foodItem);
        //Adding an error message so if users add the wrong thing they will know
        }else {
            throw new Error (`You can only add an instance of Food Item. Arugment is not a food item; ${foodItem}`);
        }
    }
    //describes/prints out the Food Categories and it's list of Food Items being brought to the potluck
    describe(){
        return `${this.category} has ${this.foodItems.length} ingredients`;
    }
 }
//Creating one last class which is the menu itself - it will drive the application and all the choices
class Menu{
    //leaving the agruement open 
    constructor(){
        //initializing our categories by creating an array
        this.categorys = [];
        //initialing one Category at a time but intializing only the category that is selected
        //starting with nothing in our selected category by making it equal to null.
        this.selectedCategory = null; 
    }
    //Adding a method that will be the entry point of this menu application
    start(){
        //declaring selection variable to get user input
      let selection = this.showMainMenuOptions();  
      //creating a while loop for the menu options
      //If selection does NOT equal equal zero the while loop will run
      //If anything other than 1-4 is selected the default is set the 
      //selection equal to zero and the loop will stop. 
      while(selection != 0){
        //using switch to do something off of what the user selects
        //below are the options within the menu
        switch(selection){
            case '1':
                this.createFoodCategory();
                break;
            case '2':
                this.viewFoodCategory();
                break;
            case '3':
                this.deleteFoodCategory();
                break;
            case '4':
                this.displayFoodCategorys();
                break;  
                //The default selection 0 will take someone out of the menu  
                //If the users selects anything other than 1-4 the select will set to 0
            default:
                selection = 0;
        }
        //shows menu the selected memu option
        selection = this.showMainMenuOptions();
      }
        //Placing the alert outside the while loop 
        alert('You are now out of the memu!');
    }
    //now we will select the methods we are going to impliment
    showMainMenuOptions(){
        //creating a prompt for the user to see and to select
        return prompt(`
            0) exit
            1) create new Food Category
            2) view Food Category
            3) delete Food Category
            4) display all Food Categories
        `);
    }
    //creating Show Category Menu Options
    //takes the descript of the category and print out the info and returns to the prompt
    showCategoryMenuOptions(categoryInfo){
        return prompt  (`
        0) back
        1) create Food Item
        2) delete Food Item
        ---------------------
        ${categoryInfo}
        `);
    }
    ///Now we are going to impliment the cases in the switch 
    //Display Food Categories' method
    displayFoodCategorys(){
        //declaring a string food catergory that is empty
        let foodcatString = '';
        //creating a for loop to allow user to see all the food catergories that have been 
        //entered and their list of ingredients
        for(let c = 0; c < this.categorys.length; c++){
            foodcatString += c + ')' + this.categorys[c].category + '\n';
        }
        alert (foodcatString);
    }
    //create Food Category method 
    createFoodCategory (){
        //create a Food Category promt so user can enter the name of the food category they are being to the potluck
        let catName = prompt('Enter Food Category(such as appetizers, main, salads, side or dessert:  ');
        //pushes new food Category to the Food Categoty array
        this.categorys.push(new FoodCategory(catName));
    }
    //create a View Food Category  method
    viewFoodCategory (){
        let index = prompt('Enter the index(number) of the Food Category you wish to view');
        //code to validate the input
            if (index > -1 && index < this.categorys.length){
                //set selected Category class property to the category inputed by the user
                this.selectedCategory = this.categorys[index];
                //creating a descript to print show which 
                //'\n' is to put in a new line 
                let description = 'PotLuck Category: ' + this.selectedCategory.category + '\n';
                //Creating a loop to ask for all the dishes on that category
                for (let d = 0; d< this.selectedCategory.foodItems.length; d++){
                    description += d + ' )' + this.selectedCategory.foodItems[d].name 
                    + ' - ' +  this.selectedCategory.foodItems[d].ingredients + '\n';
                }
    
                //creating a menu to show the options on the food items menu
                let selection = this.showCategoryMenuOptions(description);
                //this switch is for the submenu
                switch (selection){
                    case '1':
                        this.createFoodItem();
                        break;
                    case '2':
                        this.deleteFoodItem()
                }
                    //there is no need for a default since we only have to options and 
            }
        }
    //creating the food item method.
    createFoodItem(){
        //creating the prompt for the name of the dish the user is going to bring 
        let name = prompt ('Enter name for new Food Item');
        //creating a second prompt in the menu to as user to put list the ingredience of the dish they are bringing
        let ingredients = prompt('Enter list of ingredients for the new Food Item');
        //pushing the food item name and ingredients to the food item array within the Catergory class
        this.selectedCategory.foodItems.push(new FoodItem(name, ingredients));

    }
    //ceating the method to delete a food item that has been entered 
    deleteFoodItem(){
        //code to create a prompt for the delete a food item
        let index = prompt('Enter the index(number) of the Food Item you wish to delete:');
        //making sure the index is 0 or greater, and that it is looking at the selected category food item
        if(index > -1 && index < this.selectedCategory.foodItems.length){
            //splice removes the index item from the array
            this.selectedCategory.foodItems.splice(index, 1);
        }
    }
    //this deleted the food category when selected
    deleteFoodCategory(){
        //code for eth prompt to delete a food category 
        let index = prompt ('Enter the index(number) of the category you wish to delete:');
        //checking to make sure the index is valid, at least 0 but no longer than the number of categorys in the array
        if(index > -1 && index < this.categorys.length)
        //splice removes the index item from the categorys array in the menu class
        this.categorys.splice(index,1);
    }
}
//creating an instance of our menu 
let menu = new Menu();
//invoking the start method in our code
menu.start();
