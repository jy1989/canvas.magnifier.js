
#canvas放大镜

canvas.magnifier.js Use for make a magnifier in your canvas.

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
and more customs by setting
## setting
```
setting
  magnifierDivId      magnifier div element id
  magnifierDivStyle   magnifier div element style, default 'border:1px solid #ccc;background:#fff;box-shadow:5px 5px 25px #000;'
  width               magnifier width
  height              magnifier height
  ratio               magnifier ratio
  radius              magnifier radius
  sightType           'rect' or 'cross', the type of the sight, default 'rect'
  sightSize           the size of the sight rect, only work if sightType is rect
  sightColor          default '#FF000'
  targetCanvasId      your canvas id
```
```
method
  show(Boolean show)                    if set true, show the magnifier 
  bind(Object event,Function binding)   event is the mousemove event, and binging is the fucntion access the magnifierDiv, please see the demo for the usage
  setRatio(Number ratio)                set the ratio dynamically
```

see demo.js for more details.
