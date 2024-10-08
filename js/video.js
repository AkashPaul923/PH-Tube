// console.log('js file connected');

// create loadCatagories
const loadCatagories = () => {
    // fetch
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCatagories(data.categories))
        .catch(err => console.log(err))
}
const loadVideos = (searchText = '') => {
    // fetch
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(err => console.log(err))
}
// const obj = {
//     category_id: 1001,
//     video_id: 'aaaa',
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }


// display videos
const displayVideos = (data) => {
    const videoContainer = document.getElementById('video-container')
    videoContainer.innerHTML=''
    // console.log(data)
    if(data.length === 0){
        videoContainer.classList.remove('grid')
        videoContainer.innerHTML= `
        <div class="flex flex-col gap-6 justify-center items-center min-w-[300px]">
            <img src="assets/Icon.png" alt="">
            <p class="text-2xl font-bold">No content Here in this category</p>
        </div>
        `
        return
    }
    else{
        videoContainer.classList.add('grid') 
    }
    data.forEach(item => {
        // console.log(item)
        // create card
        const div = document.createElement('div')
        div.classList = 'card card-compact bg-base-100'
        div.innerHTML = `
        <figure class="h-[250px] relative">
            <img class= "h-full w-full object-cover" src="${item.thumbnail}" alt="" />
            <span class = "absolute bg-black text-white right-2 bottom-2 p-2">${item.others.posted_date}</span>
        </figure>
        <div class="py-3 flex gap-5">
            <div>
                <img class = "h-10 w-10 rounded-full object-cover" src=${item.authors[0].profile_picture} alt="">
            </div>
            <div>
                <h2  class = "font-bold text-xl">${item.title}</h2>
                <div class= "flex gap-2 items-center">
                    <p class= "text-gray-500 ">${item.authors[0].profile_name}</p>
                    ${item.authors[0].verified ? `<img class= "w-5 " src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt="">` : '' }
                </div>
                <p class= "text-gray-500 ">${item.others.views} views </p>
                <button onclick= "loadDetail('${item.video_id}')" >detail</button>
            </div>
        </div>
        `
        videoContainer.append(div)
    })
}
// {category_id: '1001', category: 'Music'}

// create displayCatagories
const displayCatagories = (data) => {
    const btnContainer = document.getElementById('btn-container')

    data.forEach(item => {
        // creat button
        const div = document.createElement('div')
        div.innerHTML =`
        <button id="btn-${item.category_id}" onclick="loadCatagoriesVideo(${item.category_id})" class="btn category-btn">${item.category}</button>
        `

        // button add
        btnContainer.append(div)
    })
}

const loadCatagoriesVideo = (id) =>{
    // fetch
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            displayVideos(data.category)
            activeBtn(`btn-${id}`)
        })
        .catch(err => console.log(err))
        
}

// active btn style
const activeBtn = (id) => {
    const buttons = document.getElementsByClassName('category-btn')
    for(const button of buttons){
        button.classList.remove('bg-red-500')
        button.classList.remove('text-white')

    }

//     // style add
    const btnActive = document.getElementById(id)
    btnActive.classList.add('bg-red-500')
    btnActive.classList.add('text-white')
}


// load all video 
const loadAllVideos = (id) =>{
    activeBtn(id)
    loadVideos() 
} 

// load detail
const loadDetail = async(videoId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    const data = await res.json()
    displayVideoDetail(data.video)
}

// display detail
const displayVideoDetail = (videoDetail) =>{
    // console.log(videoDetail)
    const modalContainer = document.getElementById("modal-container")
    modalContainer.innerHTML = `
    <img src="${videoDetail.thumbnail}"  />
    <h1 class="text-xl font-bold">${videoDetail.title}</h1>
    <p>${videoDetail.description}</p>
    `

    document.getElementById('modal-btn').click()
}

// find via search
document.getElementById('search-text').addEventListener('keyup', function(e){
    loadVideos(e.target.value)
})


loadCatagories()
loadVideos()