fetch("user.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

function appendData(data) {
  var mainContainer = document.getElementById("test");

  // Sort the blogs in descending order by views
  data.blogs.sort((a, b) => b.views - a.views);

  // Only select the top 10 blogs
  var top10Blogs = data.blogs.slice(0, 10);

  top10Blogs.forEach(function (blog) {
    var div = document.createElement("div");
    div.className = "bg-white rounded-lg shadow-lg";

    var img = document.createElement("img");
    img.src = blog.img;
    img.alt = blog.title;
    img.className = "w-full h-56 object-cover mb-4";

    var contentDiv = document.createElement("div");
    contentDiv.className = "p-6";

    var authorDate = document.createElement("span");
    authorDate.className = "text-sm text-blue-700 font-semibold";
    authorDate.textContent = blog.author + " - " + blog.date;

    var titleLink = document.createElement("a");
    titleLink.href = "#"; // You can specify the actual URL
    titleLink.className = "flex justify-between";
    titleLink.innerHTML =
      "<h3 class='text-2xl font-semibold'>" + blog.title + "</h3>";

    var description = document.createElement("p");
    description.className = "text-gray-500";
    description.textContent = blog.content;

    var categoryDateDiv = document.createElement("div");
    categoryDateDiv.className = "flex mt-6 space-x-2";

    var categorySpan = document.createElement("span");
    categorySpan.className =
      "px-2 py-1 text-sm text-orange-700 font-medium bg-orange-50 rounded-full";
    categorySpan.textContent = blog.category;

    var dateSpan = document.createElement("span");
    dateSpan.className =
      "px-2 py-1 text-sm text-pink-700 font-medium bg-orange-50 rounded-full";
    dateSpan.textContent = blog.date;

    var view = document.createElement("span");
    view.className =
      "px-2 py-1 text-sm text-blue-700 font-medium bg-orange-50 rounded-full";
    view.textContent = blog.views + " Views";

    // Append elements to the grid item
    contentDiv.appendChild(authorDate);
    contentDiv.appendChild(titleLink);
    contentDiv.appendChild(description);
    categoryDateDiv.appendChild(categorySpan);
    categoryDateDiv.appendChild(dateSpan);
    categoryDateDiv.appendChild(view);
    contentDiv.appendChild(categoryDateDiv);

    div.appendChild(img);
    div.appendChild(contentDiv);

    mainContainer.appendChild(div);
  });
}

let tabs = document.querySelectorAll(".tab");
let indicator = document.querySelector(".indicator");
let panels = document.querySelectorAll(".tab-panel");

indicator.style.width = tabs[0].getBoundingClientRect().width + "px";
indicator.style.left =
  tabs[0].getBoundingClientRect().left -
  tabs[0].parentElement.getBoundingClientRect().left +
  "px";

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    let tabTarget = tab.getAttribute("aria-controls");

    indicator.style.width = tab.getBoundingClientRect().width + "px";
    indicator.style.left =
      tab.getBoundingClientRect().left -
      tab.parentElement.getBoundingClientRect().left +
      "px";

    panels.forEach((panel) => {
      let panelId = panel.getAttribute("id");
      if (tabTarget === panelId) {
        panel.classList.remove("invisible", "opacity-0");
        panel.classList.add("visible", "opacity-100");
      } else {
        panel.classList.add("invisible", "opacity-0");
      }
    });
  });
});
