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

  paginatedPosts.forEach(post => {
    const postHTML = `
      <article class="blog-post">
        <h3><a href="${post.link}">${post.title}</a></h3>
        <p class="post-meta">Published on ${post.date}</p>
        <p>${post.excerpt}</p>
        <a href="${post.link}">Read More</a>
      </article>
    `;

    // Insert each post HTML at the end of blogPostsSection
    blogPostsSection.insertAdjacentHTML('beforeend', postHTML);
  });

  // Update the total number of pages
  totalPages = Math.ceil(posts.length / pageSize);

  // Adjust the display of the pagination buttons
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

// Display the initial posts
displayPosts();
