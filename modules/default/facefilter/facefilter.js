Module.register("facefilter", {
    start: function() {
        Log.info("Starting module: " + this.name);
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

        // tracker
        faceTracker = new clm.tracker();
        faceTracker.init();
        faceTracker.start(videoInput.elt);
    },
 });