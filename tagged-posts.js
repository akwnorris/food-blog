// tagged-posts.js

// Function to extract the tag from the URL query parameter
function getTagFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('tag');
}

// Function to display filtered posts based on the extracted tag
async function displayFilteredPosts() {
    try {
        const tag = getTagFromURL();
        if (tag) {
            const response = await fetch('posts.json');
            const data = await response.json();
            
            const filteredPosts = data.filter(post => post.tags.includes(tag));

            const filteredPostsSection = document.getElementById('filteredPosts');
            filteredPostsSection.innerHTML = '';

            filteredPosts.forEach(post => {
                const postHTML = `
                    <article class="blog-post">
                        <h3><a href="${post.link}">${post.title}</a></h3>
                        <p class="post-meta">Published on ${post.date}</p>
                        <p class="tags">Tags: <a href="#" class="tag">${post.tags}</a></p>
                        <img src="${post.image}" alt="${post.title} Image">
                        <p>${post.excerpt}</p>
                        <a href="${post.link}">Read More</a>
                    </article>
                `;
                filteredPostsSection.innerHTML += postHTML;
            });
        } else {
            // Handle case when no tag is found in the URL
            const filteredPostsSection = document.getElementById('filteredPosts');
            filteredPostsSection.innerHTML = '<p>No tag specified in the URL.</p>';
        }
    } catch (error) {
        console.error('Error fetching and displaying filtered posts:', error);
    }
}

// Call the function to display filtered posts when the page loads
displayFilteredPosts();
