const uploadIcons = document.querySelectorAll(".button1");
const fileInputs = document.querySelectorAll(".fileinput");
const fileDetails = document.querySelectorAll(".filedetails");
const previews = document.querySelectorAll(".preview");
const fileNames = document.querySelectorAll(".filename");
const removeBtns = document.querySelectorAll(".removebtn");
const fileInstructions = document.querySelectorAll(".fileinstructions");
const fileInstructionsL1 = document.querySelectorAll(".fileinstructionsl1");
const fileInstructionsL2 = document.querySelectorAll(".fileinstructionsl2");

uploadIcons.forEach((icon, index) => {
    icon.addEventListener("click", () => {
        fileInputs[index].click();
    });
    fileInputs[index].addEventListener("change", () => {
        if (fileInputs[index].files.length > 0) {
            const image = fileInputs[index].files[0];
            fileNames[index].textContent = image.name;

            const reader = new FileReader();
            reader.onload = e => {
                previews[index].src = e.target.result;
                previews[index].hidden = false;
            };
            reader.readAsDataURL(image);

            fileDetails[index].hidden = false;
            fileNames[index].hidden = false;
            removeBtns[index].hidden = false;
            uploadIcons[index].hidden = true;
            fileInstructions[index].hidden = true;
            fileInstructionsL1[index].hidden = true;
            fileInstructionsL2[index].hidden = true;
        }
    });
    removeBtns[index].addEventListener("click", () => {
        fileInputs[index].value = "";
        previews[index].src = "";
        previews[index].hidden = true;
        fileNames[index].textContent = "";
        fileNames[index].hidden = true;
        removeBtns[index].hidden = true;
        fileDetails[index].hidden = true;
        uploadIcons[index].hidden = false;
        fileInstructions[index].hidden = false;
        fileInstructionsL1[index].hidden = false;
        fileInstructionsL2[index].hidden = false;
    });
});
function resetForm() {
    const form = document.querySelector('form');
    if (form) form.reset();

    document.querySelectorAll('.fileinput').forEach(inp => {
        inp.value = "";
    });

    document.querySelectorAll('.preview').forEach(img => {
        img.src = '';
        img.hidden = true;
    });

    document.querySelectorAll('.filedetails').forEach(fd => {
        fd.hidden = true;
    });
    document.querySelectorAll('.filename').forEach(fn => {
        fn.textContent = ''; fn.hidden = true;
    });
    document.querySelectorAll('.removebtn').forEach(btn => {
        btn.hidden = true;
    });

    document.querySelectorAll('.fileinstructions').forEach(fi => {
        fi.hidden = false;
    });
    document.querySelectorAll('.fileinstructionsl1').forEach(fi1 => {
        fi1.hidden = false;
    });
    document.querySelectorAll('.fileinstructionsl2').forEach(fi2 => {
        fi2.hidden = false;
    });

    document.querySelectorAll('.button1').forEach(btn => {
        btn.hidden = false;
        btn.disabled = false;
    });
    document.querySelectorAll('.analysis-result').forEach(result => {
        result.style.display = 'none';
    });
}