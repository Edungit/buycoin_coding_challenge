const profile_image = document.querySelector(".profile_image");
const profile_search = document.querySelector(".profile_search");
const username = document.querySelector(".username");
const bio = document.querySelector(".bio");
const repository_count = document.querySelector(".repository_count");
const public_repository_count = document.querySelector(
 ".public_repository_count"
);
const public_repositories_container = document.querySelector(
 ".public_repositories"
);

let profile = {};
const months = [
 "month",
 "Jan",
 "Feb",
 "Mar",
 "Apr",
 "May",
 "Jun",
 "Jul",
 "Aug",
 "Sep",
 "Oct",
 "Nov",
 "Dec",
];

const base_url = "https://api.github.com/graphql";
const method = "POST";
const token = "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";

const update_DOM = (profile) => {
  username.innerHTML = `${profile.name !== null ? profile.name : ""}`
  bio.innerHTML = `${profile.bio !== null ? profile.bio : ""}`
 repository_count.innerHTML = profile.repositories.totalCount;
 profile_image.setAttribute("src", profile.avatarUrl);
 const public_repo_list = (repo) => {
  let el = document.createElement("div");
  el.classList.add("public_repo_list_item");
  el.innerHTML = `
        <div class="repo_list_item_left">
        <h4 class="repo_list_item_title">${
         repo.name !== null ? repo.name : ""
        }</h4>
        <p class="repo_list_item_desc">${
         repo.description !== null ? repo.description : ""
        }</p>
        <span class="repo_list_item_sub">${
         repo.primaryLanguage !== null ? repo.primaryLanguage.name : ""
        }</span>
        <span class="repo_list_item_sub"><i class="fas fa-star"></i> ${
         repo.stargazerCount
        }</span>
        <span class="repo_list_item_sub"><i class="fas fa-code-branch"></i> ${
         repo.forkCount
        }</span>
        <span class="repo_list_item_sub">Updated on ${
         repo.updatedAt.split("-").splice(1, 2).reverse()[0].split("T")[0]
        } ${
   months[
    repo.updatedAt.split("-").splice(1, 2).reverse()[1].replace(/^0+/, "")
   ]
  }</span>
        </div>
        <div class="repo_list_item_right">
          <button><i class="fas fa-star"></i> Star</button>
        </div>
        `;
  return el;
 };
 public_repositories_container.innerHTML = ''
 profile.repositories.nodes.map((repo) => {
  const el = public_repo_list(repo);
  public_repositories_container.append(el);
 });
};

const api_request = (req_user) => {
 fetch("https://api.github.com/graphql", {
  method: `${method}`,
  headers: {
   "Content-Type": "application/json",
   Authorization: `bearer ${token}`,
  },
  body: JSON.stringify({
   query: `query{
        user(login: "${req_user}") {
          name
          avatarUrl
          bio
          twitterUsername
          followers{
            totalCount
          }
          following{
            totalCount
          }
          repositories(last:20){
            totalCount
            nodes{
              name,
              isPrivate
              pullRequests{
                totalCount
              }
              description
              updatedAt,
              forkCount
              stargazerCount
              primaryLanguage{
                name
              }
            }
          }
          contributionsCollection{
            totalCommitContributions
            totalIssueContributions
          }
          }
        }`,
  }),
 })
  .then((res) => res.json())
  .then((data) => {
   profile = {};
   profile = data.data.user;
   console.log(data);
   update_DOM(profile);
  });
};

api_request("edungit");

profile_search.addEventListener("keydown", (event) => {
 if (event.keyCode === 13) {
  console.log(event.keyCode);
  api_request(profile_search.value);
 }
});


const mobile_menu_toggle = document.querySelector('.mobile_menu_toggle')
const mobile_menu = document.querySelector('.mobile_menu')
mobile_menu_toggle.addEventListener('click', (e)=>{
  e.target.classList.toggle('open')
  mobile_menu.classList.toggle('open')
})
