function switchHomeLayout() {
  const pageDiv = document.getElementById("page");
  const profileDiv = document.getElementById("profile");
  const layoutCode = document.querySelectorAll("code[id=layout]");

  if (profileDiv.style.display === "none") {
    pageDiv.style.display = "none";
    profileDiv.style.display = "block";
    layoutCode.forEach(function (el) {
      el.innerText = "profile";
    });
  } else {
    pageDiv.style.display = "block";
    profileDiv.style.display = "none";
    layoutCode.forEach(function (el) {
      el.innerText = "page";
    });
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  // 设置初始状态
  const pageDiv = document.getElementById("page");
  const profileDiv = document.getElementById("profile");
  pageDiv.style.display = "none";
  profileDiv.style.display = "block";
  
  document.querySelectorAll("code[id=layout]").forEach(function (el) {
    el.innerText = "profile";
  });

  document.querySelectorAll("#switch-layout-button").forEach((button) =>
    button.addEventListener("click", function (e) {
      e.preventDefault();
      switchHomeLayout();
    })
  );
});
