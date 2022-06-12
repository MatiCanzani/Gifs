//Theme change
const changeSailorDay = () => {
    document.getElementById('css-style').href = './Sass/sailor-day.css';
    localStorage.setItem("storagetheme", "day");
    if (displayBlock = 'none') {
        document.getElementById('nav-dropdown').style.display = 'block';
    } else {
        document.getElementById('nav-dropdown').style.display = 'none';
    }
    document.getElementById('nav-dropdown').style.display = 'none';
}

const chageSailorNight = () => {
    document.getElementById('css-style').href = './Sass/sailor-night.css';
    localStorage.setItem("storagetheme", "night");
    document.getElementById('nav-dropdown').style.display = 'none';
}

const reviewDarkmode = () => {
    storagetheme = localStorage.getItem("storagetheme");
    if (storagetheme !== 'day') {
        localStorage.setItem("storagetheme", "night");
        document.getElementById('css-style').href = './Sass/sailor-night.css';
    }
    if (storagetheme == 'day') {
        localStorage.setItem("storagetheme", "day");
        document.getElementById('css-style').href = './Sass/sailor-day.css';
    }
}


let displayBlock = true;
const showDropdown = () => {
    if (displayBlock) {
        displayBlock = false;
        document.getElementById('nav-dropdown').style.display = 'block';
    }
    else if (!displayBlock) {
        displayBlock = true;
        document.getElementById('nav-dropdown').style.display = 'none';
    }
}

const inputSeacrh = () => {
    dropdownNone = !document.getElementById("search-input").value;
    document.getElementById('blue-cntr').style.display = 'none';
}


// Gift Search
const api = {
    key: 'ATDGCeQL69UOv824DfYCEyprGDROLk3l',
    baseUrl: 'http://api.giphy.com/v1/gifs',
    searchEndpoint: '/search',
    trendingEndpoint: '/trending'
};
let values = [];
const suggest = ['Los Simpson', 'Ace Ventura', 'Beavis and Butthead', 'The Family Guy'];
const searchInputValue = document.getElementById('search-input');
const getEndpoint = query => {
    return query ? `${api.searchEndpoint}?q=${query}&api_key=${api.key}`
        : `${api.trendingEndpoint}?api_key=${api.key}`;
};

const getSearchValue = () => {
    if (searchInputValue) {
        const searchInput = searchInputValue.value;
        return searchInput;
    }
}

const changeColor = () => {
    if (searchInputValue) {
        document.getElementById('search').classList.replace('loupe', 'loupe-keypress');
    }
}

document.getElementById('day-gif').addEventListener('click', async event => {
    if (event.target.tagName === 'BUTTON') {
        const data = await getGifs(event.target.id);
        clearConrainer();
        renderFullGif(data);
        document.getElementById('today-text').innerHTML = 'Más sugertidos';
    }
});

    document.getElementById('blue-cntr').addEventListener('click', async event => {
        if (event.target.tagName === 'BUTTON') {
            const data = await getGifs(event.target.id);
            clearConrainer();
            renderFullGif(data);
            document.getElementById('today-text').innerHTML = 'Más sugertidos';
        }
    });

const getGifs = async query => {
    const endpoint = getEndpoint(query);
    const results = await fetch(`${api.baseUrl}${endpoint}`);
    const response = await results.json();
    return response.data;
};

const hash = new Array();
const blueCntr = document.getElementById('blue-cntr');

const createBlueBtn = (slug) => {
    values = [];
    for(let i = 0; i < 1; i++){
    let gifSlug = (`${slug[i].slug}`.replace(/-/g, ',').split(','));
    for (let i = 0; i < 4; i++) {
        const element = gifSlug[i];
        values.push(element);
    }
    }
}
const valueSlug = () => {
    for(let i = 0; i < values.length ; i++) { 
        const btn = document.createElement('button');
        btn.id = values[i];
        btn.className = 'blue-button';
        btn.textContent = '#' + values[i];
        blueCntr.appendChild(btn);
        }
}

const renderFullGif = (list) => {
    const trendingCntr = document.getElementById('trending');
    for (let i = 0; i < list.length; i++) {
        const newChild = document.createElement('img');
        const tag = document.createElement('p');
        const gifCntr = document.createElement('div');
        const downBar = document.createElement('div');
        gifCntr.className = 'gif-cntr-trend';
        downBar.className = 'gif-down-bar';
        newChild.src = list[i].images.fixed_height.url;
        newChild.className = 'gif-small';
        tag.textContent = `#${list[i].slug}`.replace(/-/g, ' #');
        downBar.appendChild(tag);
        gifCntr.appendChild(newChild);
        trendingCntr.appendChild(gifCntr);
        gifCntr.appendChild(downBar);
    }
};

const clearConrainer = () => {
    trending.innerHTML = '';
};

const clearInput = () => {
    if (search) {
        search.addEventListener('click', () => {
            document.getElementById('search-input').value = '';
            document.getElementById('search').classList.replace('loupe-keypress', 'loupe');
            document.getElementById('blue-cntr').style.display = 'block';
            document.getElementById('dropdrown-content').style.display = 'none';
        }
        )
    }
};

const renderTrending = async () => {
    let searchValue = getSearchValue();
    let gifs = await getGifs(searchValue);
    if (searchValue != '') {
        values.splice();
        createBlueBtn(gifs);
        valueSlug();
    }
    clearConrainer();
    renderFullGif(gifs);
    document.getElementById("search").disabled = !document.getElementById("search-input").value;
    document.getElementById('dropdrown-content').style.display = 'none';
}



const validateSearch = () => {
    document.getElementById("search").disabled = !document.getElementById("search-input").value;
    document.getElementById('blue-cntr').style.display = 'none';
    blueCntr.innerHTML = '';
    if (document.getElementById("search-input").value) {
        document.getElementById('search').classList.replace('loupe', 'loupe-keypress');
    } else {
        document.getElementById('search').classList.replace('loupe-keypress', 'loupe');
    }
    if (document.getElementById("search").disabled) {
        document.getElementById('dropdrown-content').style.display = 'none';
    }
    else {
        document.getElementById('dropdrown-content').style.display = 'block';
    }
}

const getMoreSuggest = async () => {
    const gifs = await getGifs('mrbean');
    clearConrainer();
    renderFullGif(gifs);
}

const getSimilarSuggest = async () => {
    const gifs = await getGifs('high');
    clearConrainer();
    renderFullGif(gifs);
}

const getOneMoreSuggest = async () => {
    const gifs = await getGifs('ukulele');
    clearConrainer();
    renderFullGif(gifs);
}

const createDivSuggest = (imageUrl, description) => {
    const cntr = document.createElement('div');
    const div = document.createElement('div');
    const image = document.createElement('img');
    const topBar = document.createElement('div');
    const button = document.createElement('button');
    const buttonClose = document.createElement('button');
    button.className = 'more';
    button.id = description;
    button.innerText = 'Ver más...';
    image.className = 'single-gif';
    image.src = imageUrl;
    cntr.className = 'today-gif-cntr';
    div.className = 'gif';
    topBar.className = 'gif-bar';
    topBar.id = description.replace(/ /g, '');
    topBar.innerText = `#${topBar.id}`;
    buttonClose.className = 'close-button';
    cntr.appendChild(image);
    div.appendChild(cntr);
    div.appendChild(topBar);
    div.appendChild(button);
    topBar.appendChild(buttonClose);
    return div;
}

const renderGifts = (imageUrl, description) => {
    const todayGif = createDivSuggest(imageUrl, description);
    const todayCntr = document.getElementById('day-gif');
    todayCntr.appendChild(todayGif);
};

const search = document.getElementById('search');
const todayText = async () => {
    if (search) {
        search.addEventListener('click', () => {
            document.getElementById('today-text').innerHTML = 'Ejemplo de resultados: ' + document.getElementById('search-input').value;
        })
    }

};

const myGif = document.getElementById('trending');
const getLocal = () => {
    if (localStorage.getItem('Gif Id')) {
        clearConrainer();
        let gifLocals = JSON.parse(localStorage.getItem('Gif Id'));
        gifLocals.forEach(id => {
            const newChild = document.createElement('img');
            const tag = document.createElement('p');
            const gifCntr = document.createElement('div');
            gifCntr.className = 'gif-cntr-trend';
            newChild.src = `https://media.giphy.com/media/${id}/giphy.gif`;
            newChild.className = 'gif-small';
            gifCntr.appendChild(newChild);
            myGif.appendChild(gifCntr);
        });
    }
}

const myGifOs = () => {
    clearConrainer();
    document.getElementById('mainsGifs').style.display = 'none';
    document.getElementById('today-text').innerHTML = 'Mis GifOs'
    getLocal();
}

window.onload = () => {
    suggest.forEach(async value => {
        const data = await getGifs(value);
        if (data && data.length > 0) {
            renderGifts(data[0].images.fixed_height.url, value);
        }
    });
    getLocal();
    todayText();
    clearInput();
    renderTrending();
    reviewDarkmode();
    validateSearch();
};
