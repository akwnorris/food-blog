const blogPostsSection = document.getElementById("blogPosts");
const nextButton = document.createElement("button");
nextButton.textContent = "Next";
nextButton.addEventListener("click", nextPage);

const backButton = document.createElement("button");
backButton.textContent = "Back";
backButton.addEventListener("click", prevPage);

blogPostsSection.insertAdjacentElement("afterend", nextButton);
blogPostsSection.insertAdjacentElement("afterend", backButton);

const pageSize = 3;
let currentPage = 1;

async function getPosts() {
  try {
    const response = await fetch('posts.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

async function displayPosts() {
  const posts = await getPosts();
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  blogPostsSection.innerHTML = "";

  paginatedPosts.forEach(post => {
    const postHTML = `
      <article class="blog-post">
        <h3><a href="${post.link}">${post.title}</a></h3>
        <p class="post-meta">Published on ${post.date}</p>
        <p>${post.excerpt}</p>
        <a href="${post.link}">Read More</a>
      </article>
    `;
    blogPostsSection.innerHTML += postHTML;
  });
}

function nextPage() {
  currentPage++;
  displayPosts();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPosts();
  }
}

displayPosts();