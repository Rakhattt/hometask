"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const childProcess = require("child_process");
const https = require("https");
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
function OpenDownloadPage() {
    //Open a browser to the IIS 10 Express download page for them to do it themselves
    childProcess.exec('start https://www.microsoft.com/en-us/download/details.aspx?id=48264');
}
exports.OpenDownloadPage = OpenDownloadPage;
function DoMagicInstall() {
    //Determine Process 64bit or 32bit
    //So we get correct installer file from MS download site
    var processor = WhatProcessor();
    FetchDownloadFile(processor).then(function (fileDownloadPath) {
        //Execute the installer - once we know its been downloaded
        InstallTime(fileDownloadPath).then(function () {
            vscode.window.showInformationMessage('IIS Express has been successfully installed and is ready to use');
        })
            .catch(function (error) {
            //Problem with the child process excuting the MSI install
            vscode.window.showErrorMessage(`There was a problem trying to install IIS Express: ${error.message}`);
        });
    }).catch(function (error) {
        //Problem downloading the installer file...
        vscode.window.showErrorMessage(error);
    });
}
exports.DoMagicInstall = DoMagicInstall;
function WhatProcessor() {
    //Should be amd64 or x86
    return process.env.PROCESSOR_ARCHITECTURE;
}
function FetchDownloadFile(processor) {
    return new Promise((resolve, reject) => {
        //URL & HTTPS config to fetch file
        const options = {
            hostname: 'download.microsoft.com',
            port: 443,
            path: `/download/C/E/8/CE8D18F5-D4C0-45B5-B531-ADECD637A1AA/iisexpress_${processor}_en-US.msi`,
            method: 'GET'
        };
        var request = https.get(options, function (response) {
            if (response.statusCode !== 200) {
                reject(`The request to download IIS Express installer file returned a ${response.statusCode}`);
                return;
            }
            var filePath = path.join(process.env.TEMP, `iisexpress_${processor}_en-US.msi`);
            var file = fs.createWriteStream(filePath);
            //Saves the response into the file
            response.pipe(file);
            file.on('finish', function () {
                file.close();
                //Successfully closed connection & file been downloaded
                resolve(filePath);
            });
        });
        request.on('error', function (error) {
            reject(error);
        });
    });
}
;
function InstallTime(installerFilePath) {
    return new Promise((resolve, reject) => {
        //Execute a cmd line install with the -passive switch on the MSI
        const installer = childProcess.spawn('cmd.exe', ['/c', installerFilePath, '-passive']);
        installer.on('error', (error) => {
            reject(error);
            return;
        });
        installer.on('exit', () => {
            resolve();
        });
    });
}
//# sourceMappingURL=install.js.map