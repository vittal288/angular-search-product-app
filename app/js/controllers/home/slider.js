
aroCityApp.controller('CarouselDemoCtrl',function($scope){
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  var slides = $scope.slides = [];
  $scope.addSlide = function(img) {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      //image: '//placekitten.com/' + newWidth + '/300',
      image :'../img/carousel-images/'+ img +'.jpg',
      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
    });
  };
  for (var i=1; i<=4; i++) {
    $scope.addSlide(i);
  }
});