var app = angular.module('Great');
app.controller('ComplexController', [
  '$scope', '$element', 'title', 'close',
  function($scope, $element, title, close) {

  // we add a url for convenience...
  $scope.url = 'http://www.discoposse.com/wp-content/uploads/2014/08/test-all-the-things.jpg';
  
  $scope.title = title; // title for the modal

  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
 	  close({
      url: $scope.url
    }, 200); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {
  $scope.url = null; // set to null!
    //  Manually hide the modal.
    $element.modal('hide');

    //  Now call close, returning control to the caller.
    close({
      url: $scope.url
    }, 200); // close, but give 500ms for bootstrap to animate
  };

}]);
