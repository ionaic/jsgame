var jsg = (function() {
    // global scope $ selector
    $ = function(tag) {
        var res = document.getElementById(tag);
        if (res == "undefined") {
            return res;
        }
        else {
            res = document.getElementByClassName(tag);
            return res[0];
        }
    }
    var jsg = function() {
        
    }
    
})();

var jsg_obj = (function() {
    var jsg_obj = function(transform, render) {
        this.transform = transform;
        this.render = render;
    }

    return jsg_obj;
})();

var jsg_controller = (function() {
    var jsg_controller = function(move, gameObject) {
        this.move = move;
        this.gameObject = gameObject;
    }

    //jsg_controller.prototype.

    return jsg_controller;
})();

var jsg_scene = (function() {
    var _objects;
    var jsg_scene = function() {

    }

    //jsg_controller.

    return jsg_scene;
})();

var Game = (function() {
    var _canvas;
    var _context;
    var _bg;
    var _width;
    var _height;
    var _scene;

    var Game = function(canvasID, w, h) {
        _width = w;
        _height = h;
        if (document.onreadystate == "complete") {
            _canvas = $(canvasID);
            _context = _canvas.getContext("2d");
        }
    }

    Game.prototype.setClearColor = function(r, g, b, a) {

    }
    Game.prototype.setClearImg = function(img) {
        
    }
    Game.prototype.setCanvas = function(canvas) {
        if (document.onreadystate == "complete") {
            _canvas = $(canvas);
            _context = _canvas.getContext("2d");
        }
    }
    Game.prototype.init = function(var canvas_element) {
        _canvas.width = _width;
        _canvas.height = _height;
    }
    Game.prototype.render = function() {

    }
    Game.prototype.main_loop = function() {
        // update objects
        // apply physics/gravity
        this.applyForces();
        // draw
        this.render();
    }
    
    return Game;
})();
