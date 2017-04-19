angular.element(document).ready(function(){

	        angular.module('myApp',[])
	            .controller('myCtrl', ['$scope','store',function ($scope,store) {
	                $scope.search = '';
	                $scope.products = [];
	                $scope.categories = [];
	                
	                $scope.categories = store.getCategories();
	                $scope.products = store.getProducts();
	                
	                $scope.filterProductsByCategory = function(category){
	                    $scope.search = category;
	                };
	            }])


	            // fake service, substitute with a server call ($http)
	            .factory('store',function(){
	                var categories = ['Fruit','Vegetables','Dairy'];
	                var products = [
	                    {name: 'Fixed Saver',interestrate:'2.20%',mindeposit:'£500',category: 'Fixed'},
	                    {name: 'Flex Saver',interestrate:'1.5%',mindeposit:'£0',category: 'Tracker'},
	                    {name: 'Offset Saver',interestrate:'1.8%',mindeposit:'£1000',category: 'Fixed'}
	                ];
	                return {
	                    getCategories : function(){
	                        return categories;
	                    },
	                    getProducts : function(){
	                        return products;
	                    }
	                };
	            });
	        
	        angular.bootstrap(document,['myApp']);
	    });