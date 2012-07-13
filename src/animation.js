function jg_spritesheet(src, width, height) {
    this.sheet = new Image();
    this.sheet.src = src;
    this.width = width;
    this.sheet.width = width;
    this.height = height;
    this.sheet.height = height;
    
    
}

function jg_image(image, x, y) {
    this.img = new Image();
    this.img.src = image;
    this.x = x;
    this.y = y;
    
    // getters and setters
    this.getWidth = jg_getWidth;
    this.setWidth = jg_setWidth;
    this.getHeight = jg_getHeight;
    this.setHeight = jg_setHeight;
}

function jg_frame(image) {
    this.image = new jg_image(image, x, y);
    this.index;
    
    this.getIndex = function() { return this.index; };
    this.setIndex = function(ind) { this.index = ind; };
}

function jg_animation(frames) {
    this.frames = frames;
    this.cur_frame = 0;
    this.loop = true;
    
    this.next = jg_advance_frame;
    this.add_frame = jg_add_frame;
    this.setLooping = function(flag) { this.loop = flag; };
}

function jg_add_frame(image) {
    this.frames.push(image);
}

function jg_image_getWidth() {
    return this.width;
}

function jg_image_setWidth(width) {
    this.width = width;
    this.img.width = width;
}

function jg_image_getHeight() {
    return this.height;
}

function jg_image_setHeight(height) {
    this.height = height;
    this.img.height = height;
}
