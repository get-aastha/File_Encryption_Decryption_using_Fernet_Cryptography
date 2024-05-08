function showUploadForm(fileType) {
document.getElementById("fileType").textContent = "Encrypt/Decrypt " + fileType.toUpperCase() + " File";
document.getElementById("uploadForm").style.display = "block";
}

function encryptDecrypt() {
var fileInput = document.getElementById("fileInput");
var file = fileInput.files[0];
if (file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var encryptionOption = document.querySelector('input[name="encryptionOption"]:checked').value;
        var encryptedDecryptedFile = encryptDecryptFile(e.target.result, encryptionOption, file.name);
        var downloadLabel = document.getElementById("downloadLabel");
        var fileTypeLabel = document.getElementById("fileTypeLabel");
        var downloadLink = document.getElementById("downloadLink");

        fileTypeLabel.textContent = (encryptionOption === "encrypt" ? "Encrypted" : "Decrypted");
        downloadLabel.style.display = "block";
        fileTypeLabel.style.fontWeight = "bold";
        downloadLink.style.display = "inline-block";
        downloadLink.textContent = (encryptionOption === "encrypt" ? "Download Encrypted File" : "Download Decrypted File");
        downloadLink.href = URL.createObjectURL(encryptedDecryptedFile);
        downloadLink.download = (encryptionOption === "encrypt" ? "encrypted_" : "decrypted_") + file.name;
    };
    reader.readAsArrayBuffer(file);
}

}

function encryptDecryptFile(fileData, encryptionOption, fileName) {
var key = 7; // Key for the Fermat cipher
var uint8Array = new Uint8Array(fileData);

for (var i = 0; i < uint8Array.length; i++) {
    if (encryptionOption === "encrypt") {
        uint8Array[i] = (uint8Array[i] + key) % 256;
    } else {
        uint8Array[i] = (uint8Array[i] - key + 256) % 256;
    }
}

return new Blob([uint8Array], { type: getFileMimeType(fileName) });

}

function getFileMimeType(fileName) {
var mimeType;
var extension = fileName.split(".").pop().toLowerCase();

switch (extension) {
    case "mp3":
        mimeType = "audio/mpeg";
        break;
    case "wav":
        mimeType = "audio/wav";
        break;
    case "ogg":
        mimeType = "audio/ogg";
        break;
    case "mp4":
        mimeType = "video/mp4";
        break;
    case "webm":
        mimeType = "video/webm";
        break;
    case "jpg":
    case "jpeg":
        mimeType = "image/jpeg";
        break;
    case "png":
        mimeType = "image/png";
        break;
    default:
        mimeType = "application/octet-stream";
}

return mimeType;

}
function showUploadForm(fileType) {
document.getElementById("fileType").textContent = "Encrypt/Decrypt " + fileType.toUpperCase() + " File";
document.getElementById("uploadForm").style.display = "block";

// Remove "selected" class from all buttons
var buttons = document.querySelectorAll("#menu button");
buttons.forEach(button => button.classList.remove("selected"));

// Add "selected" class to the clicked button
event.currentTarget.classList.add("selected");

}