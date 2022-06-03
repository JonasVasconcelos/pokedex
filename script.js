const cardHeader = document.getElementsByClassName('cardHeader');
const pokemonName = document.getElementById('pokemonName');
const cardImg = document.getElementsByClassName('cardImg');
const cardSkills = document.getElementsByClassName('cardSkills');
let pokemonDisplay = 1;

const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');

const firstCap = (str) => {
  return str.charAt(0).toUpperCase()+str.slice(1, str.lenght);
}

const statNameFun = () => {
  let statsTitle = document.createElement('p');
  statsTitle.classList.add('Stats');
  statsTitle.classList.add('StatTitle');
  statsTitle.innerHTML = 'Stats:';
  cardSkills[0].appendChild(statsTitle);
}

const statSetting = (stat) => {
  let statName = stat.stat.name;
  let statValue = stat.base_stat;

  let pName = document.createElement('p');
  pName.innerHTML = firstCap(statName);
  pName.classList.add('Stats');
  cardSkills[0].appendChild(pName);

  let divStats = document.createElement('div');
  divStats.classList.add('divStats')
  cardSkills[0].appendChild(divStats);
  let lastChild = cardSkills[0].lastElementChild

  let divValue = document.createElement('div');
  divValue.classList.add('StatsBar');
  divValue.style.paddingLeft = `${statValue/3}%`;
  divValue.style.width = `${statValue/3}%`;
  lastChild.appendChild(divValue);

  let span = document.createElement('span');
  span.innerHTML = statValue;
  lastChild.appendChild(span);
} 

const charLoad = (data) => {
  pokemonName.innerHTML = firstCap(data.species.name);
  statNameFun();

  let imgInfo = document.createElement('div')
  imgInfo.classList.add('imgInfo')
  cardImg[0].appendChild(imgInfo);

  let lastChild = cardImg[0].lastElementChild
  let pIndex = document.createElement('p');
  pIndex.classList.add('cardIndex');
  pIndex.innerHTML = `#${pokemonDisplay}`;
  lastChild.appendChild(pIndex);

  let pType = document.createElement('p');
  pType.classList.add('cardIndex');
  pType.innerHTML = `${firstCap(data.types[0].type.name)}`;
  lastChild.appendChild(pType);

  let img = document.createElement('img')
  img.src = data.sprites.other.home.front_default;
  cardImg[0].appendChild(img)

  data.stats.forEach(statSetting);
}

const data = (pokemonIndex) => {
  const dataURL = 'https://pokeapi.co/api/v2/pokemon/'

  fetch(dataURL)
  .then((response) => response.json())
  .then((data) => {
    fetch(dataURL + pokemonIndex)
    .then((response) => response.json())
    .then((data) => charLoad(data))
  })
  .catch((error) => console.log(`Algo deu errado :( \n${error}`));
}

const update = () => {
  pokemonName.innerHTML = '';
  let childimg = cardImg[0].lastElementChild;
  while (childimg) {
    cardImg[0].removeChild(childimg);
    childimg = cardImg[0].lastElementChild;
  }

  let child = cardSkills[0].lastElementChild;
  while (child) {
    cardSkills[0].removeChild(child);
    child = cardSkills[0].lastElementChild;
  }
}

window.onload = () => data(pokemonDisplay);

btnLeft.addEventListener('click', () => {
  pokemonDisplay -= 1;
  update();
  data(pokemonDisplay);
})

btnRight.addEventListener('click', () => {
  pokemonDisplay += 1;
  update();
  data(pokemonDisplay);
})
