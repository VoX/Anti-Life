var INPUT = (function () {
    var INPUT = {};
    INPUT.actions = [];

    INPUT.init = function (stage) {
        INPUT.actions = [];
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mousewheel', onMouseWheel, false)
    }

    var onMouseWheel = function (e) {
        if (e.wheelDelta < 0) {
            scene.cameraZoom(1);
        } else if (e.wheelDelta > 0) {
            scene.cameraZoom(-1);
        }
    };

    var onDocumentMouseMove = function (event) {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        scene.setMouse(mouse);

    };

    return INPUT;
}());
