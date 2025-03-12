const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
    return fetch(url).then(response => {
        return response.json();
    })
}

async function fetchPosts() {
    const responseData = await sendHttpRequest("GET", "https://jsonplaceholder.typicode.com/posts");

    for (const post of responseData) {
        const postEl = document.importNode(postTemplate.content, true);
        postEl.querySelector("h2").textContent = post.title.toUpperCase();
        postEl.querySelector("p").textContent = post.body;
        postEl.querySelector("li").id = post.id;
        listElement.append(postEl);
    }
}

fetchButton.addEventListener("click", fetchPosts);