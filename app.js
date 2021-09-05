const searchFood = () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    //Clear data
    searchInput.value = '';
    // console.log(searchText);
    //load Data
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.meals))
}

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    //Clear data
    // console.log(meals.length);
    searchResult.textContent = '';

    if (meals.length == 0) {
        const div = document.createElement('div');
        div.innerHTML = `
            <h5>Meal not Found.....!</h5>
        `
        searchResult.appendChild(div);
    }
    else {
        for (const meal of meals) {
            const div = document.createElement('div');
            div.classList.add('col')
            div.innerHTML = `<div onclick="loadMealDetail('${meal.idMeal}')" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            </div>`
            searchResult.appendChild(div);
        }


        // console.log(meal);

    }
}

const loadMealDetail = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = meal => {
    console.log(meal);
    const mealDetails = document.getElementById('meal-detail');
    mealDetails.innerHTML = `<div class="card">
    <img src="${meal.strMealThumb}" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions}</p >
        <a href="https://www.google.com/" class="btn btn-primary">Go somewhere</a>
    </div >
</div > `
}