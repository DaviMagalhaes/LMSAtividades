
    // ####### FUNÇÕES #######

    // Recuperar elementos pertinentes
    let accordion = document.querySelector("#accordion");
    let listaCollapses;
    let listaCollapsesElem = [];
    let btnSubmit = document.querySelector("#form-submit");
    
    // Ajustar o accordion
    function ajustarAccordion(i) {
        listaCollapsesElem[i].classList.toggle("show");
        for(let j=0; j < listaCollapsesElem.length; j++) {
            if(j != i)
                listaCollapsesElem[j].classList.remove("show");
        }
    }

    // Evento clicar em elemento do accordion
    function eventoClicarElemento() {
        for(let i=0; i < listaCollapsesElem.length; i++) {
            listaCollapsesElem[i].addEventListener("click", function() {
                ajustarAccordion(i);
            });
        }
    }

    // Adicionar elementos
    function adicionarElementos() {
        accordion.innerHTML = "";

        for(let i=0; i < listaCollapses.length; i++) {
            let palavrasChave = "Palavras-chave: ";
            palavrasChave    += (listaCollapses[i].palavra1 ? "Compras " : "");
            palavrasChave    += (listaCollapses[i].palavra2 ? "Médico " : "");
            palavrasChave    += (listaCollapses[i].palavra3 ? "Diversos " : "");

            let div  = document.createElement("div");
            let h3   = document.createElement("h3");
            let p    = document.createElement("p");
            let br   = document.createElement("br");

            let textTitulo   = document.createTextNode(listaCollapses[i].title);
            let textNota     = document.createTextNode(listaCollapses[i].nota);
            let textPalavras = document.createTextNode(palavrasChave);

            div.classList.add("collapse");
            h3.appendChild(textTitulo);
            p.appendChild(textNota);
            p.appendChild(br);
            p.appendChild(textPalavras);
            div.appendChild(h3);
            div.appendChild(p);

            accordion.appendChild(div);
            listaCollapsesElem.push(div);
        }
        eventoClicarElemento();
    }

    // Recuperar lembretes
    function recuperarLembretes() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4) {
                listaCollapses = JSON.parse(xhttp.responseText);
                adicionarElementos();
            }
        }
        xhttp.open("GET", "http://rest.learncode.academy/api/davimagal/lembretes", true);
        xhttp.send();
    }
    recuperarLembretes();

    // Limpar formulário
    function limparFormulario() {
        document.querySelector("#form-titulo").value = "";
        document.querySelector("#form-nota").value = "";
        document.querySelectorAll(".form-palavras")[0].checked = false;
        document.querySelectorAll(".form-palavras")[1].checked = false;
        document.querySelectorAll(".form-palavras")[2].checked = false;
    }

    // Salvar novo elemento
    function salvarElemento() {
        let titulo            = document.querySelector("#form-titulo").value;
        let nota              = document.querySelector("#form-nota").value;
        let listaPalavrasElem = document.querySelectorAll(".form-palavras");

        if(titulo.trim().length == 0 || nota.trim().length == 0) return;

        let novoLembrete = {
            title: titulo,
            nota: nota,
            palavra1: listaPalavrasElem[0].checked,
            palavra2: listaPalavrasElem[1].checked,
            palavra3: listaPalavrasElem[2].checked
        };
        let json = JSON.stringify(novoLembrete);
    
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4) {
                recuperarLembretes();
                limparFormulario();
            }
        }
        xhttp.open("POST", "http://rest.learncode.academy/api/davimagal/lembretes", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(json);
    }

    // Evento: clicar em enviar
    btnSubmit.addEventListener("click", function(e) {
        e.preventDefault();
        salvarElemento();
    });
