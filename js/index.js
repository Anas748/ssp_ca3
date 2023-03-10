// javascript for index.html
const container = document.querySelector('.blogs');
const searchForm = document.querySelector('.search');

const renderPosts = async (term) => {
    let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc';
    if (term) {
        uri += `&q=${term}`;
    }
    const res = await fetch(uri);
    const posts = await res.json();
    let template = '';
    posts.forEach(post => {
        template += `
            <div class="post">
                <h1>${post.title}</h1>
               
                <p>${post.body.slice(0, 200)}</p>
                <a href="/details.html?id=${ post.id }">Read more...</a>
                <p><small>${post.likes} likes</small></p>
            </div>
        `
    })
    container.innerHTML = template;
}
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    renderPosts(searchForm.term.value.trim())
})
window.addEventListener('DOMContentLoaded', () => renderPosts());