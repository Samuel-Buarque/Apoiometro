document.addEventListener('DOMContentLoaded', () => {
        document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');
    const createPostButton = document.getElementById('create-post-button');
    const createPostModal = document.getElementById('create-post-modal');
    const closeModal = document.querySelector('.close');
    const postForm = document.getElementById('post-form');
    const photoInput = document.getElementById('photo-input');
    const nameInput = document.getElementById('name-input');
    const accessibilityInput = document.getElementById('accessibility-input');
    const descriptionInput = document.getElementById('description-input');
    const accessibilityButtons = document.querySelectorAll('#accessibility-buttons button');

    let selectedAccessibility = 1;

    accessibilityButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedAccessibility = button.getAttribute('data-value');
            accessibilityInput.value = selectedAccessibility;
            accessibilityButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    createPostButton.addEventListener('click', () => {
        createPostModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        createPostModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == createPostModal) {
            createPostModal.style.display = 'none';
        }
    });

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            const post = {
                photo: reader.result,
                name: nameInput.value.trim(),
                accessibility: selectedAccessibility,
                description: descriptionInput.value.trim()
            };

            addPostToDOM(post);
            savePost(post);

            postForm.reset();
            createPostModal.style.display = 'none';
        };

        reader.readAsDataURL(photoInput.files[0]);
    });

    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];

    savedPosts.forEach(post => {
        addPostToDOM(post);
    });
 function addPostToDOM(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const img = document.createElement('img');
        img.src = post.photo;
        img.classList.add('post-image');
        postDiv.appendChild(img);

        const postDetailsDiv = document.createElement('div');
        postDetailsDiv.classList.add('post-details');

        const h3 = document.createElement('h3');
        h3.textContent = post.name;
        postDetailsDiv.appendChild(h3);

        const pAccessibility = document.createElement('p');
        pAccessibility.innerHTML = `Nível de Acessibilidade: ${generateStars(post.accessibility)}`;
        postDetailsDiv.appendChild(pAccessibility);

        const pDescription = document.createElement('p');
        pDescription.textContent = post.description;
        postDetailsDiv.appendChild(pDescription);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        deleteButton.addEventListener('click', () => {
            deletePost(post);
            postDiv.remove();
        });
        postDetailsDiv.appendChild(deleteButton);

        postDiv.appendChild(postDetailsDiv);
        postsContainer.appendChild(postDiv);
    }

    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }
    function savePost(post) {
        savedPosts.push(post);
        localStorage.setItem('posts', JSON.stringify(savedPosts));
    }

    function deletePost(postToDelete) {
        const index = savedPosts.findIndex(post => post.name === postToDelete.name && post.description === postToDelete.description);
        if (index !== -1) {
            savedPosts.splice(index, 1);
            localStorage.setItem('posts', JSON.stringify(savedPosts));
        }
    }
});

    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts-container');
    const createPostBtn = document.getElementById('create-post-btn');
    const createPostForm = document.getElementById('create-post-form');

    let savedPosts = JSON.parse(localStorage.getItem('posts')) || [];

    savedPosts.forEach(post => {
        addPostToDOM(post);
    });

    createPostBtn.addEventListener('click', () => {
        createPostForm.style.display = createPostForm.style.display === 'none' ? 'block' : 'none';
    });

    postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const postPhoto = document.getElementById('post-photo').files[0];
        const postName = document.getElementById('post-name').value.trim();
        const postAccessibility = document.getElementById('post-accessibility').value.trim();
        const postDescription = document.getElementById('post-description').value.trim();

        if (postPhoto && postName !== '' && postAccessibility !== '' && postDescription !== '') {
            const reader = new FileReader();
            reader.onload = function(event) {
                const post = {
                    photo: event.target.result,
                    name: postName,
                    accessibility: postAccessibility,
                    description: postDescription
                };
                addPostToDOM(post);
                savePost(post);
                postForm.reset();
                createPostForm.style.display = 'none';
            };
            reader.readAsDataURL(postPhoto);
        }
    });

    function addPostToDOM(post) {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');

        const img = document.createElement('img');
        img.src = post.photo;
        img.classList.add('post-image');
        postDiv.appendChild(img);

        const postDetailsDiv = document.createElement('div');
        postDetailsDiv.classList.add('post-details');

        const h3 = document.createElement('h3');
        h3.textContent = post.name;
        postDetailsDiv.appendChild(h3);

        const pAccessibility = document.createElement('p');
        pAccessibility.innerHTML = `Nível de Acessibilidade: ${generateStars(post.accessibility)}`;
        postDetailsDiv.appendChild(pAccessibility);

        const pDescription = document.createElement('p');
        pDescription.textContent = post.description;
        postDetailsDiv.appendChild(pDescription);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        deleteButton.addEventListener('click', () => {
            deletePost(post);
            postDiv.remove();
        });
        postDetailsDiv.appendChild(deleteButton);

        postDiv.appendChild(postDetailsDiv);
        postsContainer.appendChild(postDiv);
    }

    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }
    function savePost(post) {
        savedPosts.push(post);
        savePostsToLocalStorage();
    }

    function deletePost(postToDelete) {
        const index = savedPosts.findIndex(post => post.name === postToDelete.name && post.description === postToDelete.description);
        if (index !== -1) {
            savedPosts.splice(index, 1);
            savePostsToLocalStorage();
        }
    }

    function savePostsToLocalStorage() {
        localStorage.setItem('posts', JSON.stringify(savedPosts));
    }
});
