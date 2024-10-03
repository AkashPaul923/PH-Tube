// console.log('js file connected');

// create loadCatagories
const loadCatagories = () =>{
    // fetch
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCatagories(data.categories))
    .catch(err => console.log(err))
}
// {category_id: '1001', category: 'Music'}

// create displayCatagories
const displayCatagories =(data) =>{
    const btnContainer = document.getElementById('btn-container')
    
    data.forEach( item => {
        // creat button
        const button = document.createElement('button')
        button.classList = 'btn'
        button.innerText = item.category
        // button add
        btnContainer.append(button)
    })
}





loadCatagories()