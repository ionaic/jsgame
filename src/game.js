/* General utility functions
 */
var Util = {
    isFunction : function(obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    },
    mergePropertiesShallow : function(obj1, obj2) {
        for (prop in obj2) {
            obj1[prop] = obj1[prop] || obj2[prop];
        }
    },
    mergePropsShallowPartialApp : function(obj1, obj2) {
        for (prop in obj2) {
            if (Util.isFunction(obj2[prop])) {
                obj1[prop] = obj1[prop] || function() { return obj2[prop].apply(this, [obj1].concat(arguments.slice(0))); };
            }
            else {
                obj1[prop] = obj1[prop] || obj2[prop];
            }
        }
    },
    zip : function () {
        var args = [].slice.call(arguments);
        var shortest = args.length==0 ? [] : args.reduce(function(a,b){
            return a.length<b.length ? a : b
        });

        return shortest.map(function(_,i){
            return args.map(function(array){return array[i]})
        });
    }
};

/* GameInstance Implementation
 *
 * Stores game-wide data and handles the game loop itself
 */
var GameInstance = (function() {
    var game = function(targetCanvas) {
        this.canvas = document.querySelector(targetCanvas);
        this.devCon = this.canvas.getContext("2d");

        this.pauseState = false;
    };

    game.prototype = {
        constructor : game,
        pause : function() {
            this.pauseState = true;
        },
        unpause : function() {
            this.pauseState = false;
        }
    }

    return game;
})();

/* SpriteSheet Implementations
 *
 * Basic spritesheet implementation uses the ID of the image to be used
 * and then assumes that said image contains all of the frames
 * * Handles the actual spritesheet and retrieval of a frame.
 */
var SpriteSheet = (function() {
    var spritesheet = function(sheetid, nFrames, frameWidth, frameHeight) {
        this.sheetname = sheetid;
        this.sheet = this.LoadSheet();
        // | 0 converts to an int
        this.frameCols = ((this.sheet.width/frameWidth) | 0);
        this.frameRows = ((this.sheet.height/frameHeight) | 0);
        this.nFrames = Math.min(nFrames, this.frameCols * this.frameRows);
    }

    spritesheet.prototype = {
        constructor: spritesheet,
        LoadSheet : function() {
            return document.getElementById(this.sheetname);
        },
        GetFrame : function(frameNumber) {
            var row = Math.ceil(frameNumber / this.frameCols);
            var col = frameNumber % this.frameCols;
            return [this.sheet, col, row, col + this.frameWidth, row + this.frameHeight];
        }
    }

    return spritesheet;
})();
/* MultiSpriteSheet implementation
 *
 * Handles spritesheets that are actually an image sequence
 */
var MultiSpriteSheet = (function(baseproto) {
    var mspritesheet = function(){};
    mspritesheet.prototype = baseproto;

    mspritesheet.prototype.constructor = function(sheetclass, nFrames) {
        this.sheetname = sheetclass;
        this.sheet = this.LoadSheet();
    }
    mspritesheet.prototype.LoadSheet = function() {
        return document.getElementsByClassName(this.sheetname);
    }
    mspritesheet.prototype.GetFrame = function(frameNumber) {
        return [this.sheet[frameNumber], 0, 0, this.frameWidth, this.frameHeight];
    }

    return mspritesheet;
})(SpriteSheet);

/* Sprite implementation
 * 
 * Handles animation properties, frame advancement, playing of animations
 */
var Sprite = (function() {
    var sprite = function(spriteSheet, fps) {
        this.spriteSheet = spriteSheet;
        this.frameNumber = 0;
        this.animationRanges = [];
        this.curAnimation = "";
        this.framesPerSecond = spriteSheet.nFrames;
        this.playbackSpeed = 1.0;
    }
    
    sprite.prototype.SetAnimationRange = function(range, animName) {
        this.animationRanges[animName] = range;
        this.animationRanges["" + range[0] + "-" + range[1]] = animName;
    }
    sprite.prototype.SetCurAnimation = function(animName) {
        this.curAnimation = animName;
        this.frameNumber = 0;
    }
    sprite.prototype.GetFrameDrawFunc = function(dt, drawFunc) {
        this.frameNumber +=  (dt * this.framesPerSecond * this.playbackSpeed) | 0;
        var frameProps = this.spriteSheet.GetFrame(this.frameNumber);
        return function(x, y) {
            drawFunc(frameProps[0], frameProps[1], frameProps[2], frameProps[3], frameProps[4], x, y);
        }
    }
    
    return sprite;
})();

var Component = (function() {
    var component = function(name, gameobj) {
        this.name = name;
        this.gameobj = gameobj;
    }
    component.prototype.GetType = function() {
        return "generic";
    }
    return component;
})();
var Transform = (function(compbase) {
    var transform = function(){};
    transform.prototype = compbase;
    
    transform.prototype.GetType = function() {
        return "transform";
    }
})(Component);

var GameObject = (function() {
    var gameobj = function(name) {
        this.components = [];
    }

    gameobj.prototype.Transform = function() {
        return this.components["transform"];
    }

    gameobj.prototype.AddComponent = function(component) {
        this.components[component.name] = component;
    }
})();

var VecTypes = {
    ARR_TYPE : Array,
    VecMath : {
        dot : function(a, b) {

        },
        cross : function(a, b) {

        },
        magnitude : function(a) {

        }
    },
    MatrixMath : {
        add : function(a, b) {
            return Util.zip(a.data, b.data).map(function(tuple) { return tuple.reduce(function(pVal, cVal) { return pVal + cVal; }); });
        },
        sub : function(a.data, b.data) {
            return Util.zip(a, b).map(function(tuple) { return tuple.reduce(function(pVal, cVal) { return pVal - cVal; }); });
        },
        mul : function(a.data, b.data) {
        },
        s_add : function(vectype, scalar) {
            return vectype.data.map(function(val) { return val + scalar; });
        },
        s_sub : function(vectype, scalar) {
            return vectype.data.map(function(val) { return val - scalar; });
        },
        s_mul : function(vectype, scalar) {
            return vectype.data.map(function(val) { return val * scalar; });
        },
        s_div : function(vectype, scalar) {
            return vectype.data.map(function(val) { return val / scalar; });
        },
        transpose : function(vectype) {
            return Util.zip.apply(this, vectype.data);
        }
    },
    Vec3 : (function() {
        var vec3 = function(x, y, z) {
            this.data = VecTypes.ARR_TYPE(3);
            this.data[0] = x;
            this.data[1] = y;
            this.data[2] = z;

            this.rows = 3;
            this.cols = 1;

            Util.MergePropertiesShallow(this.prototype, VecTypes.VecMath.prototype);
            Util.MergePropertiesShallow(this.prototype, VecTypes.MatrixMath.prototype);
        }
        vec3.prototype.x = function() {
            return this.data[0];
        }
        vec3.prototype.y = function() {
            return this.data[1];
        }
        vec3.prototype.z = function() {
            return this.data[2];
        }
    })(),
    Vec4 : (function() {
        var vec4 = function(x, y, z, w) {
            this.data = VecTypes.ARR_TYPE(4);
            this.data[0] = x;
            this.data[1] = y;
            this.data[2] = z;
            this.data[3] = w;

            this.rows = 4;
            this.cols = 1;

            Util.MergePropertiesShallow(this.prototype, VecTypes.VecMath.prototype);
            Util.MergePropertiesShallow(this.prototype, VecTypes.MatrixMath.prototype);
        }
        vec4.prototype.x = function() {
            return this.data[0];
        }
        vec4.prototype.y = function() {
            return this.data[1];
        }
        vec4.prototype.z = function() {
            return this.data[2];
        }
        vec4.prototype.z = function() {
            return this.data[3];
        }
    })(),
    Quaternion : (function(vec4) {
        var quat = function() {};
        quat.prototype = vec4;
    })(Vec4),
    Mat3 : (function() {
        var mat3 = function() {
            this.rows = 3;
            this.cols = 3;
            this.data = ARR_TYPE(9);
            Util.MergePropertiesShallow(this.prototype, VecTypes.MatrixMath.prototype);
        }
        mat3.prototype.translate = function(x, y, z) {
            this.data[0]  = 1;
            this.data[1]  = 0;
            this.data[2]  = 0;
            this.data[4]  = 0;
            this.data[5]  = 1;
            this.data[6]  = 0;
            this.data[8]  = 0;
            this.data[9]  = 0;
            this.data[10] = 1;
        }
        mat3.prototype.rotate = function(x, y, z) {
            this.data[0]  = 1;
            this.data[1]  = 0;
            this.data[2]  = 0;
            this.data[4]  = 0;
            this.data[5]  = 1;
            this.data[6]  = 0;
            this.data[8]  = 0;
            this.data[9]  = 0;
            this.data[10] = 1;
        }
        mat3.prototype.scale = function(s) {
            this.data[0]  = s;
            this.data[1]  = 0;
            this.data[2]  = 0;
            this.data[4]  = 0;
            this.data[5]  = s;
            this.data[6]  = 0;
            this.data[8]  = 0;
            this.data[9]  = 0;
            this.data[10] = s;
        }
        mat3.prototype.identity = function() {
            this.data[0]  = 1;
            this.data[1]  = 0;
            this.data[2]  = 0;
            this.data[4]  = 0;
            this.data[5]  = 1;
            this.data[6]  = 0;
            this.data[8]  = 0;
            this.data[9]  = 0;
            this.data[10] = 1;
        }
        
        mat3.prototype.idx1D = function(row, col) {
            return row * 3 + col;
        }
    })(),

    Mat4 : (function() {
        var mat4 = function() {
            this.data = VecTypes.ARR_TYPE(9);
            Util.MergePropertiesShallow(this.prototype, VecTypes.MatrixMath.prototype);
        }
        mat4.prototype.translate = function(x, y, z) {
            this.data[0]  = 1;
            this.data[1]  = 0;
            this.data[2]  = 0;
            this.data[3]  = 0;
            this.data[4]  = 0;
            this.data[5]  = 1;
            this.data[6]  = 0;
            this.data[7]  = 0;
            this.data[8]  = 0;
            this.data[9]  = 0;
            this.data[10] = 1;
            this.data[11] = 0;
            this.data[12] = 0;
            this.data[13] = 0;
            this.data[14] = 0;
            this.data[15] = 1;
        }
        mat4.prototype.rotate = function(x, y, z) {
            this.data[0]  = 1;
            this.data[1]  = 0;
            this.data[2]  = 0;
            this.data[3]  = 0;
            this.data[4]  = 0;
            this.data[5]  = 1;
            this.data[6]  = 0;
            this.data[7]  = 0;
            this.data[8]  = 0;
            this.data[9]  = 0;
            this.data[10] = 1;
            this.data[11] = 0;
            this.data[12] = 0;
            this.data[13] = 0;
            this.data[14] = 0;
            this.data[15] = 1;
        }
        mat4.prototype.scale = function(s) {
            this.data[0]  = s;
            this.data[1]  = 0;
            this.data[2]  = 0;
            this.data[3]  = 0;
            this.data[4]  = 0;
            this.data[5]  = s;
            this.data[6]  = 0;
            this.data[7]  = 0;
            this.data[8]  = 0;
            this.data[9]  = 0;
            this.data[10] = s;
            this.data[11] = 0;
            this.data[12] = 0;
            this.data[13] = 0;
            this.data[14] = 0;
            this.data[15] = s;
        }
        mat4.prototype.identity = function() {
            this.data[0]  = 1;
            this.data[1]  = 0;
            this.data[2]  = 0;
            this.data[3]  = 0;
            this.data[4]  = 0;
            this.data[5]  = 1;
            this.data[6]  = 0;
            this.data[7]  = 0;
            this.data[8]  = 0;
            this.data[9]  = 0;
            this.data[10] = 1;
            this.data[11] = 0;
            this.data[12] = 0;
            this.data[13] = 0;
            this.data[14] = 0;
            this.data[15] = 1;
        }
        mat4.prototype.idx1D = function(row, col) {
            return row * 4 + col;
        }
        
    })(),
};
