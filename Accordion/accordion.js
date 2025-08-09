document.querySelectorAll(".accordion-header").forEach(element =>{
    element.addEventListener("click", function(){
        const content = this.nextElementSibling;
        document.querySelectorAll(".accordion-content").forEach(item => {
            if (item !== content) {
                item.classList.remove("show");
                item.previousElementSibling.querySelector("button").textContent = "∨";
            }
        });
        content.classList.toggle("show");
        const button = this.querySelector("button");
        button.textContent = content.classList.contains("show") ? "∧" : "∨";
    })
})