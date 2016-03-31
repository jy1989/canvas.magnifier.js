# canvas.magnifier.js
canvas.magnifier.js Use for make a magnifier in your canvas.
##usage

you can just create magnifier by this simple way

```javascript
var magnifier = jy.magnifier({
   targetCanvasId: youCanvasId
});
magnifier.show(true);
youCanvas.addEventListener('mousemove', doMouseMove, false);
function doMouseMove(event) {
   magnifier.bind(event);
}
```

see demo.js for more details.
