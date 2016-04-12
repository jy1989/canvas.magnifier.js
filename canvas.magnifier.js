;
(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition();
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
    else this[name] = definition();
}('JyMagnifier', function() {
    "use strict";
    var JyMagnifier = function(setting) {
        var magnifierDiv;
        var magnifierDivId = setting.magnifierDivId;
        var magnifierCtx;
        var magnifierDivStyle = setting.magnifierDivStyle || 'border:1px solid #ccc;background:#fff;box-shadow:5px 5px 25px #000;';
        var magnifierCanvas;

        var width = setting.width || 150;
        var height = setting.height || 150;
        var ratio = setting.ratio || 3;
        var radius = (typeof setting.radius === 'undefined') ? (width / 2) : setting.radius;
        var sightType = setting.sightType || 'rect';
        var sightSize = (typeof setting.sightSize === 'undefined') ? 5 : setting.sightSize;
        var sightColor = setting.sightColor || '#FF0000';
        var targetCanvasId = setting.targetCanvasId;

        var targetCanvas = document.getElementById(targetCanvasId);
        var widthOffset = width * ratio / 2 - width / 2;
        var heightOffset = height * ratio / 2 - height / 2;
        var magnifierShow = false;

        var offsetX = 0;
        var offsetY = 0;

        //var borderHackWidth = width;
        //var borderHackHeight = height;
        var hackCanvas;
        var hackCtx;

        function _setRatio(mRatio) {
            ratio = mRatio;
            widthOffset = width * ratio / 2 - width / 2;
            heightOffset = height * ratio / 2 - height / 2;
            _draw();
        }

        function _createCanvas(width, height) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            canvas.style.background = '#ffffff';
            return canvas
        }


        function _init() {
            if (!magnifierDivId) {
                magnifierDiv = document.createElement('div');
                magnifierDiv.setAttribute('style', 'z-index:1989;position:absolute;display:none;' + magnifierDivStyle);
                magnifierDiv.style.width = width + 'px';
                magnifierDiv.style.height = height + 'px';
                magnifierDiv.style.top = targetCanvas.offsetTop + 10 + 'px';
                magnifierDiv.style.left = targetCanvas.offsetLeft + 10 + 'px';
                if (radius) {
                    magnifierDiv.style.borderRadius = radius + 'px';
                }
                document.body.appendChild(magnifierDiv);
            } else {
                magnifierDiv = document.getElementById(magnifierDivId);
            }

            magnifierCanvas = _createCanvas(width, height);


            if (magnifierDiv.style.borderRadius) {
                magnifierCanvas.style.borderRadius = magnifierDiv.style.borderRadius;
            }
            magnifierDiv.appendChild(magnifierCanvas);
            magnifierCtx = magnifierCanvas.getContext("2d");

            hackCanvas = _createCanvas(targetCanvas.width + width, targetCanvas.height + height);
            hackCanvas.style.display = 'none';
            document.body.appendChild(hackCanvas);
            hackCtx = hackCanvas.getContext("2d");

            _draw();
        }

        function _draw() {
            hackCtx.clearRect(0, 0, hackCanvas.width, hackCanvas.height);
            hackCtx.drawImage(targetCanvas, width / 2, height / 2, targetCanvas.width, targetCanvas.height);
            magnifierCtx.clearRect(0, 0, magnifierCanvas.width, magnifierCanvas.height);
            magnifierCtx.drawImage(hackCanvas, offsetX, offsetY, width, height, -widthOffset, -heightOffset, width * ratio, height * ratio);
            if (sightType) {
                if (sightType == 'rect') {
                    if (sightSize > 0) {
                        magnifierCtx.fillStyle = sightColor;
                        magnifierCtx.fillRect(width / 2 - sightSize / 2, height / 2 - sightSize / 2, sightSize, sightSize);
                    }
                } else if (sightType == 'cross') {
                    magnifierCtx.beginPath();
                    magnifierCtx.strokeStyle = sightColor;
                    magnifierCtx.moveTo(0, height / 2);
                    magnifierCtx.lineTo(width, height / 2);
                    magnifierCtx.stroke();

                    magnifierCtx.beginPath();
                    magnifierCtx.strokeStyle = sightColor;
                    magnifierCtx.moveTo(width / 2, 0);
                    magnifierCtx.lineTo(width / 2, height);
                    magnifierCtx.stroke();
                }
            }
        }

        function _bind(event, binding) {
            if (!magnifierShow) {
                return;
            }
            if (event.touches) {
                event = event.touches[0];
            }


            var pageX = event.pageX;
            var pageY = event.pageY;
            if (!magnifierDivId) {
                if (binding && typeof(binding) === "function") {
                    binding(magnifierDiv);
                } else {
                    magnifierDiv.style.top = (pageY - height) + 'px';
                    magnifierDiv.style.left = (pageX + width / 4) + 'px';
                }
            }
            offsetX = event.offsetX || pageX - targetCanvas.offsetLeft;
            offsetY = event.offsetY || pageY - targetCanvas.offsetTop;
            /*
                        offsetX -= width / 2;
                        offsetY -= height / 2;

                        offsetX += borderHackWidth / 2;
                        offsetY += borderHackHeight / 2
            */
            _draw();
        }

        function _show(mshow) {
            magnifierShow = mshow;
            magnifierDiv.style.display = magnifierShow ? "" : "none";
        }
        _init();
        return {
            bind: _bind,
            show: _show,
            setRatio: _setRatio
        };
    }
    return JyMagnifier
}));