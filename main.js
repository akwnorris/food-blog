const blogPostsSection = document.getElementById("blogPosts");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");

const pageSize = 3;
let currentPage = 1;
let totalPages = 0;

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

  totalPages = Math.ceil(posts.length / pageSize);

  if (currentPage === 1) {
    backButton.style.display = "none";
  } else {
    backButton.style.display = "inline-block";
  }

  if (currentPage === totalPages) {
    nextButton.style.display = "none";
  } else {
    nextButton.style.display = "inline-block";
  }
}

function nextPage() {
  currentPage++;
  displayPosts();
}

function prevPage() {
  currentPage--;
  displayPosts();
}

nextButton.addEventListener("click", nextPage);
backButton.addEventListener("click", prevPage);

displayPosts();
