const blogPostsSection = document.getElementById("blogPosts");
const paginationContainer = document.querySelector(".pagination-container");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");

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
    const tagsHTML = post.tags.map(tag => `<a href="${tag.link}">${tag.name}</a>`).join(', ');

    const postHTML = `
      <article class="blog-post">
        <h3><a href="${post.link}">${post.title}</a></h3>
        <p class="post-meta">Published on ${post.date}</p>
        <p class="tags">Tags: ${tagsHTML}</p>
        <img src="${post.image}" alt="${post.title} Image">
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
  window.scrollTo(0, 0);
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPosts();
  }
}

nextButton.addEventListener("click", nextPage);
backButton.addEventListener("click", prevPage);

displayPosts();