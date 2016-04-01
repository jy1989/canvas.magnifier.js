 function getRandomColor() {
     var letters = '0123456789ABCDEF'.split('');
     var color = '#';
     for (var i = 0; i < 6; i++) {
         color += letters[Math.floor(Math.random() * 16)];
     }
     return color;
 }

 function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min)) + min;
 }

 function initCanvas(canvasId) {
     var c = document.getElementById(canvasId);

     c.width = 600;
     c.height = 400;
     var ctx = c.getContext("2d");
     ctx.fillStyle = getRandomColor();
     ctx.fillRect(0, 0, c.width, c.height);
     for (var i = 0; i < 15; i++) {
         ctx.fillStyle = getRandomColor();
         ctx.fillRect(getRandomInt(0, c.width), getRandomInt(0, c.height), getRandomInt(10, c.width), getRandomInt(10, c.height));
     }
     return c;
 }
 window.onload = function() {

     (function() {

         var canvas;
         var magnifier;
         var canvasId = 'demo_canvas';
         canvas = initCanvas(canvasId);

         magnifier = jy.magnifier({
             targetCanvasId: canvasId
         });
         magnifier.show(true);


         canvas.addEventListener('mousemove', doMouseMove, false);
         canvas.addEventListener('touchmove', doMouseMove, false);

         function doMouseMove(event) {
             if (event.type == 'touchmove') {
                 event.preventDefault();
             }
             magnifier.bind(event);
         }


     })();



     (function() {

         var canvas;
         var magnifier;
         var canvasId = 'demo_canvas1';
         canvas = initCanvas(canvasId);

         magnifier = jy.magnifier({
             targetCanvasId: canvasId,
             width: 300,
             height: 300,
             radius: 150,
             ratio: 5,
             sightColor: 'yellow',
             sightSize: 20
         });
         magnifier.show(true);
         canvas.addEventListener('mousemove', doMouseMove, false);
         canvas.addEventListener('touchmove', doMouseMove, false);

         function doMouseenter(event) {
             magnifier.show(true);
         }

         function doMouseMove(event) {
             if (event.type == 'touchmove') {
                 event.preventDefault();
             }
             magnifier.bind(event);
         }

         function doMouseleave(event) {
             magnifier.show(false);
         }
     })();




     (function() {
         var ratio = 3;
         var canvas;
         var magnifier;
         var canvasId = 'demo_canvas2';
         canvas = initCanvas(canvasId);

         magnifier = jy.magnifier({
             targetCanvasId: canvasId,
             width: 200,
             height: 400,
             ratio: ratio,
             magnifierDivId: 'canvas2_magnifier',
             sightSize: 0

         });
         canvas.addEventListener('mousemove', doMouseMove, false);
         canvas.addEventListener('touchmove', doMouseMove, false);
         canvas.addEventListener('mousewheel', doMousewheel, false);
         magnifier.show(true);


         function doMouseMove(event) {
             if (event.type == 'touchmove') {
                 event.preventDefault();
             }
             magnifier.bind(event);
         }

         function doMousewheel(event) {
             if (event && event.preventDefault) {
                 event.preventDefault();
             }
             var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
             if (delta > 0) {
                 ratio = ratio + 0.5;
             } else {
                 ratio = ratio - 0.5;
             }
             if (ratio < 1) {
                 ratio = 1;
             }
             //console.log(delta+"->"+ event.wheelDelta+'->'+ event.detail,ratio);  
             magnifier.setRatio(ratio);
             return false;
         }

     })();








     (function() {

         var canvas;
         var magnifier;
         var canvasId = 'demo_canvas3';
         var ratio = 5;
         canvas = initCanvas(canvasId);

         magnifier = jy.magnifier({
             targetCanvasId: canvasId,
             width: 200,
             height: 200,
             radius: 0,
             ratio: ratio,
             sightType: 'cross',
             sightColor: 'black',
             magnifierDivStyle: 'border:1px solid black;background:#fff;'
         });

         canvas.addEventListener("mouseenter", doMouseenter, false);
         canvas.addEventListener("touchstart", doMouseenter, false);
         canvas.addEventListener('mousemove', doMouseMove, false);
         canvas.addEventListener('touchmove', doMouseMove, false);
         canvas.addEventListener('mouseleave', doMouseleave, false);
         canvas.addEventListener('touchend', doMouseleave, false);
         canvas.addEventListener('mousewheel', doMousewheel, false);

         function doMouseenter(event) {
             if (event.type == 'touchstart') {
                 event.preventDefault();
             }
             magnifier.show(true);
         }

         function doMouseMove(event) {
             if (event.type == 'touchmove') {
                 event.preventDefault();
             }
             magnifier.bind(event, function(magnifierDiv) {
                     if (event.touches) {
                         event = event.touches[0];
                     }

                     var px = event.pageX;
                     var py = event.pageY;
                     magnifierDiv.style.top = py - 200 + 'px';
                     magnifierDiv.style.left = px - 250 + 'px';
                 }

             );
         }

         function doMouseleave(event) {
             if (event.type == 'touchend') {
                 event.preventDefault();
             }
             magnifier.show(false);
         }

         function doMousewheel(event) {
             if (event && event.preventDefault) {
                 event.preventDefault();
             }
             var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
             if (delta > 0) {
                 ratio = ratio + 0.5;
             } else {
                 ratio = ratio - 0.5;
             }
             if (ratio < 1) {
                 ratio = 1;
             }
             //console.log(delta+"->"+ event.wheelDelta+'->'+ event.detail,ratio);  
             magnifier.setRatio(ratio);
             return false;
         }
     })();





 }