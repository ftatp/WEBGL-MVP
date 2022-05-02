# WebGl tutorial - MVP in computer graphics

MVP is a methodology for showing the vertices in a comfortable way to present the object's local coorinates, camera, and perspective.<br/>
In this tutorial, you can get the knowledge of what Model-View-Projection is, how to express different objects differently, and how to show the camera's view. 

Usage
============
Download the whole project, and open index.html

Explanation
============

In the first section, you can get the information about the concept of the MVP method.<br/>
The meanings of Model, View, and Projection is given.

<div>
<img src="https://user-images.githubusercontent.com/22390526/59958556-54a38380-94e3-11e9-8ada-dfb6635aab60.JPG"></img>
</div>

Practice
============

Next, , you can see the matrix for vertix translation using ranging inputs at the bottom
<div>
<img src="https://user-images.githubusercontent.com/22390526/59958579-de535100-94e3-11e9-804f-34cac0e6ca55.JPG"></img>
</div>

You can see the change of the screen using these inputs and move the object and view point using different types of translations. <br/>
The only object you can move in the world coordinate is the cube object which is in the middle. <br/>
<br/>

Using the inputs on the left side, we can control the position and rotation of the cube object. Using the right side inputs, we can control the position and rotation of the camera. <br/>
During the changing input, we can see the change of the Model and View matrices on the top-right side. The Projection matrix is fixed.

Code
============
Finally, you can check the code in the WebGLHelloAPI.js, setCamera, drawcube functions to check how to implement the objects and camera differently.
<img src="https://user-images.githubusercontent.com/22390526/59958827-b7971980-94e7-11e9-8d49-5d950fdaef22.JPG"></img>


## Contact
ftatp5901@gmail.com
