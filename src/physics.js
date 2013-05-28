// general math functions
jsg_sqrt = Math.sqrt; // square root
jsq_abs = Math.abs; // absolute value

// vector 2 module
var jsg_vec = (function() {
    var jsg_vec = function (x, y) {
        this.x = x;
        this.y = y;
    };

    // directional vectors
    jsg_vec.prototype.down = jsg_vec(0, 1);
    jsg_vec.prototype.up = jsg_vec(0, -1);
    jsg_vec.prototype.left = jsg_vec(-1, 0);
    jsg_vec.prototype.right = jsg_vec(1, 0);
    // member functions
    jsg_vec.prototype.copy = function(other) {
        this.x = other.x;
        this.y = other.y;
    }
    jsg_vec.prototype.add = function(other) {
        return jsg_vec(this.x + other.x, this.y + other.y);
    }
    jsg_vec.prototype.add_set = function(dest, other) {
        dest.x = this.x + other.x;
        dest.y = this.y + other.y;
    }
    jsg_vec.prototype.sub = function(other) {
        return jsg_vec(this.x - other.x, this.y - other.y);
    }
    jsg_vec.prototype.sub_set = function(dest, other) {
        dest.x = this.x - other.x;
        dest.y = this.y - other.y;
    }
    jsg_vec.prototype.mul = function(other) {
        return jsg_vec(this.x * other.x, this.y * other.y);
    }
    jsg_vec.prototype.mul_set = function(dest, other) {
        dest.x = this.x * other.x;
        dest.y = this.y * other.y;
    }
    jsg_vec.prototype.muls = function(other) {
        return jsg_vec(this.x * other, this.y * other);
    }
    jsg_vec.prototype.muls_set = function(dest, other) {
        dest.x = this.x * other;
        dest.y = this.y * other;
    }
    jsg_vec.prototype.div = function(other) {
        return jsg_vec(this.x / other.x, this.y / other.y);
    }
    jsg_vec.prototype.div_set = function(dest, other) {
        var tmp = 1/other;
        dest.x = this.x * tmp;
        dest.y = this.y * tmp;
    }
    jsg_vec.prototype.sum = function() {
        return this.x + this.y + this.z;
    }
    jsg_vec.prototype.sqrMagnitude = function() {
        return this.dot(this);
    }
    jsg_vec.prototype.magnitude = function() {
        return jsg_sqrt(this.sqrMagnitude());
    }
    jsg_vec.prototype.dot = function(other) {
        return (this.mul(other)).sum();
    }

    return jsg_vec;
})();

// vector 3
var jsg_vec3 = (function() {
    var jsg_vec3 = function (a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c;
    };
    
    // directional vectors
    jsg_vec3.prototype.down = jsg_vec3(0, 1, 0);
    jsg_vec3.prototype.up = jsg_vec3(0, -1, 0);
    jsg_vec3.prototype.left = jsg_vec3(-1, 0, 0);
    jsg_vec3.prototype.right = jsg_vec3(1, 0, 0);
    // member functions
    jsg_vec3.prototype.copy = function(other) {
        this.x = other.x;
        this.y = other.y;
        this.z = other.z;
    }
    jsg_vec3.prototype.add = function(other) {
        return jsg_vec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }
    jsg_vec3.prototype.add_set = function(dest, other) {
        dest.x = this.x + other.x;
        dest.y = this.y + other.y;
        dest.z = this.z + other.z;
    }
    jsg_vec3.prototype.sub = function(other) {
        return jsg_vec3(this.x - other.x, this.y - other.y, this.z - other.z);
    }
    jsg_vec3.prototype.sub_set = function(dest, other) {
        dest.x = this.x - other.x;
        dest.y = this.y - other.y;
        dest.z = this.z - other.z;
    }
    jsg_vec3.prototype.mul = function(other) {
        return jsg_vec3(this.x * other.x, this.y * other.y, this.z * other.z);
    }
    jsg_vec3.prototype.mul_set = function(dest, other) {
        dest.x = this.x * other.x;
        dest.y = this.y * other.y;
        dest.z = this.z * other.z;
    }
    jsg_vec3.prototype.muls = function(other) {
        return jsg_vec3(this.x * other, this.y * other, this.z * other);
    }
    jsg_vec3.prototype.muls_set = function(dest, other) {
        dest.x = this.x * other;
        dest.y = this.y * other;
        dest.z = this.z * other;
    }
    jsg_vec3.prototype.div = function(other) {
        return jsg_vec3(this.x / other.x, this.y / other.y, this.z / other.z);
    }
    jsg_vec3.prototype.div_set = function(dest, other) {
        var tmp = 1/other;
        dest.x = this.x * tmp;
        dest.y = this.y * tmp;
        dest.z = this.z * tmp;
    }
    jsg_vec3.prototype.sum = function() {
        return this.x + this.y + this.z;
    }
    jsg_vec3.prototype.sqrMagnitude = function() {
        return this.dot(this);
    }
    jsg_vec3.prototype.magnitude = function() {
        return jsg_sqrt(this.sqrMagnitude());
    }
    jsg_vec3.prototype.dot = function(other) {
        return (this.mul(other)).sum();
    }

    return jsg_vec3;
})();

// physics components
var jsg_transform = (function() {
    var _position;
    var _rotation;
    var _scale;

    var jsg_transform = function (x, y) {
        _position = jsg_vec(x, y);
        _rotation = 0;
        _scale = jsg_vec(0, 0);
    };

    // translation functions
    jsg_transform.prototype.translate = function(x, y) {
        _position += x;
        _position += y;
    }
    jsg_transform.prototype.setPosition = function(x, y) {
        _position.x = x;
        _position.y = y;
    }
    // rotation functions
    jsg_transform.prototype.rotate = function(amt) {
        _rotation += amt;
    }
    jsg_transform.prototype.setRotation = function(amt) {
        _rotation = amt;
    }
    // scale functions
    jsg_transform.prototype.scale = function(x, y) {
        _scale.add_set(_scale, jsg_vec(x, y));
    }
    jsg_transform.prototype.setScale = function(x, y) {
        _scale.x = x;
        _scale.y = y;
    }

    return jsg_transform;
})();

var jsg_move = (function() {
    var _velocity;
    var _acceleration;
 
    var jsg_move = function () {
        _velocity = 0;
        _acceleration = 0;
    };

    return jsg_move;
})();

var jsg_physic = (function() {
    var _gravity = 10;
    var _gravity_direction = jsg_vec.down;

    var jsg_physic = function() {
        this.mass; // mass of the object
        this.inertia; // inertia?
        this.friction; // friction
        this.drag; // drag
        this.grav_flag; // apply gravity?
        this.net_force; // net force without gravity
    }

    jsg_physic.prototype.addForce = function(force) {
        this.net_force.add_set(this.net_force, force);
    }
    jsg_physic.prototype.setGravity = function(value) {
        _gravity = value;
    }
    jsg_physic.prototype.applyGravity = function() {
        return this.net_force.add(jsg_vec.down.muls(_gravity));
    }

    return jsg_physic;
})();
