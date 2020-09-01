const form = document.getElementById('submit');
const search = document.getElementById('search');

const meals = document.getElementById('meals')
const heading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');

const random = document.getElementById('random')
function searchMeal(e){

    e.preventDefault();
  // Clear single meal
  single_mealEl.innerHTML = '';
const trem = search.value;


if(trem.trim()===''){
    alert('Please enter a search term');
    heading.innerHTML='';
    meals.innerHTML = '';
}else{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${trem}
    `)
    .then(res=>res.json())
    .then(data=>{
      console.log(data.meals)
      if(data.meals === null){

        heading.innerHTML = `<p>There are no search results. Try again!<p>`;
        meals.innerHTML = '';
     
      }else{
        heading.innerText = `you search ${trem}:-`
        meals.innerHTML = data.meals.map(meal=>{
            return `<div class="meal">
             <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
             <div class="meal-info" data_mealId="${meal.idMeal}">
             <h3>${meal.strMeal}</h3>
   
             </div>
             </div>`
         }).join('')}
   

    })
   // Clear search text
    search.value ='';
}
}


function getMeal(id){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res=>res.json())
    .then(data=>{
        const meal = data.meals[0];
        updatDomMeal(meal)
    })
}



function updatDomMeal(meal){

    let  ingredients= [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        } else {
          break;
        }
}

single_mealEl.innerHTML = `
<div class="card">
<img src="${meal.strMealThumb}">
<p><span class="bold">category:</span>${meal.strCategory}</p>
<p><span class="bold">Area:</span>${meal.strArea}</p>
<p><span class="bold">Tags:</span>${meal.strTags}</p>
<h1>Ingredient</h1>
<ul>

${ingredients.map(item=> {
 return `<li>${item}</li>`
    }).join('')}
    </ul>

</div>
</div>
<div class="card">
<h3>${meal.strMeal}</h3>
<p>${meal.strInstructions}</p>


`;

// meals.innerHTML = '';
}


function randomMeal(){
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res=>res.json())
    .then(data=>{
        const meal = data.meals[0];
        heading.innerText = `you search category:- ${meal.strCategory}`;
        meals.innerHTML = '';
       
        updatDomMeal(meal)
    })
}

form.addEventListener('submit',searchMeal);

random.addEventListener('click',randomMeal)
meals.addEventListener('click',(e)=>{
    const mealInfo  = e.path.find(item=>{
       if(item.classList){
        return item.classList.contains('meal-info');
       }
    })
    if(mealInfo){
        const id = mealInfo.getAttribute('data_mealId');
        getMeal(id)
    }
})