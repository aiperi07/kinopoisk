
// ca3c876f-e785-4e90-9f90-2fb7f9399976

const API_KEY ='8a91212f-251a-46ed-89c2-08e085db7629'
const API_URL_POPULAR='https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page='
const API_URL_BEST='https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page='
const API_URL_SEARCH='https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='
const API_DETAILS='https://kinopoiskapiunofficial.tech/api/v2.2/films/'

const input=document.querySelector('#input')
const button=document.querySelector('#btn')
const output =document.querySelector('#output')
const header=document.querySelector('header')
const pagination=document.querySelector('.pagination')

// states
let valueState=''
let checkbest=false
let paginationState=''

// states
const getMovie = async(url) =>{
    const request = await fetch(url,{
        headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        },
        method: 'GET',
    })
    const response = await request.json()
    // console.log(response.pagesCount);
    createNumberForPaginations(response.pagesCount)
    renderMovies(response.films)
    // console.log(response.films);
}
getMovie(API_URL_POPULAR+'1')




const createNumberForPaginations=(num)=>{
    pagination.innerHTML=''
    const numbers=[]
    for(let i = 1;i<=num;i++){
        numbers.push(i)
    }
    numbers.forEach(el=>{
        const number=document.createElement('div')
        number.className='pagination__number'
        number.textContent=el

        number.addEventListener('click',()=>{
            if(checkbest){
                getMovie(API_URL_BEST+el)
                paginationState = el
            }else{
                getMovie(API_URL_POPULAR+el)
                paginationState= el
            }
            
        })
        pagination.append(number)
    })

}
const btnPopular=()=>{
    btn100=document.querySelector('#btn-100')
    btn100.addEventListener('click',()=>{
        checkbest=false
        valueState=''
        getMovie(API_URL_POPULAR+'1')
        pagination.style.display='flex'
    }) 
}
btnPopular()
const btnBest=()=>{
    btn250=document.querySelector('#btn-250')
    btn250.addEventListener('click',()=>{
        checkbest=true
        valueState=''
        getMovie(API_URL_BEST+'1')
        pagination.style.display='flex'
    })
}
btnBest()



const renderMovies=(data)=>{
    output.innerHTML=''

    if(data.length>0){
        data.forEach(el => {
            const col=document.createElement('div')
            col.className='col-3'
            const filmBox=document.createElement('div')
            filmBox.className='filmBox'
            const rate=document.createElement('div')
            rate.className='rate'
            const img=document.createElement('img')
            const name=document.createElement('h2')
            const btn=document.createElement('button')
            const genre=document.createElement('p')
    
            name.textContent=el.nameRu
            img.src=el.posterUrl
            rate.textContent=el.rating
            btn.textContent='Watch a movie'
            genre.textContent=el.genres.map(el=>{
                return ` ${el.genre} `
            })
            
            img.addEventListener('click',()=>{
                getMoviesById(el.filmId)
            })

            filmBox.append(rate,img,name,genre,btn)
            col.append(filmBox)
            output.append(col)
        });
    }else{
        output.textContent='Not found'
    }
}


const searchMovies=()=>{
    button.addEventListener('click',()=>{
        if(input.value && input.value.trim()){
            pagination.style.display='none'
            valueState=input.value
            console.log(valueState);
            getMovie(API_URL_SEARCH+input.value)
        }else{
            getMovie(API_URL_POPULAR+'1')
            // pagination.style.display='flex'
        }
    })
}
searchMovies()


const getMoviesById=async(id)=>{
    const request = await fetch(API_DETAILS+id,{
        headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        },
    })
    const response = await request.json()
    // console.log(response);
    // getMoviesById(response.filmId)
    renderDetails(response)
}



const renderDetails=(data)=>{
    output.innerHTML=''
    pagination.innerHTML=''
    header.innerHTML=''
    const colOne=document.createElement('div')
    const colTwo=document.createElement('div')
    colOne.className='col-6'
    colTwo.className='col-6'
    const detailBox1=document.createElement('div')
    detailBox1.className='detailBox1'
    const detailBox2=document.createElement('div')
    detailBox2.className='detailBox2'
    const img=document.createElement('img')
    img.className='details__img'
    const name=document.createElement('h2')
    const btn=document.createElement('button')
    btn.className='details__btn'
    const text=document.createElement('h5')
    

    name.textContent=data.nameRu
    img.src=data.posterUrl
    btn.textContent='Cancel'
    text.textContent=data.description

    btn.addEventListener('click',()=>{
        if(valueState){
            getMovie(API_URL_SEARCH+valueState)
            pagination.style.display='none'
        }else if(checkbest){
            getMovie(API_URL_BEST+paginationState)
            
        }else{
            getMovie(API_URL_POPULAR+paginationState)
            pagination.style.display='flex'
        }
        
    })

    detailBox2.append(btn,name,text)
    detailBox1.append(img)
    colTwo.append(detailBox2)
    colOne.append(detailBox1)
    output.append(colOne,colTwo)
}

