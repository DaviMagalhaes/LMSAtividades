
    // Dados
    let usuario = "Davi Magal";
    let dadosListaContatos;
    let dadosConversas = [];
    let contatoAtual;

    // Recuperação dos elementos pertinentes à frente
    let listaContatosElem   = document.querySelector("#lista-contatos");
    let listaMensagensElem  = document.querySelector("#lista-mensagens");
    let conteudoTituloElem  = document.querySelector("#conteudo-titulo");
    let conteudoElem        = document.querySelector("#conteudo");
    let contatoConversaElem = document.querySelector("#contato-conversa");
    let menuEmoticonsElem   = document.querySelector("#menu-emoticons");
    let btnEmoticons        = document.querySelector("#btn-emoticons");
    let campoMensagemElem   = document.querySelector("#campo-mensagem");
    let inputMsgElem        = document.querySelector("#input-msg");
    let btnEnviarElem       = document.querySelector("#btn-enviar");

    // Recuperar e mostrar contatos e última mensagem trocada da lista de mensagens
    function recuperarContatos() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4){
                let response = JSON.parse(xhttp.responseText);
                
                for(let i in response) {
                    let contato = response[i].groupName;
        
                    let html = '<div class="item-contato '+i+'">' +
                    '<img src="imagens/usuario.png" />' +
                    '<i>12:34</i>' +
                    '<b>'+contato+'</b>' +
                    '<span>Última mensagem</span>' +
                    '</div>';
        
                    listaContatosElem.innerHTML += html;
                }

                dadosListaContatos = response;
                eventoSelecionarContato();
            }
        }
        xhttp.open("GET", "http://rest.learncode.academy/api/davimagal/grupos", true);
        xhttp.send();
    }
    recuperarContatos();

    // Atualizar conversa exibida
    function atualizarConversa(groupId) {
        listaMensagensElem.innerHTML = "";

        let conversa = dadosConversas[groupId];

        for(let i in conversa) {
            let pos = (usuario != conversa[i].userName ? "esq" : "dir");
            let remetente = (pos == "esq" ? "<span>"+conversa[i].userName+"</span>" : "");
            
            let html = '<div class="item-msg item-'+pos+'">' +
            '<div class="msg-'+pos+'">' +
            remetente +
            conversa[i].message +
            '<i>12:34</i>' +
            '</div>' +
            '</div>';

            listaMensagensElem.innerHTML += html;
        }

        listaMensagensElem.scrollTop = listaMensagensElem.scrollHeight;
    }

    // Mostrar conversa com o contato selecionado
    function mostrarConversa(c) {
        listaMensagensElem.innerHTML = "";
        conteudoTituloElem.style.display = "block";
        conteudoElem.style.backgroundImage = "url('imagens/trab2_bg-chat.png')";
        menuEmoticonsElem.classList.remove("show");
        listaMensagensElem.classList.remove("showing-menu-emoticons");
        campoMensagemElem.style.display = "block";

        let groupId = dadosListaContatos[c].groupId;

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4){
                dadosConversas[groupId] = JSON.parse(xhttp.responseText);
                atualizarConversa(groupId);
            }
        }
        xhttp.open("GET", "http://rest.learncode.academy/api/davimagal/"+groupId, true);
        xhttp.send();

        contatoConversaElem.innerHTML = dadosListaContatos[c].groupName;
        inputMsgElem.innerHTML = "";
        contatoAtual = groupId;
    }

    // Enviar mensagem
    function enviarMensagem(mensagem) {
        if(mensagem.length == 0) return;
        menuEmoticonsElem.classList.remove("show");
        listaMensagensElem.classList.remove("showing-menu-emoticons");

        let novaMensagem = {userName:usuario,message:mensagem};
        dadosConversas[contatoAtual].push(novaMensagem);
        atualizarConversa(contatoAtual);
        
        inputMsgElem.innerHTML = "";
    }

    // Adiciona emoticon ao campo
    function addEmoticon(img) {
        inputMsgElem.appendChild(img);
        inputMsgElem.focus();
    }

    // Evita colar HTML no input
    inputMsgElem.addEventListener("paste", function(e) {
        e.preventDefault();
        let texto = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, texto);
    });

    // Evento: seleciona contato
    function eventoSelecionarContato() {
        let listaContatos = document.querySelectorAll(".item-contato");
        for(let i=0; i<listaContatos.length; i++) {
            listaContatos[i].addEventListener("click", function() {
                mostrarConversa(i);
            })
        }
    }

    // Evento: abrir menu emoticons
    btnEmoticons.addEventListener("click", function() {
        menuEmoticonsElem.classList.toggle("show");
        listaMensagensElem.classList.toggle("showing-menu-emoticons");
    });

    // Evento: adicionar emoticon ao campo
    menuEmoticonsElem.addEventListener("click", function(elem) {
        if(elem.target.tagName.toLowerCase() == "img") {
            addEmoticon(elem.target.cloneNode(true));
        }
    });

    // Evento: enviar mensagem
    btnEnviarElem.addEventListener("click", function() {
        enviarMensagem(inputMsgElem.innerHTML);
    });

    // Evento: enviar mensagem ao teclar Enter
    inputMsgElem.addEventListener("keydown", function(e){
        if(e.key == "Enter") {
            e.preventDefault();
            enviarMensagem(inputMsgElem.innerHTML);
        }
    });
