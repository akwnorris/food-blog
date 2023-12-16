const blogPostsSection = document.getElementById("blogPosts");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");

const pageSize = 3; // Number of posts per page
let currentPage = 1;
let totalPages = 0;
let postsData = []; // Store all fetched posts

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
  postsData = await getPosts(); // Fetch posts and store them

  // Calculate total pages based on total posts and page size
  totalPages = Math.ceil(postsData.length / pageSize);

  // Display initial posts on first page
  displayCurrentPage();
}

function displayCurrentPage() {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPagePosts = postsData.slice(startIndex, endIndex);

  // Clear the blog posts section
  blogPostsSection.innerHTML = "";

  // Render current page's posts
  currentPagePosts.forEach(post => {
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

  // Show/hide pagination buttons based on current page
  backButton.style.display = currentPage === 1 ? "none" : "inline-block";
  nextButton.style.display = currentPage === totalPages ? "none" : "inline-block";
}

function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    displayCurrentPage();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayCurrentPage();
  }
}

nextButton.addEventListener("click", nextPage);
backButton.addEventListener("click", prevPage);

displayPosts();