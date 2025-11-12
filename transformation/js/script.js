document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById("container");
    const title = document.getElementById("title");
    const subtitle = document.getElementById("subtitle");
    const sectionTitle = document.getElementById("section-title");
    const description = document.getElementById("description");
    const instructionsSection = document.getElementById("instructionsSection");
    const instructionsTitle = document.getElementById("instructions-title");
    const interactiveZone = document.getElementById("interactiveZone");
    const transformButton = document.getElementById("transformButton");
    const footerText = document.getElementById("footer-text");
    const elements = document.querySelectorAll(".element");
    const body = document.body;
    
    let isTransformed = false;
    let clickCount = 0;
    
    function applyTransformation() {
        isTransformed = true;
        clickCount = 0; 
        
        body.classList.add("transformed");
        container.classList.add("transformed");
        title.classList.add("transformed");
        subtitle.classList.add("transformed");
        sectionTitle.classList.add("transformed");
        description.classList.add("transformed");
        instructionsSection.classList.add("transformed");
        instructionsTitle.classList.add("transformed");
        interactiveZone.classList.add("transformed");
        transformButton.classList.add("transformed");
        footerText.classList.add("transformed");
        
        container.style.transform = "";
        title.style.fontSize = "";
        
        title.textContent = "PARTY TIME!!!";
        subtitle.textContent = "LET'S GET WILD AND CRAZY!!!";
        sectionTitle.textContent = "ABOUT THE CHAOS";
        description.textContent = "Welcome to the most EPIC and INSANE webpage ever created! This is where rules don't exist and FUN is the only priority! Get ready for a WILD ride!";
        instructionsTitle.textContent = "HOW TO PARTY!!!";
        transformButton.textContent = "MORE CHAOS!!!";
        footerText.textContent = "© 2025 CHAOS MODE ACTIVATED ";
        
        elements.forEach((element, index) => {
            element.classList.add("transformed");
            const randomX = Math.random() * 200 - 100;
            const randomY = Math.random() * 200 - 100;
            element.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
        });
    }
    
    function removeTransformation() {
        isTransformed = false;
        
        body.classList.remove("transformed");
        container.classList.remove("transformed");
        title.classList.remove("transformed");
        subtitle.classList.remove("transformed");
        sectionTitle.classList.remove("transformed");
        description.classList.remove("transformed");
        instructionsSection.classList.remove("transformed");
        instructionsTitle.classList.remove("transformed");
        interactiveZone.classList.remove("transformed");
        transformButton.classList.remove("transformed");
        footerText.classList.remove("transformed");
        
        title.textContent = "Professional Portfolio";
        subtitle.textContent = "Excellence in Design & Development";
        sectionTitle.textContent = "About";
        description.textContent = "Welcome to a space of refined creativity and professional excellence. Here, we maintain the highest standards of quality and precision.";
        instructionsTitle.textContent = "How to Interact";
        transformButton.textContent = "Click to Transform";
        footerText.textContent = "© 2025 Professional Services";
        
        elements.forEach((element) => {
            element.classList.remove("transformed");
            element.style.transform = "";
        });
        
        container.style.transform = "";
        title.style.fontSize = "";
        
        clickCount = 0;
    }
    
    transformButton.addEventListener("click", function() {
        if (!isTransformed) {
            applyTransformation();
        } else {
            clickCount++;
            if (clickCount === 1) {
                container.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(1.1)`;
            } else if (clickCount === 2) {
                container.style.transform = `rotate(${Math.random() * 30 - 15}deg) scale(1.2)`;
                title.style.fontSize = "4.5em";
            } else {
                container.style.transform = `rotate(${Math.random() * 40 - 20}deg) scale(1.3)`;
                title.style.fontSize = "5.5em";
                description.textContent = "MAXIMUM CHAOS MODE!!! EVERYTHING IS SPINNING AND EXPLODING WITH COLOR!!!";
            }
        }
    });
    
    elements.forEach((element) => {
        element.addEventListener("mouseenter", function() {
            if (!isTransformed) {
                applyTransformation();
            } else {
                element.style.animation = "spin 0.5s linear infinite, colorChange 0.3s ease infinite";
            }
        });
    });
    
    let scrollTimeout;
    window.addEventListener("scroll", function() {
        if (!isTransformed && window.scrollY > 50) {
            applyTransformation();
        }
        
        clearTimeout(scrollTimeout);
    });
    
    document.addEventListener("keydown", function(event) {
        if (event.key.toLowerCase() === 't') {
            if (isTransformed) {
                removeTransformation();
            } else {
                applyTransformation();
            }
        }
    });
});

