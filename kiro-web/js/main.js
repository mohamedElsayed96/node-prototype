/**
 * @file MainSystemForNodeProgram
 * @author Kirononame <abdelrahman.abdelrahman101@gmail.com>
 * @version 0.1
*/

var appEnum = Object.freeze({"deploy":1, "test":2, "debug":3});
var appMode = appEnum.test;

var shapesEnum = Object.freeze({"square":1, "circle":2});
var chosenShape = null;

var createEnum = Object.freeze({"create":1, "donothing":2});
var clickedShape = null;

var propertyNode = document.getElementById("properties_window");

var containerCanvas = document.getElementById('container_canvas');
var containerCtx = containerCanvas.getContext("2d");
fitToContainer(containerCanvas);

var containerWidth = containerCanvas.getAttribute('width');
var containerHeight = containerCanvas.getAttribute('height');

var workspaceCanvas = document.getElementById('workspace_canvas');
var workspaceCtx = workspaceCanvas.getContext("2d");
fitToContainer(workspaceCanvas);

var workspaceWidth = workspaceCanvas.getAttribute('width');
var workspaceHeight = workspaceCanvas.getAttribute('height');

var shapeWidth = 50;
var shapeHeight = 50;

var containerShapes;
var workspaceShapes;
var workspaceLines;

var firstClickedShape;
var secondClickedShape;

var id = 0;
var shapesId = {};


function ChangeProperty(property, value)
{
    clickedShape.properties[property] = value;
}

function RemoveProperties()
{
    while (propertyNode.firstChild) {
        propertyNode.removeChild(propertyNode.firstChild);
    }
}

function RemoveOutputs()
{
    var element = document.getElementById("outputs");

    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function AddProperties(properties)
{

    RemoveProperties();

    for(let property in properties)
    {

        var para = document.createElement("div");

        var node = document.createTextNode(property);

        para.appendChild(node);
    
        propertyNode.appendChild(para);


        para = document.createElement("input");

        para.value = properties[property];
        para.setAttribute("type", "text");

        para.setAttribute("id", property);

        para.onchange = function(){

            if(appMode == appEnum.test)
            {
                console.log(this.id, this.value);
            }

            ChangeProperty(this.id, this.value);
        }

        //para.addEventListener("click", myFunction);
    
        propertyNode.appendChild(para);

        
    }

}

function PrintOutput(printedOutput)
{

    var para = document.createElement("p");
    var node = document.createTextNode(printedOutput);
    para.appendChild(node);

    var element = document.getElementById("outputs");
    element.appendChild(para);

}

function fitToContainer(canvas){
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}


function Init()
{
    containerShapes = [];
    workspaceShapes = [];
    workspaceLines = [];

    firstClickedShape = null;
    secondClickedShape = null;

    RemoveProperties();
    RemoveOutputs();

    
    containerShapes.push(new Circle(containerWidth / 2,
                        containerHeight / 4,
                        shapeWidth / 2,
                        0,
                        2*Math.PI));
        
    containerShapes.push(new Square(containerWidth / 2,
                                    containerHeight * 3 / 4,
                                    shapeWidth,
                                    shapeHeight));

    console.log("Select a shape");

}



/**
   * The Tag definition.
   *
   * @param {String} id - The ID of the Tag.
   * @param {String} description - Concise description of the tag.
   * @param {Number} min - Minimum value accepted for trends.
   * @param {Number} max - Maximum value accepted for trends.
   * @param {Object} plc - The ID of the {@link PLC} object where this tag belongs.
*/


function ChangeMode(mode)
{
    appMode = appEnum[mode];
}

function Run()
{
    for(let shape of workspaceShapes)
    {
        if(!shape.input && shape.shape == shapesEnum.circle)
        {
            if(shape.pressed)
            {
                shape.pressed(shape.properties['String']);
            }
            return;
        }
    }
}

function Reset()
{
    console.log('Reset');

    Init();
}

function MainLoop()
{
    Render();
}

function Main()
{
    Init();
    
    setInterval(MainLoop, 30);
}

Main();