/*
 *
 */

/* document.getElementById;
 */
jg_select = document.getElementById;


function jg_canvas(canvas_element, width, height) {
    // member variables
    //this.canvas = document.getElementById(canvas_element);
    this.canvas = jg_select(canvas_element);
    this.width = width;
    this.height = height;
    this.context = this.canvas.getContext("2d");

    // member functions
    this.blit = jg_blit;
    this.set_background = jg_set_background;
}

function jg_blit() {
    this.context.drawImage(this.background.img, 0, 0);
    for (obj in this.objects) {
       this.context.drawImage(obj.img, obj.x, obj.y); 
    }
}

function jg_set_background(background) {
    this = new jg_image(background, 0, 0);
}

function jg_add_object(object) {
    object.jg_id = this.nextID;
    nextID++;
    this.objects.push(object);
}

function jg_remove_object(id) {
    for (obj in this.objects) {
        if (obj.jg_id == id) {
            var temp_index = this.objects.indexOf(obj);
            var temp = this.objects[temp_index];
            this.objects[temp_index] = this.objects[this.objects.length-1];
            //this.objects[this.objects.length-1] = obj;
            this.objects.pop();
        }
    }
}
