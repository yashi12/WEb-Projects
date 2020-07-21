
const GroceryListItemController = function($scope){
  

    $scope.categorieItems = [
        {name:'breakfast'},
        {name:'lunch'},
        {name:'dinner'}
    ]
    $scope.groceryItems = [
        {id:1,completed:true , itemName:'milk', date:'2020-01-01',category:'breakfast'},
        {id:2,completed:true , itemName:'cookies', date:'2020-02-01',category: 'breakfast'},
        {id:3,completed:true , itemName:'butter', date:'2020-03-01',category: 'lunch'},
        {id:4,completed:true , itemName:'bread', date:'2020-01-07',category: 'dinner'},
        {id:5,completed:true , itemName:'cheese', date:'2020-02-11',category: 'lunch'},
        {id:6,completed:true , itemName:'eggs', date:'2020-08-01',category: 'dinner'}
    ]

    $scope.currentCategory = null;
    var SetCurrentCategory = function(category){
        $scope.currentCategory = category;
        CancelCreating();
        CancelEditing();

        // debug
        console.log($scope.currentCategory);
    }
    var IsCurrentCategory = function(category)  {
        return $scope.currentCategory!=null && category.name === $scope.currentCategory.name;
    }

    $scope.SetCurrentCategory = SetCurrentCategory;
    $scope.IsCurrentCategory = IsCurrentCategory;


//    ----------------------------------------------------------------
//    CRUD
//    -----------------------------------------------------------------

    var resetCreateForm  =function(){
        $scope.newItem = {
            completed:true,
            itemName:'',
            date:'',
            category:$scope.currentCategory.name
        }
    }
    var createItem = function(newItem){
        let maxItem = _.max($scope.groceryItems,function (item) {
            return item.id;
        });
        newItem.id = maxItem.id+1;
        // newItem.id = $scope.groceryItems.length+1;
        newItem.date = new Date();
        $scope.groceryItems.push(newItem);
        console.log($scope.groceryItems.length);
        resetCreateForm();
    }

    $scope.currentItem = null;

    var setEditItem = function(item){
        $scope.currentItem = angular.copy(item);
    }
    var updateItem = function(currentItem){
        let index = _.findIndex($scope.groceryItems,function (item) {
            return item.id == currentItem.id;
        })
        $scope.groceryItems[index] = currentItem;
        $scope.isEditing = false;
        $scope.currentItem = null;
    }
    var isSelecteditem = function(itemId){
        return $scope.currentItem !=null && $scope.currentItem.id == itemId;
    }
    var deleteItem = function(currentItem){
        let index = _.findIndex($scope.groceryItems,function (item) {
            return item.id == currentItem.id;
        })
        $scope.groceryItems.splice(index,1);
        // _.remove($scope.groceryItems, function (item) {
        //     return item.id == currentItem.id;
        // });
    }



    $scope.createItem = createItem;
    $scope.setEditItem = setEditItem;
    $scope.updateItem = updateItem;
    $scope.isSelecteditem = isSelecteditem;
    $scope.deleteItem = deleteItem;


//    ----------------------------------------------------------------
//    CREATING AND EDITING STATES
//    -----------------------------------------------------------------
    $scope.isCreating=false;
    $scope.isEditing = false;

    var StartCreating = function(){
        $scope.isCreating=true;
        $scope.isEditing = false;

        resetCreateForm();
    }
    var CancelCreating =function(){
        $scope.isCreating=false;
    }
    var StartEditing = function(){
        $scope.isCreating=false;
        $scope.isEditing = true;
    }
    var CancelEditing =function(){
        $scope.isEditing=false;
    }
    var ShouldShowCreating=function(){
        console.log("currentcategory  " + $scope.currentCategory);
        console.log(!$scope.isEditing);
        console.log($scope.currentCategory && !$scope.isEditing);
        return $scope.currentCategory && !$scope.isEditing;
    }
    var ShouldShowEditing=function(){
        return !$scope.isCreating && $scope.isEditing;
    }
    $scope.StartCreating = StartCreating;
    $scope.CancelCreating = CancelCreating;
    $scope.StartEditing = StartEditing;
    $scope.CancelEditing = CancelEditing;
    $scope.ShouldShowCreating = ShouldShowCreating;
    $scope.ShouldShowEditing = ShouldShowEditing;
};

const router = function($routeProvider) {
    console.log("app.js config launched");
    $routeProvider
        .when('/',{
            templateUrl:'view/groceryList.html'
            // controller:'GroceryListItemController'
        })
        .when('/addItem',{
            templateUrl:'view/inputItem.html'
            // controller:'GroceryListItemController'
        })
        .otherwise({
            templateUrl:'https://docs.angularjs.org/api/ngRoute/directive/ngView'
            // redirectTo:'/'
        });
}



angular
    // .module('groceryList',['ui.router'])
    .module('groceryList',['ui.router','categories','categories.items'])
    .controller("GroceryListItemController",GroceryListItemController)
    // .config(function($stateProvider,$urlRouterProvider){
    //     console.log("app.js");
    //     $stateProvider
    //     .state('eggly',{
    //         url:'',
    //         templateUrl:'<ui-view/>',
    //        abstract:true
    //     });
    //     console.log("end");
    //     $urlRouterProvider.otherwise('');
    // })
    .config(['$stateProvider','$urlRouterProvider',function ($stateProvider,$urlRouterProvider) {
        console.log("app.js");
        $stateProvider
            .state('eggly',{
                url:'',
                views:{
                    'categories':{
                        // template:'<h1>hello</h1>',
                        controller:'GroceryListItemController',
                        templateUrl:'categories/categories.tmpl.html'
                    },
                    'items':{
                        controller:'GroceryListItemController',
                        templateUrl:'categories/items/items.tmpl.html'
                    }
                }
            })
        console.log("end");
    }])