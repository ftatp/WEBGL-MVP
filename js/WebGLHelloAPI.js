//(CC-NC-BY) 전승곤 2019

var gl;

function testGLError(functionLastCalled) {

    var lastError = gl.getError();

    if (lastError != gl.NO_ERROR) {
        alert(functionLastCalled + " failed (" + lastError + ")");
        return false;
    }

    return true;
}

function initialiseGL(canvas) {
    try {
 // Try to grab the standard context. If it fails, fallback to experimental
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    catch (e) {
    }

    if (!gl) {
        alert("Unable to initialise WebGL. Your browser may not support it");
        return false;
    }

    return true;
}

var shaderProgram;

function initialiseBuffer() {
        
    var vertexData = [

        //Cube*******************************************************************
        -0.5, 0.5, 0.5,     1.0, 1.0, 1.0, 0.5,     0.0, 1.0,  0.0, 1.0, 0.0, //3
        0.5, 0.5, 0.5,      1.0, 1.0, 1.0, 0.5,     1.0, 1.0,  0.0, 1.0, 0.0, //1
        0.5, 0.5, -0.5,     1.0, 1.0, 1.0, 0.5,     1.0, 1.0,  0.0, 1.0, 0.0, //2
                
        -0.5, 0.5, 0.5,     1.0, 1.0, 1.0, 0.5,     0.0, 1.0,  0.0, 1.0, 0.0, //3
        0.5, 0.5, -0.5,     1.0, 1.0, 1.0, 0.5,     1.0, 1.0,  0.0, 1.0, 0.0, //2
        -0.5, 0.5, -0.5,    1.0, 1.0, 1.0, 0.5,     0.0, 1.0,  0.0, 1.0, 0.0, //4
         
        0.5, 0.5, -0.5,     0.0, 0.0, 0.0, 0.5,     1.0, 1.0,  0.0, 0.0, -1.0, //2
        0.5, -0.5, -0.5,    0.0, 0.0, 0.0, 0.5,     1.0, 0.0,  0.0, 0.0, -1.0, //6
        -0.5,-0.5,-0.5,     0.0, 0.0, 0.0, 0.5,     0.0, 0.0,  0.0, 0.0, -1.0, //8
           
        -0.5, 0.5, -0.5,    0.0, 0.0, 0.0, 0.5,     0.0, 1.0,  0.0, 0.0, -1.0, //4
        0.5, 0.5, -0.5,     0.0, 0.0, 0.0, 0.5,     1.0, 1.0,  0.0, 0.0, -1.0, //2
        -0.5,-0.5,-0.5,     0.0, 0.0, 0.0, 0.5,     0.0, 0.0,  0.0, 0.0, -1.0, //8
            
        0.5, -0.5, 0.5,     1.0, 0.5, 0.0, 0.5,     0.0, 1.0,  1.0, 0.0, 0.0, //5
        0.5, -0.5, -0.5,    1.0, 0.5, 0.0, 0.5,     0.0, 1.0,  1.0, 0.0, 0.0, //6
        0.5, 0.5, -0.5,     1.0, 0.5, 0.0, 0.5,     1.0, 1.0,  1.0, 0.0, 0.0, //2

        0.5, -0.5, 0.5,     1.0, 0.5, 0.0, 0.5,     0.0, 1.0,  1.0, 0.0, 0.0, //5
        0.5, 0.5, -0.5,     1.0, 0.5, 0.0, 0.5,     1.0, 1.0,  1.0, 0.0, 0.0, //2
        0.5, 0.5, 0.5,      1.0, 0.5, 0.0, 0.5,     1.0, 1.0,  1.0, 0.0, 0.0, //1
                 
        -0.5, 0.5, -0.5,    1.0, 0.0, 0.0, 0.5,     0.0, 1.0,  -1.0, 0.0, 0.0, //4
        -0.5,-0.5, -0.5,    1.0, 0.0, 0.0, 0.5,     0.0, 0.0,  -1.0, 0.0, 0.0, //8
        -0.5, -0.5, 0.5,    1.0, 0.0, 0.0, 0.5,     0.0, 0.0,  -1.0, 0.0, 0.0, //7
        
        -0.5, 0.5, 0.5,     1.0, 0.0, 0.0, 0.5,     0.0, 1.0, -1.0, 0.0, 0.0, //3
        -0.5, 0.5, -0.5,    1.0, 0.0, 0.0, 0.5,     0.0, 1.0, -1.0, 0.0, 0.0, //4
        -0.5, -0.5, 0.5,    1.0, 0.0, 0.0, 0.5,     0.0, 0.0, -1.0, 0.0, 0.0, //7
        
        -0.5, -0.5, 0.5,    0.0, 0.0, 1.0, 0.5,     0.0, 0.0, 0.0, 0.0, 1.0, //7
        0.5, -0.5, 0.5,     0.0, 0.0, 1.0, 0.5,     1.0, 0.0, 0.0, 0.0, 1.0, //5
        0.5, 0.5, 0.5,      0.0, 0.0, 1.0, 0.5,     1.0, 1.0, 0.0, 0.0, 1.0, //1
                 
        -0.5, -0.5, 0.5,    0.0, 0.0, 1.0, 0.5,     0.0, 0.0, 0.0, 0.0, 1.0, //7
        0.5, 0.5, 0.5,      0.0, 0.0, 1.0, 0.5,     1.0, 1.0, 0.0, 0.0, 1.0, //1
        -0.5, 0.5, 0.5,     0.0, 0.0, 1.0, 0.5,     0.0, 1.0, 0.0, 0.0, 1.0, //3
        
         0.5, -0.5, -0.5,   0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //6
         0.5, -0.5, 0.5,    0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        -0.5, -0.5, 0.5,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        
        -0.5,-0.5, -0.5,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0, //8
         0.5, -0.5, -0.5,   0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        -0.5, -0.5, 0.5,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        
        
        //Wall1*******************************************************************

        // 1.3, 1.3, 0.3,   0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        // 1.2, 1.3, 0.3,    0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        // 1.2, -1.3, 0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        // 1.3, -1.3, 0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0 //4

        // 1.3, 1.3, -0.3,   0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        // 1.2, 1.3, -0.3,    0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        // 1.2, -1.3, -0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        // 1.3, -1.3, -0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0 //8


        2.6, 1.3, 0.3,     0.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        2.5, 1.3, 0.3,     0.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        2.5, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3

        2.6, 1.3, 0.3,     0.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        2.5, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        2.6, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4

        2.6, 1.3, 0.3,     1.0, 0.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        2.6, -1.3, 0.3,    1.0, 0.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4
        2.6, -1.3, -0.3,   1.0, 0.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8

        2.6, 1.3, -0.3,    1.0, 0.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        2.6, 1.3, 0.3,     1.0, 0.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        2.6, -1.3, -0.3,   1.0, 0.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8

        2.6, 1.3, -0.3,     0.0, 0.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        2.6, -1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8
        2.5, -1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7

        2.6, 1.3, -0.3,   0.0, 0.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        2.5, -1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        2.5, 1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6

        2.5, 1.3, -0.3,    1.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        2.5, -1.3, -0.3,    1.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        2.5, -1.3, 0.3,    1.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3

        2.5, 1.3, -0.3,    1.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        2.5, -1.3, 0.3,    1.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        2.5, 1.3, 0.3,    1.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2

        2.5, 1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        2.6, 1.3, -0.3,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        2.5, 1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6

        2.5, 1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        2.6, 1.3, 0.3,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        2.6, 1.3, -0.3,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5

        2.5, -1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        2.5, -1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        2.6, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4

        2.6, -1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4
        2.5, -1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        2.6, -1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8
        

        //Wall2*******************************************************************

        // 1.3, 1.3, 0.3,   0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        // 1.2, 1.3, 0.3,    0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        // 1.2, -1.3, 0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        // 1.3, -1.3, 0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0 //4

        // 1.3, 1.3, -0.3,   0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        // 1.2, 1.3, -0.3,    0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        // 1.2, -1.3, -0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        // 1.3, -1.3, -0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0 //8


        1.3, 1.3, 0.3,     0.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        1.2, 1.3, 0.3,     0.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        1.2, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3

        1.3, 1.3, 0.3,     0.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        1.2, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        1.3, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4

        1.3, 1.3, 0.3,     1.0, 0.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        1.3, -1.3, 0.3,    1.0, 0.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4
        1.3, -1.3, -0.3,   1.0, 0.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8

        1.3, 1.3, -0.3,    1.0, 0.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        1.3, 1.3, 0.3,     1.0, 0.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        1.3, -1.3, -0.3,   1.0, 0.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8

        1.3, 1.3, -0.3,     0.0, 0.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        1.3, -1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8
        1.2, -1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7

        1.3, 1.3, -0.3,   0.0, 0.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        1.2, -1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        1.2, 1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6

        1.2, 1.3, -0.3,    1.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        1.2, -1.3, -0.3,    1.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        1.2, -1.3, 0.3,    1.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3

        1.2, 1.3, -0.3,    1.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        1.2, -1.3, 0.3,    1.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        1.2, 1.3, 0.3,    1.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2

        1.2, 1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        1.3, 1.3, -0.3,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        1.2, 1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6

        1.2, 1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        1.3, 1.3, 0.3,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        1.3, 1.3, -0.3,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5

        1.2, -1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        1.2, -1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        1.3, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4

        1.3, -1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4
        1.2, -1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        1.3, -1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8


        //Wall3*******************************************************************

        // -1.2, 1.3, 0.3,   0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        // -1.3, 1.3, 0.3,    0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        // -1.3, -1.3, 0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        // -1.2, -1.3, 0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0 //4

        // -1.2, 1.3, -0.3,   0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        // -1.3, 1.3, -0.3,    0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        // -1.3, -1.3, -0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        // -1.2, -1.3, -0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0 //8        

        -1.2, 1.3, 0.3,   0.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        -1.3, 1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        -1.3, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3

        -1.2, 1.3, 0.3,   0.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        -1.3, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        -1.2, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4

        -1.2, 1.3, 0.3,   1.0, 0.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        -1.2, -1.3, 0.3,    1.0, 0.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4
        -1.2, -1.3, -0.3,    1.0, 0.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8

        -1.2, 1.3, -0.3,   1.0, 0.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        -1.2, 1.3, 0.3,   1.0, 0.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        -1.2, -1.3, -0.3,    1.0, 0.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8

        -1.2, 1.3, -0.3,   0.0, 0.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        -1.2, -1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8
        -1.3, -1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7

        -1.2, 1.3, -0.3,   0.0, 0.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        -1.3, -1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        -1.3, 1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6

        -1.3, 1.3, -0.3,    1.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        -1.3, -1.3, -0.3,    1.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        -1.3, -1.3, 0.3,    1.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3

        -1.3, 1.3, -0.3,    1.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        -1.3, -1.3, 0.3,    1.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        -1.3, 1.3, 0.3,    1.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2

        -1.3, 1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        -1.2, 1.3, -0.3,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        -1.3, 1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6

        -1.3, 1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        -1.2, 1.3, 0.3,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        -1.2, 1.3, -0.3,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5

        -1.3, -1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        -1.3, -1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        -1.2, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4

        -1.2, -1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4
        -1.3, -1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        -1.2, -1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8


        //Wall4*******************************************************************

        // -1.2, 1.3, 0.3,   0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        // -1.3, 1.3, 0.3,    0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        // -1.3, -1.3, 0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        // -1.2, -1.3, 0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0 //4

        // -1.2, 1.3, -0.3,   0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        // -1.3, 1.3, -0.3,    0.0, 1.0, 0.0, 0.5,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        // -1.3, -1.3, -0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        // -1.2, -1.3, -0.3,    0.0, 1.0, 0.0, 0.5,     0.0, 0.0, 0.0, -1.0, 0.0 //8        

        -2.5, 1.3, 0.3,   0.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        -2.6, 1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        -2.6, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3

        -2.5, 1.3, 0.3,   0.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        -2.6, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        -2.5, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4

        -2.5, 1.3, 0.3,   1.0, 0.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        -2.5, -1.3, 0.3,    1.0, 0.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4
        -2.5, -1.3, -0.3,    1.0, 0.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8

        -2.5, 1.3, -0.3,   1.0, 0.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        -2.5, 1.3, 0.3,   1.0, 0.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        -2.5, -1.3, -0.3,    1.0, 0.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8

        -2.5, 1.3, -0.3,   0.0, 0.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        -2.5, -1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8
        -2.6, -1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7

        -2.5, 1.3, -0.3,   0.0, 0.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        -2.6, -1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        -2.6, 1.3, -0.3,    0.0, 0.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6

        -2.6, 1.3, -0.3,    1.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        -2.6, -1.3, -0.3,    1.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        -2.6, -1.3, 0.3,    1.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3

        -2.6, 1.3, -0.3,    1.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6
        -2.6, -1.3, 0.3,    1.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        -2.6, 1.3, 0.3,    1.0, 1.0, 0.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2

        -2.6, 1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        -2.5, 1.3, -0.3,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5
        -2.6, 1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //6

        -2.6, 1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //2
        -2.5, 1.3, 0.3,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //1
        -2.5, 1.3, -0.3,   0.0, 1.0, 1.0, 1.0,     1.0, 0.0, 0.0, -1.0, 0.0, //5

        -2.6, -1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        -2.6, -1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        -2.5, -1.3, 0.3,    0.0, 1.0, 0.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4

        -2.5, -1.3, 0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4
        -2.6, -1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //7
        -2.5, -1.3, -0.3,    0.0, 1.0, 1.0, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //8


        //Floor*******************************************************************

        -20.0, -1.3, 20.0,   0.5, 0.5, 0.5, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //1
        20.0, -1.3, 20.0,   0.5, 0.5, 0.5, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //2
        -20.0, -1.3, -20.0,   0.5, 0.5, 0.5, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3

        20.0, -1.3, 20.0,   0.5, 0.5, 0.5, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //2
        20.0, -1.3, -20.0,   0.5, 0.5, 0.5, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //4
        -20.0, -1.3, -20.0,   0.5, 0.5, 0.5, 1.0,     0.0, 0.0, 0.0, -1.0, 0.0, //3
        

    ];
    
    // Generate a buffer object
    gl.vertexBuffer = gl.createBuffer();
    // Bind buffer as a vertex buffer so we can fill it with data
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
    return testGLError("initialiseBuffers");
}

function initialiseShaders() {

    var fragmentShaderSource = '\
            varying mediump vec4 color; \
            void main(void) \
            { \
                gl_FragColor = 1.0 * color; \
            }';

    gl.fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(gl.fragShader, fragmentShaderSource);
    gl.compileShader(gl.fragShader);
    if (!gl.getShaderParameter(gl.fragShader, gl.COMPILE_STATUS)) {
        alert("Failed to compile the fragment shader.\n" + gl.getShaderInfoLog(gl.fragShader));
        return false;
    }

    var vertexShaderSource = '\
            attribute highp vec3 myVertex; \
            attribute highp vec4 myColor; \
            attribute highp vec2 myUV; \
            attribute highp vec3 myNormal; \
            uniform mediump mat4 Pmatrix; \
            uniform mediump mat4 Vmatrix; \
            uniform mediump mat4 Mmatrix; \
            uniform mediump mat4 Nmatrix; \
            varying mediump vec4 color; \
            varying mediump vec2 texCoord;\
            void main(void)  \
            { \
                gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(myVertex, 1.0);\
                    /* \
                if (gl_Position.w != 0.0) \
                    gl_Position.x /= gl_Position.w; \
                gl_Position.x += 1.0; \
                if (gl_Position.w != 1.0) \
                    gl_Position.x *= gl_Position.w; */ \
                color = myColor;\
                texCoord = myUV; \
            }';

    gl.vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(gl.vertexShader, vertexShaderSource);
    gl.compileShader(gl.vertexShader);
    if (!gl.getShaderParameter(gl.vertexShader, gl.COMPILE_STATUS)) {
        alert("Failed to compile the vertex shader.\n" + gl.getShaderInfoLog(gl.vertexShader));
        return false;
    }

    gl.programObject = gl.createProgram();

    // Attach the fragment and vertex shaders to it
    gl.attachShader(gl.programObject, gl.fragShader);
    gl.attachShader(gl.programObject, gl.vertexShader);

    // Bind the custom vertex attribute "myVertex" to location 0
    gl.bindAttribLocation(gl.programObject, 0, "myVertex");
    gl.bindAttribLocation(gl.programObject, 1, "myColor");
    gl.bindAttribLocation(gl.programObject, 2, "myUV");
    gl.bindAttribLocation(gl.programObject, 3, "myNormal");

    // Link the program
    gl.linkProgram(gl.programObject);

    if (!gl.getProgramParameter(gl.programObject, gl.LINK_STATUS)) {
        alert("Failed to link the program.\n" + gl.getProgramInfoLog(gl.programObject));
        return false;
    }

    gl.useProgram(gl.programObject);

    return testGLError("initialiseShaders");
}

// FOV, Aspect Ratio, Near, Far 
function get_projection(angle, a, zMin, zMax) {
    var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5
    return [
        0.5/ang, 0 , 0, 0,
        0, 0.5*a/ang, 0, 0,
        0, 0, -(zMax+zMin)/(zMax-zMin), -1,
        0, 0, (-2*zMax*zMin)/(zMax-zMin), 0 ];
}



rotValue = 0.0; 
rotValueSmall = 0.0; 
incRotValue = 0.0;
incRotValueSmall = 0.02; 

tempRotValue = 0.0; 

var proj_matrix = get_projection(30, 1.0, 1.0, 20.0);

var frames = 0;

function renderScene() {

    //console.log("rotx " + Md_rotX +"\n");
    frames += 1 ;

    // ****************** set background settings ******************  
    gl.enable(gl.DEPTH_TEST);
    // gl.depthFunc(gl.LEQUAL); 
    // gl.enable(gl.CULL_FACE);
    // gl.enable(gl.BLEND);
    //gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    //gl.blendEquation(gl.FUNC_ADD);

    gl.clearColor(0.6, 0.8, 1.0, 1.0);
    gl.clearDepth(1.0); 
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // ****************** set MVP matrix settings ******************* 
    var Pmatrix = gl.getUniformLocation(gl.programObject, "Pmatrix");
    var Vmatrix = gl.getUniformLocation(gl.programObject, "Vmatrix");
    var Mmatrix = gl.getUniformLocation(gl.programObject, "Mmatrix");
    var Nmatrix = gl.getUniformLocation(gl.programObject, "Nmatrix");

    gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
    
    // ******************* Set camera translate *********************  
    setCamera(Vmatrix);

    // *********************** Draw objects *************************  
    drawCube(Mmatrix);

    // ********** Pinpoint location of Walls *********** 
    gl.uniformMatrix4fv(Mmatrix, false, glMatrix.mat4.create());

    if (!testGLError("gl.uniformMatrix4fv")) {
        return false;
    }
    
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 48, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, gl.FALSE, 48, 12);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 2, gl.FLOAT, gl.FALSE, 48, 28);
    gl.enableVertexAttribArray(3);
    gl.vertexAttribPointer(3, 3, gl.FLOAT, gl.FALSE, 48, 36);

    gl.drawArrays(gl.TRIANGLES, 36, 36);
    gl.drawArrays(gl.TRIANGLES, 72, 36);
    gl.drawArrays(gl.TRIANGLES, 108, 36);
    gl.drawArrays(gl.TRIANGLES, 144, 36);
    gl.drawArrays(gl.TRIANGLES, 180, 6);
    
    
    // ****************** Show Move matrix ****************** 
    document.getElementById("Mmatrix0").innerHTML = mov_matrix[0].toFixed(2);
    document.getElementById("Mmatrix1").innerHTML = mov_matrix[1].toFixed(2);
    document.getElementById("Mmatrix2").innerHTML = mov_matrix[2].toFixed(2);
    document.getElementById("Mmatrix3").innerHTML = mov_matrix[3].toFixed(2);
    document.getElementById("Mmatrix4").innerHTML = mov_matrix[4].toFixed(2);
    document.getElementById("Mmatrix5").innerHTML = mov_matrix[5].toFixed(2);
    document.getElementById("Mmatrix6").innerHTML = mov_matrix[6].toFixed(2);
    document.getElementById("Mmatrix7").innerHTML = mov_matrix[7].toFixed(2);
    document.getElementById("Mmatrix8").innerHTML = mov_matrix[8].toFixed(2);
    document.getElementById("Mmatrix9").innerHTML = mov_matrix[9].toFixed(2);
    document.getElementById("Mmatrix10").innerHTML = mov_matrix[10].toFixed(2);
    document.getElementById("Mmatrix11").innerHTML = mov_matrix[11].toFixed(2);
    document.getElementById("Mmatrix12").innerHTML = mov_matrix[12].toFixed(2);
    document.getElementById("Mmatrix13").innerHTML = mov_matrix[13].toFixed(2);
    document.getElementById("Mmatrix14").innerHTML = mov_matrix[14].toFixed(2);
    document.getElementById("Mmatrix15").innerHTML = mov_matrix[15].toFixed(2);

    // ****************** Show View matrix ****************** 
    document.getElementById("Vmatrix0").innerHTML = view_matrix[0].toFixed(2);
    document.getElementById("Vmatrix1").innerHTML = view_matrix[1].toFixed(2);
    document.getElementById("Vmatrix2").innerHTML = view_matrix[2].toFixed(2);
    document.getElementById("Vmatrix3").innerHTML = view_matrix[3].toFixed(2);
    document.getElementById("Vmatrix4").innerHTML = view_matrix[4].toFixed(2);
    document.getElementById("Vmatrix5").innerHTML = view_matrix[5].toFixed(2);
    document.getElementById("Vmatrix6").innerHTML = view_matrix[6].toFixed(2);
    document.getElementById("Vmatrix7").innerHTML = view_matrix[7].toFixed(2);
    document.getElementById("Vmatrix8").innerHTML = view_matrix[8].toFixed(2);
    document.getElementById("Vmatrix9").innerHTML = view_matrix[9].toFixed(2);
    document.getElementById("Vmatrix10").innerHTML = view_matrix[10].toFixed(2);
    document.getElementById("Vmatrix11").innerHTML = view_matrix[11].toFixed(2);
    document.getElementById("Vmatrix12").innerHTML = view_matrix[12].toFixed(2);
    document.getElementById("Vmatrix13").innerHTML = view_matrix[13].toFixed(2);
    document.getElementById("Vmatrix14").innerHTML = view_matrix[14].toFixed(2);
    document.getElementById("Vmatrix15").innerHTML = view_matrix[15].toFixed(2);

    // ****************** Show Projection matrix ****************** 
    document.getElementById("Pmatrix0").innerHTML = proj_matrix[0].toFixed(2);
    document.getElementById("Pmatrix1").innerHTML = proj_matrix[1].toFixed(2);
    document.getElementById("Pmatrix2").innerHTML = proj_matrix[2].toFixed(2);
    document.getElementById("Pmatrix3").innerHTML = proj_matrix[3].toFixed(2);
    document.getElementById("Pmatrix4").innerHTML = proj_matrix[4].toFixed(2);
    document.getElementById("Pmatrix5").innerHTML = proj_matrix[5].toFixed(2);
    document.getElementById("Pmatrix6").innerHTML = proj_matrix[6].toFixed(2);
    document.getElementById("Pmatrix7").innerHTML = proj_matrix[7].toFixed(2);
    document.getElementById("Pmatrix8").innerHTML = proj_matrix[8].toFixed(2);
    document.getElementById("Pmatrix9").innerHTML = proj_matrix[9].toFixed(2);
    document.getElementById("Pmatrix10").innerHTML = proj_matrix[10].toFixed(2);
    document.getElementById("Pmatrix11").innerHTML = proj_matrix[11].toFixed(2);
    document.getElementById("Pmatrix12").innerHTML = proj_matrix[12].toFixed(2);
    document.getElementById("Pmatrix13").innerHTML = proj_matrix[13].toFixed(2);
    document.getElementById("Pmatrix14").innerHTML = proj_matrix[14].toFixed(2);
    document.getElementById("Pmatrix15").innerHTML = proj_matrix[15].toFixed(2);

    if (!testGLError("gl.drawArrays")) {
        return false;
    }
    return true;
}


var Vi_transX = 0.0;
var Vi_transY = 0.0;
var Vi_transZ = -4.0;

var Vi_rotX = 0.0;
var Vi_rotY = 0.0;
var Vi_rotZ = 0.0;

var view_matrix;

function setCamera(Vmatrix){

    view_matrix = glMatrix.mat4.create();

    glMatrix.mat4.translate(view_matrix, view_matrix, glMatrix.vec3.fromValues(-1*Vi_transX, -1*Vi_transY, -1*Vi_transZ));
    //if(frames % 30 == 0)
     //  console.log(view_matrix);

    glMatrix.mat4.rotateX(view_matrix, view_matrix, -1 * Vi_rotX*(Math.PI/180));
    glMatrix.mat4.rotateY(view_matrix, view_matrix, -1 * Vi_rotY*(Math.PI/180));
    glMatrix.mat4.rotateZ(view_matrix, view_matrix, -1 * Vi_rotZ*(Math.PI/180));
    //if(frames % 30 == 0)
    //    console.log(view_matrix);
    
    glMatrix.mat4.translate(view_matrix, view_matrix, glMatrix.vec3.fromValues(Vi_transX, Vi_transY, Vi_transZ));
    

    glMatrix.mat4.translate(view_matrix, view_matrix, glMatrix.vec3.fromValues(Vi_transX, Vi_transY, Vi_transZ));

    gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
}

var Md_transX = 0.0;
var Md_transY = 0.0;
var Md_transZ = 0.0;

var Md_rotX = 0.0;
var Md_rotY = 0.0;
var Md_rotZ = 0.0;

function drawCube(Mmatrix){

    mov_matrix = glMatrix.mat4.create();

    glMatrix.mat4.translate(mov_matrix, mov_matrix, glMatrix.vec3.fromValues(Md_transX, Md_transY, Md_transZ));
    
    //if(frames % 30 == 0)
    //    console.log(mov_matrix);

    glMatrix.mat4.rotateX(mov_matrix, mov_matrix, Md_rotX*(Math.PI/180));
    glMatrix.mat4.rotateY(mov_matrix, mov_matrix, Md_rotY*(Math.PI/180));
    glMatrix.mat4.rotateZ(mov_matrix, mov_matrix, Md_rotZ*(Math.PI/180));
    //if(frames % 30 == 0)
    //    console.log(mov_matrix);
    
    glMatrix.mat4.translate(mov_matrix, mov_matrix, glMatrix.vec3.fromValues(-1*Md_transX, -1*Md_transY, -1*Md_transZ));

    glMatrix.mat4.translate(mov_matrix, mov_matrix, glMatrix.vec3.fromValues(Md_transX, Md_transY, Md_transZ));
    
    

    gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);

    if (!testGLError("gl.uniformMatrix4fv")) {
        return false;
    }

    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 48, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, gl.FALSE, 48, 12);
    gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 2, gl.FLOAT, gl.FALSE, 48, 28);
    gl.enableVertexAttribArray(3);
    gl.vertexAttribPointer(3, 3, gl.FLOAT, gl.FALSE, 48, 36);


    if (!testGLError("gl.vertexAttribPointer")) {
        return false;
    }

    gl.drawArrays(gl.TRIANGLES, 0, 36);
}




function main() {
    var canvas = document.getElementById("helloapicanvas");
    console.log("Start");

    if (!initialiseGL(canvas)) {
        return;
    }

    if (!initialiseBuffer()) {
        return;
    }

    if (!initialiseShaders()) {
        return;
    }

    // Render loop
    requestAnimFrame = (
    function () {
        //  return window.requestAnimationFrame || window.webkitRequestAnimationFrame 
    //  || window.mozRequestAnimationFrame || 
        return function (callback) {
                // console.log("Callback is"+callback); 
                window.setTimeout(callback, 10, 10); };
    })();

    (function renderLoop(param) {
        if (renderScene()) {
            // Everything was successful, request that we redraw our scene again in the future
            requestAnimFrame(renderLoop);
        }
    })();
}
