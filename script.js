const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInp = form.querySelector("input"),
infoText = form.querySelector("p"),
copyBtn = wrapper.querySelector(".copy"),
closeBtn = wrapper.querySelector(".close");


function fetchRequest(formData, file){
    infoText.innerText = "Scanning QR Code...";

    fetch("http://api.qrserver.com/v1/read-qr-code/",{
         //sending POST request to qr server api with passing
         // form data as body and getting response from it 
        method: "POST" , body: formData  
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Scanner QR Code..." : "Couldn't Scan QR Code";
        if(!result) return;
        wrapper.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        infoText.innerText = "Upload QR Code to Scan";
        wrapper.classList.add("active");  // Adding active class to wrapper once api sent response
        
    });
}

fileInp.addEventListener("change", e => {
    let file = e.target.files[0];  // getting user selected file   
    if(!file) return;     
    formData = new FormData();     // creating a new FormData object
    formData.append("file" , file);  // adding selected file to form to formData
    fetchRequest(formData, file);
});

copyBtn.addEventListener("click",() =>{
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
    // writeText() property writes the specified text string to the system clipboard 
});
form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));
// It will make upload icon capabel of taking file from user by clicking on it