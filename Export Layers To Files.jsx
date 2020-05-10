#target photoshop

main();

function main() {
    if (app.documents.length == 0) {
        throw "No open documents.";
    }

    var outFile = File.saveDialog("Output prefix (do not include extension)");

    var k = 1;

    var pngOpts = getPngOpts();

    while (k < 999) {
        var frameExists = goToFrame(k);

        if (!frameExists) {
            break;
        }
        
        exportFrame(k, outFile, pngOpts);

        k++;
    }

    return true;
}

function toTypeID(stringID) {
    return app.stringIDToTypeID(stringID);
}

function goToFrame(jumpToFrame) {
    try {
        var desc = new ActionDescriptor();  
        var ref1 = new ActionReference();  
        ref1.putIndex( stringIDToTypeID("animationFrameClass"), jumpToFrame);  
        desc.putReference(charIDToTypeID("null"), ref1);  
        executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);  

        return true;
    } catch(e) { }
     
    return false;
}

function getPngOpts() {
    var pngOpts = new ExportOptionsSaveForWeb; 
    pngOpts.format = SaveDocumentType.PNG
    pngOpts.PNG8 = false; 
    pngOpts.transparency = true; 
    pngOpts.interlaced = false; 
    pngOpts.quality = 100;

    return pngOpts;
}

function exportFrame(frameNum, outFile, pngOpts) {
    var saveFile = File(outFile.fsName + "_" + frameNum + ".png");

    activeDocument.exportDocument(new File(saveFile), ExportType.SAVEFORWEB, pngOpts); 
}

