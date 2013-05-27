var _PI_ = Math.PI;
var radians = function(degrees) { return (_PI_/180) * degrees; };

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function drawCharacterTest() {
	var canvas = document.getElementById("canvas_main");
	canvas.width=480;
	canvas.height=800;
	var ctxt = canvas.getContext('2d');	
	
	//head
	filledCircle(ctxt, 100, 100, 10);
	//torso
	roundedRect(ctxt, 90, 115, 20, 30, 5);
	
	//shoulders
	//roundedRect(ctxt, 80, 115, 40, 10, 10);
	partRoundRect(ctxt, 80, 115, 40, 10, 15, 15, 0, 0);
	
	//arms
	//left
	//roundedRect(ctxt, 80, 120, 8, 25, 5); // upper arm
	roundedPara(ctxt, 79, 120, 8, 20, 5, 2); // upper arm
	roundedRect(ctxt, 79, 135, 8, 15, 5); // forearm
	//right
	//roundedRect(ctxt, 112, 120, 8, 25, 5); // upper arm
	roundedPara(ctxt, 113, 120, 8, 20, 5, -2); // upper arm
	roundedRect(ctxt, 113, 135, 8, 15, 5); // forearm
	
	//legs
	//left
	roundedPara(ctxt, 88, 140, 10, 25, 5, 2);
	roundedRect(ctxt, 88, 160, 10, 20, 5);
	//right
	roundedPara(ctxt, 102, 140, 10, 25, 5, -2);
	roundedRect(ctxt, 102, 160, 10, 20, 5);
	
	//testing new functions
	//partRoundRect(ctxt, 200, 200, 40, 50, 20, 10, 5, 0);
	
}

function drawCharacter(char_x, char_y, char_width, char_height) {
	// char_width = 40, char_height = 90?
	var head_center = new Point(char_x + char_width/2, char_y + limb_height/16);
	var head_width = ~~char_width/3;
	var limb_width = ~~char_width/4;
	var body_width = ~~char_width/2;
	var large_curve = limb_width;
	var small_curve = limb_width/2;
	
	// joints
	var l_shoulder = new Point(char_x-head_center.x, +head_center.y);
	var r_shoulder = new Point(char_x+head_center.x, +head_center.y);
	var arm_rest_offset = 2;
	// var l_elbow = new Point(l_shoulder.x + );
	var r_elbow = new Point();
	var l_hip = new Point();
	var r_hip = new Point();
	var l_knee = new Point();
	var r_knee = new Point();
	
	var canvas = document.getElementById("canvas_main");
	canvas.width=480;
	canvas.height=800;
	var ctxt = canvas.getContext('2d');	
	
	//head
	filledCircle(ctxt, 100, 100, 9);
	//torso
	roundedRect(ctxt, 90, 110, 20, 30, 5);
	
	//shoulders
	partRoundRect(ctxt, 80, 110, 40, 10, 15, 15, 0, 0);
	
	//arms
	//left
	roundedPara(ctxt, 79, 115, 8, 20, 5, 2); // upper arm
	roundedRect(ctxt, 79, 130, 8, 15, 5); // forearm
	//right
	roundedPara(ctxt, 113, 115, 8, 20, 5, -2); // upper arm
	roundedRect(ctxt, 113, 130, 8, 15, 5); // forearm
	
	//legs
	//left
	roundedPara(ctxt, 88, 135, 10, 25, 5, 2);
	roundedRect(ctxt, 88, 155, 10, 25, 5);
	//right
	roundedPara(ctxt, 102, 135, 10, 25, 5, -2);
	roundedRect(ctxt, 102, 155, 10, 25, 5);
	
	//ctxt.beginPath();
	//ctxt.moveTo(0, 90);
	//ctxt.lineTo(200, 90);
	//ctxt.lineTo(200, 180);
	//ctxt.lineTo(0, 180);
	//ctxt.stroke();
	
	//testing new functions
	//partRoundRect(ctxt, 200, 200, 40, 50, 20, 10, 5, 0);
	
}

function partRoundRect(ctxt,x,y,width,height,topLeft, topRight, bottomLeft, bottomRight) {
	ctxt.beginPath();
	ctxt.beginPath();
	ctxt.moveTo(x,y+topLeft);  
	ctxt.lineTo(x,y+height-bottomLeft);  
	ctxt.quadraticCurveTo(x,y+height,x+bottomLeft,y+height);  
	ctxt.lineTo(x+width-bottomRight,y+height);  
	ctxt.quadraticCurveTo(x+width,y+height,x+width,y+height-bottomRight);  
	ctxt.lineTo(x+width,y+topRight);  
	ctxt.quadraticCurveTo(x+width,y,x+width-topRight,y);  
	ctxt.lineTo(x+topLeft,y);  
	ctxt.quadraticCurveTo(x,y,x,y+topLeft);
	
	ctxt.fill();
}

function filledCircle(ctxt, x,y,radius) {
	//ctxt.beginPath();
	ctxt.arc(x, y, radius, 0, 2*_PI_, true);
	ctxt.fill();
}

function filledTri(ctxt, x1, y1, x2, y2, x3, y3) {
	ctxt.beginPath();
	ctxt.moveTo(x1, y1);
	ctxt.lineTo(x2, y2);
	ctxt.lineTo(x3,y3);
	ctxt.lineTo(x1, y1);
	ctxt.fill();
}

function roundedRect(ctxt,x,y,width,height,radius) {
	ctxt.beginPath();
	ctxt.moveTo(x,y+radius);  
	ctxt.lineTo(x,y+height-radius);  
	ctxt.quadraticCurveTo(x,y+height,x+radius,y+height);  
	ctxt.lineTo(x+width-radius,y+height);  
	ctxt.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);  
	ctxt.lineTo(x+width,y+radius);  
	ctxt.quadraticCurveTo(x+width,y,x+width-radius,y);  
	ctxt.lineTo(x+radius,y);  
	ctxt.quadraticCurveTo(x,y,x,y+radius);
	ctxt.fill();
}

function roundedPara(ctxt,x,y,width,height,radius, offset) {
	ctxt.beginPath();
	ctxt.moveTo(x+offset,y+radius);  
	ctxt.lineTo(x,y+height-radius);  
	ctxt.quadraticCurveTo(x,y+height,x+radius,y+height);  
	ctxt.lineTo(x+width-radius,y+height);  
	ctxt.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);  
	ctxt.lineTo(x+offset+width,y+radius);  
	ctxt.quadraticCurveTo(x+width+offset,y,x+offset+width-radius,y);  
	ctxt.lineTo(x+radius+offset,y);  
	ctxt.quadraticCurveTo(x+offset,y,x+offset,y+radius);
	ctxt.fill();
}