/* FILE: draw.js
 * PURPOSE: provide basic drawing functions such as blit as well as some object
 *  prototypes to draw objects on the screen
 * AUTHOR: Ian Ooi
 * CREATED: April 2012
 * LAST MODIFIED: May 2013
 */

var jsg_spriteFrame = (function() {
    var jsg_frame = function(i, x, y, w, h, t) {
        this.index = i;
        this.topLeft = jsg_vec(x, y);
        this.width = w;
        this.height = h;
        this.time = t;
    }

   return jsg_frame 
})();

var jsg_spriteSheet = (function() {
    var jsg_spriteSheet = function() {
        this.currentFrame = 0;
        this.isPlaying = false;
    }

    jsg_spriteSheet.prototype.getCurrentFrame = function() {

    }
    jsg_spriteSheet.prototype.addFrame = function(x, y, w, h, t) {
        // add frame to the end, use next available index

    }
    jsg_spriteSheet.prototype.insertFrame = function() {

    }

    return jsg_spriteSheet;
})();

var jsg_spriteAnimation = (function() {
    var jsg_spriteAnimation = function() {

    }

    return jsg_spriteAnimation;
})();
