var palavraFiltro = null;
var palavra = null;
var vidas = 5;

function prepararJogo() {
    document.getElementById("teclado").style.display = "block";
    vidas = 5;

    document.getElementById("forca").innerHTML = "<img src='imgs/knight.png' alt='personagem' class='personagem'>"
    for(let i = 0; i < vidas; i++){
        document.getElementById("forca").innerHTML += `<img src='imgs/vida.png' alt='vida'>`
    }
    
    var tema = document.getElementById("temas").value;
    document.getElementById("placeholderPalavra").innerHTML = "";

    var teclas = document.querySelectorAll(".tecla");
    teclas.forEach(tecla => {
        tecla.disabled = false;
        tecla.classList.remove("certo");
    });

    gerarPalavra(tema);
}

function gerarPalavra(tema) {
    fetch("https://raw.githubusercontent.com/Felipe-Gabriel-Souza-Goncalves/api_jogo-da-forca/refs/heads/main/palavras.json")
        .then(response => response.json())
        .then(dados => {
            var index = Math.floor(Math.random() * dados.temas[tema].length);
            palavra = dados.temas[tema][index].palavra.split("");
            palavraFiltro = dados.temas[tema][index].palavra_filtro.split("");

            var placeholder = document.getElementById("placeholderPalavra");
            placeholder.innerHTML = ""; // Limpar antes de preencher

            for (let i = 0; i < palavra.length; i++) {
                if (palavra[i] === " " || palavra[i] === "-") { // Corrigido: verificar espaço com " "
                    const span = document.createElement("span");
                    span.classList.add("espaco");
                    span.innerHTML = "&nbsp;&nbsp;&nbsp;";
                    placeholder.appendChild(span);
                } else {
                    const u = document.createElement("u");
                    u.classList.add("letra");
                    u.innerHTML = "&nbsp;&nbsp;&nbsp;";
                    placeholder.appendChild(u);
                }
            }


            console.log(palavra)
        })
        .catch(error => console.error("Erro ao carregar as palavras:", error));
}

function mandarLetra(letra, button) {
    var existeLetra = false;
    var uElements = document.querySelectorAll("u");

    var diff = 0
    for (let i = 0; i < palavraFiltro.length; i++) {
        if(palavraFiltro[i] == " "){
            diff ++
            continue
        }

        if (letra.toLowerCase() === palavraFiltro[i].toLowerCase()) {
            existeLetra = true;
            uElements[i-diff].innerHTML = palavra[i];
        }
    }

    correcao(existeLetra, button);
}

function correcao(existeLetra, button) {
    if (existeLetra) {
        button.classList.add("certo");
        button.disabled = true;
    } else {
        button.disabled = true;
        vidas--;
        
        document.getElementById("forca").innerHTML = "<img src='imgs/knight.png' alt='personagem' class='personagem'>"
        for(let i = 0; i < vidas; i++){
            document.getElementById("forca").innerHTML += `<img src='imgs/vida.png' alt='vida'>`
        }

    }

    if (vidas === 0) {
        document.getElementById("forca").innerHTML = "<img src='imgs/shade.png' alt='personagem' class='personagem'><br><br><p>Você perdeu!</p>"
        document.getElementById("forca").innerHTML += "Palavra: " + palavra.join("")
        document.getElementById("teclado").style.display = "none";
    }

    ganhar()
}

function ganhar() {

    var uElements = document.querySelectorAll("u");
    for (let i = 0; i < uElements.length; i++) {
        if (uElements[i].innerHTML === "&nbsp;&nbsp;&nbsp;") {
            return; // Se ainda houver espaço em branco, o jogo continua
        }
    }
    document.getElementById("forca").innerHTML = "<img src='imgs/knight victory.png' alt='personagem' class='personagem'><br><br><p>Você ganhou!</p>"    
    document.getElementById("teclado").style.display = "none";
}
