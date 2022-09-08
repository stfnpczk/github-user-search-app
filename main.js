const form = document.getElementById("form");
const username = document.getElementById("user-name");
const searchButton = document.getElementById("search-button");

const searchInput = document.getElementById("user-name");
const userprofile = document.getElementById("card");

const formatDate = (date) => {
  const event = new Date(date);
  const options = { month: "short" };
  const year = event.getFullYear();
  const month = new Intl.DateTimeFormat("en-US", options).format(event);
  const day = event.getDate();

  return `Joined ${day} ${month} ${year}`;
};

const checkAvailability = () => {
  const intel = document.querySelectorAll(".card__intel");
  intel.forEach((ele) => {
    if (ele.outerText == "Not available") {
      ele.classList.add("gray");
    } else {
      ele.classList.remove("gray");
    }
  });
};

const createLink = (url) => {
  if (blog.innerText != "Not available") {
    blog.setAttribute("href", url);
  } else {
    blog.removeAttribute("href");
  }
};

const displayError = () => {
  form.classList.add("error");
};

const removeError = () => {
  form.classList.remove("error");
};

async function getUserData(username) {
  let response = await fetch(`https://api.github.com/users/${username}`);
  let userData = await response.json();
  if (userData.message) return null;
  return userData;
}

const updateDom = (user) => {
  const apiData = {
    image: document.getElementById("image"),
    name: document.getElementById("card-name"),
    login: document.getElementById("login"),
    joined: document.getElementById("joindate"),
    bio: document.getElementById("bio"),
    stats: {
      repos: document.getElementById("repos"),
      followers: document.getElementById("followers"),
      following: document.getElementById("following"),
    },
    location: document.getElementById("location"),
    blog: document.getElementById("blog"),
    twitter: document.getElementById("twitter"),
    company: document.getElementById("company"),
  };

  apiData.image.src = user.avatar_url;
  apiData.name.innerHTML = user.name || user.login;
  apiData.login.innerHTML = `@${user.login}`;
  apiData.joined.innerHTML = formatDate(user.created_at);
  apiData.bio.innerHTML = user.bio || "This profile has no bio";

  apiData.stats.repos.innerHTML = user.public_repos;
  apiData.stats.followers.innerHTML = user.followers;
  apiData.stats.following.innerHTML = user.following;

  apiData.location.innerHTML = user.location || "Not available";
  apiData.blog.innerHTML = user.blog || "Not available";
  apiData.twitter.innerHTML = user.twitter_username || "Not available";
  apiData.company.innerHTML = user.company || "Not available";
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const userData = await getUserData(searchInput.value);
  if (!userData) {
    displayError();
  } else {
    removeError();
    updateDom(userData);
    checkAvailability();
    createLink(userData.blog);
  }
});

form.addEventListener("input", () => {
  if (form.classList.contains("error")) {
    removeError();
  }
});

// color theme switcher
const toggleSwitch = document.getElementById("switch");
const toggleWord = document.getElementById("toggle-word");

const toggleSvg = document.getElementById("toggle-svg");
const togglePath = document.getElementById("toggle-path");

const sun =
  "M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z";

const moon =
  "M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z";

const changePath = (svg, path) => {
  svg.setAttribute("d", path);
};

const toggleColorTheme = (e) => {
  toggleSwitch.classList.toggle("theme-switch");

  if (e.currentTarget.classList.contains("theme-switch")) {
    document.body.className = "dark-theme";
    toggleWord.innerHTML = "LIGHT";
    changePath(togglePath, sun);
  } else {
    document.body.className = "light-theme";
    toggleWord.innerHTML = "DARK";
    changePath(togglePath, moon);
  }
};

toggleSwitch.addEventListener("click", toggleColorTheme);
