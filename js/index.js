// Function to load data from the API
const loadData = (searchText='') => {
    setTimeout(async () => {
        try {
            const resp = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${searchText}`);
            const data = await resp.json();
            AllPosts(data.posts);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, 2000);
};
// load fuction end

// Call the function to load data
loadData();

// Function to create card section based on API data
const AllPosts = (details) => {
    const postContener = document.getElementById('post-contener');
    postContener.innerHTML ="";
    // Loop through each post and create card elements
    details.forEach((element) => {
        // console.log(element.id);
        // Create a new post element for each iteration
        const post = document.createElement('div');
        post.classList.add('flex');

        post.innerHTML = `<div class="flex  
        border-white bg-purple-100 sm:p-6 p-2 w-[100%] sm:m-4 m-2 rounded-xl">
        <!-- indicator start -->
            <div class="avatar indicator">
                <span class="indicator-item border-none badge ${element.isActive?'bg-green-400':'bg-red-500'} badge-secondary"></span> 
                <div class="sm:w-20 w-9 sm:h-20 h-9 rounded-lg">
                    <img alt="Avatar" src="${element.image}" />
                </div>
            </div>
            <!-- indicator end -->
            <!-- card Info area start-->
            <div class="mx-2 px-7">
                <!-- category and author -->
                <div class="flex gap-3 ">
                    <p class="sm:text-2xl">#${element.category}</p>
                    <p class="sm:text-2xl">Author: ${element.author.name}</p>
                </div>
                <!-- title and subtitle -->
                <div>
                    <h1 class="sm:text-4xl text-2xl font-semibold">${element.title}</h1>
                    <p class="text-gray-600 sm:text-2xl">${element.description}</p>
                </div>
                <!-- icon info -->
                <div class="line-hr w-full"></div>
                <div class="flex sm:gap-4 gap-1 justify-between">
                    <div class="flex sm:gap-4 gap-2 items-center">
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
                        <button onclick="readedBook('${element.view_count}', '${element.id}', '${element.title.replace(/'/g, '@')}')"><i class="fa-regular fa-envelope bg-green-400 px-2 py-1 text-2xl rounded-[50%]"></i></button>
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
    // hidening spinner 
    loadingSpinner(false);
};

// const AddToList =(view,id,title)=>{
//         // readedBook(view,id,title);
//         console.log(view,id,title);
//     }
// function end of all card

// function readedBook start
const array=[];
const readedBook = async(view,id,title,)=>{
    // making all id array
    const bookNumbers= document.getElementById('bookNumber');
    array.push(id);
    // console.log(array.length);
    bookNumbers.textContent=array.length;
    
    // for(let i=0;i)
    const readContainer = document.getElementById('read-contener')
    // console.log(view,title,id);
    const readBook=document.createElement('div');
    readBook.innerHTML=`
    <div class="p-5 flex justify-between sm:mx-0 mx-2 my-3 bg-white shadow-md rounded-lg">
                    <div>
                        <h1 class="sm:text-4xl text-2xl">${title}</h1>
                    </div>
                    <div class="flex items-center sm:gap-3 gap-1">
                        <i class="fa-solid fa-eye text-2xl"></i>
                        <p>${view}</p>
                    </div>
            </div>
    `
    readContainer.appendChild(readBook);
   
    
}
// fucntion readedBook end

// handle search start
const handelsearch=()=>{
    loadingSpinner(true);
    const searchField=document.getElementById('search-fild');
    const searchItem=searchField.value;
    const sendItem=`?category=${searchItem}`
    // console.log(sendItem);
    loadData(sendItem);
    searchField.value = '';
    // console.log(searchItem)
}
// handle search end

// adding spinner to search start
const loadingSpinner=(isLoading)=>{
    const spinner=document.getElementById('loading-Spinner');
    if(isLoading){
        spinner.classList.remove('hidden');
    }
    else{
        spinner.classList.add('hidden');
    }

}
// adding spinner to search end
// start load author 

// end load author 
// author information Load
const loadAuthor = async () => {
    try {
        const resp = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
        const data = await resp.json();
        authourInformation(data);
    } catch (error) {
        console.error('Error fetching author information:', error);
    }
};

// getting Author information from API
const authourInformation = (data) => {
    // Process the author information data here
    const authorPost=document.getElementById("aurthor-posts");
    data.map((element)=>{
        // console.log(element.author);
        const authorCard=document.createElement('div');
        authorCard.innerHTML = `
        <div class="card w-auto bg-base-100 shadow-xl p-4">
        <figure><img src="${element.cover_image}" alt="Shoes" /></figure>
        <div class="card-body">
            <p><i class="fa-regular fa-calendar text-2xl mx-2"></i>${element.author?.posted_date || "No publice Date"}</p>
          <h2 class="card-title text-4xl">${element.title}</h2>
          <p>${element.description}</p>
          <div class="flex gap-6">
            <img class="h-20 w-16 rounded-[100%]" src="${element.profile_image}" alt="">
            <div>
                <h1 class="text-3xl font-semibold">${element.author.name}</h1>
                <p>${element.author?.designation||"unknow"}</p>
            </div>
          </div>
        </div>
      </div>

        `
        authorPost.appendChild(authorCard);
    })  
};

// Call the function to load author information
loadAuthor();

