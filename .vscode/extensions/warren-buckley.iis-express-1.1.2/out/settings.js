"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const vscode = require("vscode");
var clrVersion;
(function (clrVersion) {
    clrVersion[clrVersion["v40"] = "v4.0"] = "v40";
    clrVersion[clrVersion["v20"] = "v2.0"] = "v20";
})(clrVersion = exports.clrVersion || (exports.clrVersion = {}));
var protocolType;
(function (protocolType) {
    protocolType[protocolType["http"] = "http"] = "http";
    protocolType[protocolType["https"] = "https"] = "https";
})(protocolType = exports.protocolType || (exports.protocolType = {}));
function getSettings() {
    //Give some default values
    let settings = {
        port: getRandomPort(),
        path: vscode.workspace.rootPath,
        clr: clrVersion.v40,
        protocol: protocolType.http
    };
    // *******************************************
    // Checks that iisexpress.json exist
    // *******************************************
    let settingsFolderPath = vscode.workspace.rootPath + "\\.vscode";
    let settingsFilePath = settingsFolderPath + "\\iisexpress.json";
    //use -> https://www.npmjs.com/package/jsonfile
    var jsonfile = require('jsonfile');
    let fileExists = false;
    let folderExists = false;
    try {
        fileExists = fs.existsSync(settingsFilePath);
    }
    catch (err) {
        //Error checking if file exists
        //Maybe permissions or something else?
        vscode.window.showErrorMessage('Unable to check if .vscode/iisexpress.json config exists');
    }
    if (fileExists == false) {
        //File does not exist lets create it
        //However we also need to verify that the directory exists as well
        //As writeFile does not create the directories if they do not exist
        try {
            folderExists = fs.existsSync(settingsFolderPath);
        }
        catch (error) {
            //Error checking if folder exists
            //Maybe permissions or something else?
            vscode.window.showErrorMessage('Unable to check if .vscode folder exists');
        }
        if (folderExists == false) {
            //Create the directory so the file can be written
            //create .vscode folder first
            try {
                fs.mkdirSync(settingsFolderPath);
            }
            catch (error) {
                //Error creating the directory - again perhaps a permission error?
                vscode.window.showErrorMessage('Unable to create .vscode folder');
            }
        }
        //jsonfile.writeFile (does not create path/folder if it does not exist)
        //The dir should be available & thus able to now write the file
        jsonfile.writeFile(settingsFilePath, settings, { spaces: 2 }, function (jsonErr) {
            if (jsonErr) {
                console.error(jsonErr);
                vscode.window.showErrorMessage('Error creating iisexpress.json file: ' + jsonErr);
            }
        });
    }
    else {
        //File exists lets read the settings from the JSON file then
        //read file .vscode\iisexpress.json and overwrite port property from iisexpress.json
        settings = jsonfile.readFileSync(settingsFilePath);
    }
    //Return an object back from verifications
    return settings;
}
exports.getSettings = getSettings;
//IIS Express docs recommend ports greater than 1024
//http://www.iis.net/learn/extensions/using-iis-express/running-iis-express-without-administrative-privileges
function getRandomPort() {
    return getRandomIntInclusive(1024, 44399);
}
exports.getRandomPort = getRandomPort;
// Returns a random integer between min (included) and max (included)
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=settings.js.map