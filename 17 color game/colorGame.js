var colors = [
    "rgb(255, 0, 0)",
    "rgb(255, 255, 0)",
    "rgb(0, 255, 0)",
    "rgb(0, 255, 255)",
    "rgb(0, 0, 255)",
    "rgb(255, 0, 255)"
]
var squares = document.querySelectorAll(".square");
var pickedColor = colors[3];
var colorDisplay = document.getElementById("colorDisplay");

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
        if(clickedColor === pickedColor)
        {
            alert("Correct!");
        }
        else
            alert("OOPs Incorrect!");            
    });
}