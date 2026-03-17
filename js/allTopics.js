const domain = "https://psitpops.ahaanmedia.com/cms/wp-json/wp/v2";

fetch(`${domain}/categories?per_page=100`)
.then(res => res.json())
.then(categories => {

  const container = document.getElementById("allTopicsGrid");
  const template = document.getElementById("allTopicTemplate");

  if(!container || !template) return;

  container.innerHTML = "";

  categories.forEach(cat => {

    // skip Uncategorized
    if(cat.name === "Uncategorized") return;

    // ACF image check
    if(cat.acf && cat.acf.category_image){

      fetch(`${domain}/media/${cat.acf.category_image}`)
      .then(res => res.json())
      .then(media => {

        const clone = template.content.cloneNode(true);

        const card = clone.querySelector(".topic-card");

        clone.querySelector(".topic-image").src = media.source_url;
        clone.querySelector(".topic-title").innerText = cat.name;

        // redirect to category page
        card.href =
          `category.html?id=${cat.id}&name=${encodeURIComponent(cat.name)}`;

        container.appendChild(clone);

      });

    }

  });

});