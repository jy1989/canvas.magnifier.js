
#Canvas放大镜

canvas.magnifier.js Use for make a magnifier in your canvas.

canvas.magnifier.js 用于在canvas上生成一个放大镜，放大镜的样式可自定义

[DEMO](http://jy1989.github.io/magnifier/demo.html "demo")

[]!(https://raw.githubusercontent.com/jy1989/canvas.magnifier.js/master/screenshot/Untitled.gif)
[]!(https://raw.githubusercontent.com/jy1989/canvas.magnifier.js/master/screenshot/Untitled2.gif)
[]!(https://raw.githubusercontent.com/jy1989/canvas.magnifier.js/master/screenshot/Untitled3.gif)
[]!(https://raw.githubusercontent.com/jy1989/canvas.magnifier.js/master/screenshot/Untitled4.gif)

## Sample

you can just create magnifier by this simple way

```javascript
var magnifier = JyMagnifier({
   targetCanvasId: youCanvasId
});
magnifier.show(true);
youCanvas.addEventListener('mousemove', doMouseMove, false);
youCanvas.addEventListener('touchmove', doMouseMove, false);
function doMouseMove(event) {
   if (event.type == 'touchmove') {
       event.preventDefault();
   }
   magnifier.bind(event);
}
```


## API
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
