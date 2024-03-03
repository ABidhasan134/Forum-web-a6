// Function to load data from the API
const loadData = async () => {
    try {
        const resp = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
        const data = await resp.json();
        AllPosts(data.posts);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
// load fuction end

// Call the function to load data
loadData();

// Function to create card section based on API data
const AllPosts = (details) => {
    const postContener = document.getElementById('post-contener');
    
    // Loop through each post and create card elements
    details.forEach((element) => {
        // Create a new post element for each iteration
        const post = document.createElement('div');
        post.classList.add('flex');

        post.innerHTML = `<div class="flex  
        border-white bg-pink-100 p-6 w-[100%] m-4 rounded-xl">
        <!-- indicator start -->
            <div class="avatar indicator">
                <span class="indicator-item border-none badge ${element.isActive?'bg-green-400':'bg-red-500'} badge-secondary"></span> 
                <div class="w-20 h-20 rounded-lg">
                    <img alt="Avatar" src="${element.image}" />
                </div>
            </div>
            <!-- indicator end -->
            <!-- card Info area start-->
            <div class="mx-2 px-7">
                <!-- category and author -->
                <div class="flex gap-3 ">
                    <p class="text-2xl">#${element.category}</p>
                    <p class="text-2xl">Author: ${element.author.name}</p>
                </div>
                <!-- title and subtitle -->
                <div>
                    <h1 class="text-4xl font-semibold">${element.title}</h1>
                    <p class="text-gray-600 text-2xl">${element.description}</p>
                </div>
                <!-- icon info -->
                <div class="flex gap-4 justify-between">
                    <div class="flex gap-4 items-center">
                        <div class="flex items-center gap-3">
                            <i class="fa-regular fa-comment text-2xl"></i>
                            <p>${element.comment_count}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <i class="fa-solid fa-eye text-2xl"></i>
                            <p>${element.view_count}</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <i class="fa-regular fa-clock text-2xl"></i>
                            <p>${element.posted_time} min</p>
                        </div>
                    </div>
                    <div>
                        <button onClick="readedBook()"><i class="fa-regular fa-envelope bg-green-400 px-2 py-1 text-2xl rounded-[50%]"></i></button>
                    </div>
                </div>
            </div>
            <!-- card Info area end-->
        
        </div>
        `;
            
        // console.log(element);
        // Append the post to the container
        postContener.appendChild(post);
    });
};

const readedBook = ()=>{
    console.log('readedBook');
}