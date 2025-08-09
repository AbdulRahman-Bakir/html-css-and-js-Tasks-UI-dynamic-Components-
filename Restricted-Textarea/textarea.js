const textarea = document.getElementById("textarea");
const count = document.getElementById("count");
const maxLength = 250;

textarea.addEventListener("input", function () {
  if (textarea.value.length > maxLength) {
    textarea.value = textarea.value.substring(0, maxLength); // Truncate
  }

  const currentLength = textarea.value.length; // Recalculate after truncation
  document.querySelector("span").textContent = currentLength; // Always update count

  if (currentLength >= maxLength) {
    textarea.style.color = "red";
    textarea.style.borderColor = "red";
    count.style.color = "red";
  } else {
    textarea.style.color = "black";
    textarea.style.borderColor = "black";
    count.style.color = "#666";
  }
});
