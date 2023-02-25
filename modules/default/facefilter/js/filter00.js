setInterval(
    function() {
      document.getElementById("lname").value = "";
    }, 9000);


setInterval(
    function() {
      image(videoInput, 0, 0, outputWidth, outputHeight);
      if(document.getElementById("lname").value == "1")
      {
        drawDetectionSquare();
      }
      if(document.getElementById("lname").value == "2")
      {
        drawDogFaceMirror();
      }
      if(document.getElementById("lname").value == "3")
      {
        drawSpidermanMaskMirror();
      }
    }, 50);


let newsIterator =1;


let outputWidth;
let outputHeight;

let faceTracker; // Face Tracking
let videoInput

let imgDetectionSquare; // detection Mask Filter
let imgDogEarRight, imgDogEarLeft, imgDogNose; // Dog Face Filter

let selected = -1; // Default no filter

let cnv;
let videocamara;
var CameraIsPlay = true;
/*
 * **p5.js** library automatically executes the `preload()` function. Basically, it is used to load external files. In our case, we'll use it to load the images for our filters and assign them to separate variables for later use.
 */

function preload() {
    //Spider Man Filter assets
    imgSpidermanMask = loadImage("https://i.ibb.co/9HB2sSv/spiderman-mask-1.png");
    // DetectionSquare Mask Filter asset
    imgDetectionSquare = loadImage("https://i.ibb.co/nQcTyRL/Detection-Square.png");
    // Dog Face Filter assets for regular and dark mode
    imgDogEarRight = loadImage("https://i.ibb.co/bFJf33z/dog-ear-right.png");
    imgDogEarLeft = loadImage("https://i.ibb.co/dggwZ1q/dog-ear-left.png");
    imgDogNose = loadImage("https://i.ibb.co/PWYGkw1/dog-nose.png");

}

/**
 * In p5.js, `setup()` function is executed at the beginning of our program, but after the `preload()` function.
 */
function setup() {
    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    outputWidth = maxWidth;
    outputHeight = maxWidth * 0.75; // 4:3

    cnv = createCanvas(outputWidth, outputHeight);
    cnv.parent('miCamara');

    // webcam capture
    videoInput = createCapture(VIDEO); //document.getElementById('miCamara');
    videoInput.parent('miCamara');
    videoInput.size(outputWidth, outputHeight);
    videocamara = videoInput;
    videoInput.hide();

    // select filter
    const sel = select('#filtrosDisponibles');
    const selectList = ['Detection Square', 'Dog Filter']; // list of filters
    sel.option('Select Filter', -1); // Default no filter
    for (let i = 0; i < selectList.length; i++) {
        sel.option(selectList[i], i);
    }
    sel.changed(applyFilter);

    // tracker
    faceTracker = new clm.tracker();
    faceTracker.init();
    faceTracker.start(videoInput.elt);
}

// callback function
function applyFilter() {
    selected = this.selected(); // change filter type
}

/*
 * In p5.js, draw() function is executed after setup(). This function runs inside a loop until the program is stopped.
 */
function draw() {

    image(videoInput, 0, 0, outputWidth, outputHeight); // render video from webcam

    // apply filter based on choice
    switch (selected) {
        case '-1':
            break;
        case '0':
            drawDetectionSquare();
            break;
        case '1':
            drawDogFace();
            break;
        case '2':
            drawFilterInstagram(2);
            break;
        case '3':
            drawFilterInstagram(3);
            break;
        case '4':
            drawFilterInstagram(4);
            break;
        case '5':
            drawFilterInstagram(5);
            break;
        case '6':
            drawFilterInstagram(6);
            break;
        case '7':
            drawFilterInstagram(7);
            break;
        case '8':
            drawFilterInstagram(8);
            break;
        case '9':
            drawFilterInstagram(9);
            break;
	case '11':
	    drawDogFaceMirror();
	    break;
	case '12':
	    drawSpidermanMask();
        break;
    case '13':
            drawSpidermanMaskMirror();
            break;
    }
}

//spiderman face filter
function drawSpidermanMask()
{
  const positions = faceTracker.getCurrentPosition();
  if (positions !== false)
  {
    push();
    const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.2; // The width is given by the face width, based on the geometry
    const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.2; // The height is given by the distance from nose to chin, times 2
    translate(-wx/2, -wy/2);
    image(imgSpidermanMask, positions[62][0], positions[62][1], wx, wy); // Show the mask at the center of the face
    pop();
  }
}

//spiderman face filter
function drawSpidermanMaskMirror()
{
  const positions = faceTracker.getCurrentPosition();
  filter(THRESHOLD);
  if (positions !== false)
  {
    push();
    const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.2; // The width is given by the face width, based on the geometry
    const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.2; // The height is given by the distance from nose to chin, times 2
    translate(-wx/2, -wy/2);
    image(imgSpidermanMask, positions[62][0], positions[62][1], wx, wy); // Show the mask at the center of the face
    pop();
  }
}

function previewFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}

// Detection Square Mask Filter
function drawDetectionSquare() {
    const positions = faceTracker.getCurrentPosition();
    if (positions !== false) {
        push();
        const wx = Math.abs(positions[13][0] - positions[1][0]) * 1.2; // The width is given by the face width, based on the geometry
        const wy = Math.abs(positions[7][1] - Math.min(positions[16][1], positions[20][1])) * 1.2; // The height is given by the distance from nose to chin, times 2
        translate(-wx / 2, -wy / 2);
        image(imgDetectionSquare, positions[62][0], positions[62][1], wx, wy); // Show the mask at the center of the face
        pop();
    }
}

// Dog Face Filter
function drawDogFace() {
    const positions = faceTracker.getCurrentPosition();
	if (positions !== false) {
        if (positions.length >= 20) {
            push();
            translate(-100, -150); // offset adjustment
            image(imgDogEarRight, positions[20][0], positions[20][1]);
            pop();
        }

        if (positions.length >= 16) {
            push();
            translate(-20, -150); // offset adjustment
            image(imgDogEarLeft, positions[16][0], positions[16][1]);
            pop();
        }

        if (positions.length >= 62) {
            push();
            translate(-57, -20); // offset adjustment
            image(imgDogNose, positions[62][0], positions[62][1]);
            pop();
        }
    }
}

// Dog Face Filter with Mirror
function drawDogFaceMirror() {
    const positions = faceTracker.getCurrentPosition();
     filter(THRESHOLD);
        if (positions !== false) {
        if (positions.length >= 20) {
            push();
            translate(-100, -150); // offset adjustment
            image(imgDogEarRight, positions[20][0], positions[20][1]);
            pop();
        }

        if (positions.length >= 16) {
            push();
            translate(-20, -150); // offset adjustment
            image(imgDogEarLeft, positions[16][0], positions[16][1]);
            pop();
        }

        if (positions.length >= 62) {
            push();
            translate(-57, -20); // offset adjustment
            image(imgDogNose, positions[62][0], positions[62][1]);
            pop();
        }
    }
}

function drawFilterInstagram(numero) {
    //Lo programe como filter(filterType, [filterParam])
    if (numero == 2) {
        filter(GRAY);
    }
    if (numero == 3) {
        filter(THRESHOLD);
    }
    if (numero == 4) {
        filter(OPAQUE);
    }
    if (numero == 5) {
        filter(POSTERIZE, 3);
    }
    if (numero == 6) {
        filter(DILATE);
    }
    if (numero == 7) {
        filter(BLUR, 3);
    }
    if (numero == 8) {
        filter(ERODE);
    }
    if (numero == 9) {
        filter(INVERT);
    }
    if (numero == 10) {

    }
}

function windowResized() {
    const maxWidth = Math.min(windowWidth, windowHeight);
    pixelDensity(1);
    outputWidth = maxWidth;
    outputHeight = maxWidth * 0.75; // 4:3
    resizeCanvas(outputWidth, outputHeight);
}

function pauseCamera() {
    if (CameraIsPlay == true) { CameraIsPlay = false; } else { CameraIsPlay = true; }
    console.log(CameraIsPlay);
    if (CameraIsPlay == true) {
        videocamara.play();
        document.getElementById('btn_Camera').innerText = "Camera:ON";
        bandera = true;
    } else {
        document.getElementById('btn_Camera').innerText = "Camera:OFF";
        videocamara.pause();
        bandera = false;
    }
}

function uploadPhoto() {
    location.href = "photo.html";
}



function saveImages() {
    saveCanvas(cnv);
}

function displayTime(){
    var dateTime = new Date();
    var hrs = dateTime.getHours();
    var min = dateTime.getMinutes();
    var sec = dateTime.getSeconds();
    var session = document.getElementById('session');

    if(hrs >= 12){
        session.innerHTML = 'PM';
    }else{
        session.innerHTML = 'AM';
    }

    if(hrs > 12){
        hrs = hrs - 12;
    }

    if(min<10)
    {
        min = "0" + min.toString();
    }

    document.getElementById('hours').innerHTML = hrs;
    document.getElementById('minutes').innerHTML = min;
    
}
setInterval(displayTime, 10);
setInterval(displayDate, 10);
setInterval(checkWeather, 10000);//needs optimiszation
let iterator = 0;
setInterval(compliments,10000);
setInterval(getNews,7000);


function displayDate(){
    var dateTime = new Date();
    var Month = dateTime.getMonth()+1;
    var Year = dateTime.getFullYear();
    var Day = dateTime.getDate();
    var session = document.getElementById('session');


    document.getElementById('Month').innerHTML = Month;
    document.getElementById('Day').innerHTML = Day;
    document.getElementById('Year').innerHTML = Year;
}


function checkWeather() {
    //let xGrid = gridX.toString();
    //let yGrid = gridY.toString();
    //let url = "https://api.weather.gov/gridpoints/TOP/95,43/forecast/hourly";
    fetch('https://api.weather.gov/gridpoints/TOP/95,43/forecast/hourly')
  .then(data => data.json())
  .then(data => {
/*    const weather_data = data
      .properties
      .periods[1].temperature;
    main(weather_data);*/

	let weather_data = [];
	//let added_temperature = 0;
	weather_data[0] = data.properties.periods[0].temperature;


	//average_weather  =  Math.round((average_weather + Number.EPSILON)*100)/100
	document.getElementById('Temperature').innerHTML = weather_data;
  });
  }

  function compliments() {

    
    let morning_compliments = ["Good morning!", "Enjoy your day!", "How was your sleep?","You are looking good!"];
    let afternoon_compliments = ["Good afternoon!", "You are looking great!", "Looking good today!"];
    let evening_compliments = ["Good Evening!","Still looking good!", "You look nice!", "Hey there!"];
    
    var dateTime = new Date();

    let theCompliment = "";

    if(dateTime.getHours()<12 && dateTime.getHours()>3)
    {
        theCompliment = morning_compliments[iterator%4];
        if (iterator ==4)
        {
            iterator=0;
        }
        iterator++;
    }
    if(dateTime.getHours()>=12 && dateTime.getHours()<17)
    {
        theCompliment = afternoon_compliments[iterator%3];
        if (iterator ==3)
        {
            iterator=0;
        }
        iterator++;
    }
    else if (dateTime.getHours()>=17 || dateTime.getHours()<=3)
    {
        theCompliment = evening_compliments[iterator%4];
        if (iterator ==4)
        {
            iterator=0;
        }
        iterator++;
    }

	//average_weather  =  Math.round((average_weather + Number.EPSILON)*100)/100
	document.getElementById('complement').innerHTML = theCompliment;

}


function getNews()
{

fetch('https://rss.nytimes.com/services/xml/rss/nyt/PersonalTech.xml')
  .then(response => response.text())
  .then(xml => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const items = xmlDoc.getElementsByTagName('item');
    

    const titles = [];
    for (let i = 0; i < items.length; i++) {
        const title = items[i].getElementsByTagName('title')[0].textContent;
        titles.push(title);
    }


    let firstTitle = "Hello";
    if(newsIterator<items.length)
    {
        firstTitle = titles[newsIterator];
        newsIterator++;
    }
    else 
    {
        firstTitle = titles[0];
        newsIterator = 0;
    }
    document.getElementById('newsTitle').innerHTML = firstTitle;
  })
  .catch(error => console.error(error));

}
