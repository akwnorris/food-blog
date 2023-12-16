const blogPostsSection = document.getElementById("blogPosts");

// Create the next and back buttons
const nextButton = document.createElement("button");
nextButton.textContent = "Next";
nextButton.addEventListener("click", nextPage);

const backButton = document.createElement("button");
backButton.textContent = "Back";
backButton.addEventListener("click", prevPage);

// Insert the buttons initially, but hide the back button
blogPostsSection.insertAdjacentElement("afterend", nextButton);
blogPostsSection.insertAdjacentElement("afterend", backButton);
backButton.style.display = "none"; // Hide the back button initially

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

  // Calculate the total pages based on the number of posts
  totalPages = Math.ceil(posts.length / pageSize);

  // Show/hide the next and back buttons based on available posts/pages
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

displayPosts();
