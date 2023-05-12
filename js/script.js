let musicas = [ // array para armazenar as informações das músicas
    {titulo:'Paradise', artista:'Coldplay', src:'musicas/Coldplay - Paradise.mp3', img:'img/coldplay.jpg'},
    {titulo:'Boulevard Of Broken Dreams', artista:'Green Day', src:'musicas/Green Day - Boulevard Of Broken Dreams.mp3', img:'img/greenday.jpg'},
    {titulo:'Through the Fire and Flames', artista:'DragonForce', src:'musicas/DragonForce - Through the Fire and Flames.mp3', img:'img/dragonforce.jpg'}
];

let musica = document.querySelector('audio');
let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

renderizarMusica(indexMusica);

//Eventos
document.querySelector('.botao-play').addEventListener('click', tocarMusica);// Ação de tocar a música

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);// Ação de pausar a música

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => { //() => {} = Função anônima
    indexMusica--;
    if(indexMusica < 0) {
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.proximo').addEventListener('click', () => { //() => {} = Função anônima
    indexMusica++;
    if(indexMusica > 2) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

//Funções
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {//Arrow function = funções anônimas
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
    });
}

function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';//Math.floor arredonda o número para baixo. musica.duration descobre a duração da musica
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos){
    let campoMinutos = Math.floor(segundos / 60); //Calculo para obter os minutos
    let campoSegundos = segundos % 60; //Calculo para obter os segundos
    if(campoSegundos < 10){
        campoSegundos = '0' + campoSegundos;// Adiciona o 0 sempre que for um numero menor que 10
    }

    return campoMinutos + ':' + campoSegundos;
}
