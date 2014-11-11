app.directive('ngElevateZoom', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      //Will watch for changes on the attribute
      attrs.$observe('zoomImage',function(){
        linkElevateZoom();
      });
      function eliminateZoom(){
        $(element).removeData();//remove zoom instance from image
        jQuery('.zoomContainer').remove();// remove zoom container from DOM
      }
      function linkElevateZoom(){
        //Check if its not empty
        if (!attrs.zoomImage) return;
        eliminateZoom();
        element.attr('data-zoom-image',attrs.zoomImage);
        $(element).elevateZoom({
          zoomType: "inner",
          cursor: "crosshair",
          scrollZoom : true
        });
      }

      linkElevateZoom();

    }
  };
});