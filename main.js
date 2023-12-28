const blogPostsSection = document.getElementById("blogPosts");
const pageSize = 3;
let currentPage = 1;
let isLoading = false;

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

    blogPostsSection.insertAdjacentHTML('beforeend', postHTML);
  });

  isLoading = false; // Set isLoading to false after displaying posts
}

function loadMorePosts() {
  if (isLoading) {
    return;
  }

  const postsHeight = blogPostsSection.clientHeight;
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  if (scrollPosition >= postsHeight - windowHeight - 100) {
    isLoading = true;
    currentPage++;
    displayPosts();
  }
}

window.addEventListener("scroll", loadMorePosts);

// Load the initial set of posts when the page is loaded
displayPosts();
