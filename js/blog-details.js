const params = new URLSearchParams(window.location.search);

const id = params.get("id");

fetch(`/cms/wp-json/wp/v2/posts/${id}`)

.then(res => res.json())

.then(post => {

document.getElementById("blog-content").innerHTML = `

<h1>${post.title.rendered}</h1>

${post.content.rendered}

`;

});