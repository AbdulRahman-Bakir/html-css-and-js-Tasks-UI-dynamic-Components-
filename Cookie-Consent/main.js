document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector(".cookieBanner");
  const acceptBtn = document.querySelector(".acceptCookies");
  if (!localStorage.getItem("CookieConsent")) {
    banner.style.display = "block";
  }

  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("CookieConsent", true);
    banner.style.display = "none";
  });
});

document.querySelector(".close-icon").addEventListener("click", function () {
  const banner = document.querySelector(".cookieBanner");
  banner.style.display = "none";
});

document.querySelector(".revokeConsent").addEventListener("click", function () {
    localStorage.removeItem("CookieConsent");
    const banner = document.querySelector(".cookieBanner");
    banner.style.display = "block";

});