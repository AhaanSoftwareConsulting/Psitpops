const API_URL = "https://psitpops.ahaanmedia.com/cms/wp-json/wp/v2/posts?_embed";

fetch(API_URL)
  .then((response) => response.json())
  .then((posts) => {

    const container = document.getElementById("blogs");

    if (!container) {
      console.error("Blog container not found");
      return;
    }

    container.innerHTML = "";

    posts.forEach((post) => {

      let imageHTML = "";

      // featured image check
      if (
        post._embedded &&
        post._embedded["wp:featuredmedia"] &&
        post._embedded["wp:featuredmedia"][0]
      ) {
        const image = post._embedded["wp:featuredmedia"][0].source_url;

        imageHTML = `
          <div class="blog-image">
            <img src="${image}" alt="${post.title.rendered}">
          </div>
        `;
      }

      const blogCard = `
        <div class="blog-card">

          ${imageHTML}

          <div class="blog-content">

            <h2>${post.title.rendered}</h2>

            <div class="blog-excerpt">
              ${post.excerpt.rendered}
            </div>

            <a class="read-more" href="blog-details.html?id=${post.id}">
              Read More
            </a>

          </div>

        </div>
      `;

      container.innerHTML += blogCard;

    });

  })
  .catch((error) => {
    console.error("Error fetching posts:", error);
  });