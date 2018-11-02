/**
 * @file ShapesDiagramsForNodeProgram
 * @author Kirononame <abdelrahman.abdelrahman101@gmail.com>
 * @version 0.1
*/

class Shape
{

    constructor(x, y) {
        this.id = id;

        this.x = x;
        this.y = y;

        this.input = false;
        this.output = false;

        this.clicked = null;

        id++;

        this.properties = {};

    }

    draw(color)
    {
        return;
    }
}

class Square extends Shape
{

    constructor(x, y, width, height){

        super(x, y);

        this.width = width;
        this.height = height;

        this.shape = shapesEnum.square;

        this.name = "";

        this.properties["String"] = "Hello World!"

        this.print = function(msg)
        {
            PrintOutput(msg);
        }

    }

    draw(place, color){

        place.fillStyle = color;

        console.debug(this.x);

        place.fillRect(this.x - this.width / 2,
                             this.y - this.width / 2,
                             this.width,
                             this.height);

        if(appMode === appEnum.debug)
        {

            place.beginPath();
            place.arc(this.x, this.y, this.width / 2, 0, 2*Math.PI)
            place.closePath();

            place.stroke();

            place.beginPath();
            place.arc(this.x, this.y, this.width, 0, 2*Math.PI)
            place.closePath();

            place.stroke();

            place.beginPath();
            place.arc(this.x, this.y, this.width * 2, 0, 2*Math.PI)
            place.closePath();

            place.stroke();
        }
    }
}

class Circle extends Shape
{

    constructor(x, y, radius) {
        super(x, y);

        this.radius = radius;

        this.shape = shapesEnum.circle;

        this.properties["key"] = "a";
        this.properties["String"] = "Hello World!"


        this.pressed = null;

    }

    draw(place, color){

        place.fillStyle = color;

        place.beginPath();
        place.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        place.closePath();
        place.fill();

        if(appMode === appEnum.debug)
        {
            
            place.beginPath();
            place.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
            place.closePath();

            place.stroke();

            place.beginPath();
            place.arc(this.x, this.y, this.radius * 2, 0, 2*Math.PI)
            place.closePath();

            place.stroke();

            place.beginPath();
            place.arc(this.x, this.y, this.radius * 4, 0, 2*Math.PI)
            place.closePath();

            place.stroke();
        
        }
    }
}