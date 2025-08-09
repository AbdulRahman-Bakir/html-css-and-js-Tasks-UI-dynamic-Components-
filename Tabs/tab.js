document.querySelectorAll("li").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("li").forEach((activeTab) => {
      activeTab.classList.remove("active");
    });
    document.querySelectorAll(".tab-content").forEach((activeSection) => {
      activeSection.classList.remove("active");
    });
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});
