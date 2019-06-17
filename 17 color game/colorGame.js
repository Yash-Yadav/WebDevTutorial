var colors = generateRandomColors(6);

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");

resetButton.addEventListener("click", function(){
    //generate all new Colors
    colors = generateRandomColors(6);
    //Pick a new random Color from array
    pickedColor = pickColor();
    //change color display to match picked color
    colorDisplay.textContent = pickedColor;
    //change colors of squares
    for(var i=0; i<squares.length; i++)
        squares[i].style.backgroundColor=colors[i];
    h1.style.backgroundColor = "#232323";
    resetButton.textContent = "New Color";
})

colorDisplay.textContent = pickedColor;

for(var i=0; i<squares.length; i++)
{
    //Add initial Colors
    squares[i].style    .backgroundColor=colors[i]

    //Add click listeners to squares
    squares[i].addEventListener("click",function(){
        //Grab Color of the Clicked Square
        var clickedColor = this.style.backgroundColor;
        //Compare the COlor to pickedColor
        console.log(clickedColor+pickedColor);
        if(clickedColor === pickedColor)
        {
            messageDisplay.textContent = "Correct!";
            changeColors(clickedColor);
            h1.style.backgroundColor = clickedColor;
            resetButton.textContent = "Play Again?";
        }
        else
        {
            this.style.backgroundColor="#232323";
            messageDisplay.textContent = "Try Again";
        }
    });
}

function changeColors(color)
{
    //Loop through all squares
    for(var i=0; i<squares.length; i++)
    {
        squares[i].style.backgroundColor = color;
    }
}

//Create Random Color
function pickColor()
{
    var random = Math.floor(Math.random() * 6 +1);
    return colors[random];
}

//Generate Random Colors
function generateRandomColors(num)
{
    //make an array
    var arr = [];
    //add num random colors to array
    for(var i=0; i<=num; i++)   //repeat num times
    {
        //get random colors and push into arr
        arr.push(randomColor());
    }
    //return that array
    return arr;
}

//generate a single random color
function randomColor()
{
    //Pick a Red from 0-255
    var r = Math.floor(Math.random() * 256);
    //Pick a Green from 0-255
    var g = Math.floor(Math.random() * 256);
    //Pick a Blue from 0-255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b +")";
}