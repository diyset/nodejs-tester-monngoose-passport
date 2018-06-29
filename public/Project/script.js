angular.module("Great", ["ui.pagedown",'angularModalService'])

.controller("myController", function($scope, $window, $q, $interval,ModalService) {
  
  
  
  $scope.logText = "";
  
  $scope.log = function() {
    $scope.logText = "Changed to " + $scope.data.content;
  }
  
  
  $scope.data = {
    content: "",
    placeholder: "Enter something here.."
  };
  
  $scope.showSomeHelp = function showSomeHelp() {
    // this is what the default will do
    $window.open("http://daringfireball.net/projects/markdown/syntax", "_blank");
  };
  

  
  $scope.shout = function shout() {
    // test update the content programatically
    $scope.data.content += '\n\nTell Laura I love her';
  };
  

  
  
})

;