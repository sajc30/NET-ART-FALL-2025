document.addEventListener("DOMContentLoaded", function() {
    const messageElement = document.getElementById("message");
    const buttonElement = document.getElementById("changeButton");
    
    let isChanged = false;
    
    function changeContent() {
        if (!isChanged) {
            messageElement.textContent = "JavaScript is working! The page has been updated.";
            messageElement.style.color = "blue";
            document.body.style.backgroundColor = "lightyellow";
            buttonElement.textContent = "Reset";
            isChanged = true;
        } else {
            messageElement.textContent = "Click the button to see JavaScript in action!";
            messageElement.style.color = "";
            document.body.style.backgroundColor = "";
            buttonElement.textContent = "Change Me!";
            isChanged = false;
        }
    }
    
    buttonElement.addEventListener("click", changeContent);
});
