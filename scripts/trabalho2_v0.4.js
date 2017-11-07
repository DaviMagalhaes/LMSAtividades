
    // Dados
    let usuario = (localStorage.usuario ? localStorage.usuario : false);
    let dadosListaContatos;
    let dadosConversas = [];
    let contatoAtual;

    // Recuperação dos elementos pertinentes à frente
    let modalOverlay        = document.querySelector("#modal-overlay");
    let loginModal          = document.querySelector("#login-modal");
    let groupModal          = document.querySelector("#group-modal");
    let btnLogin            = document.querySelector("#login-user");
    let btnNovoChat         = document.querySelector("#new-chat");
    let inputLogin          = document.querySelector("#login-apelido");
    let inputGroup          = document.querySelector("#group-name");
    let btnLoginSubmit      = document.querySelector("#login-user-submit");
    let btnGroupSubmit      = document.querySelector("#group-submit");
    let listaContatosElem   = document.querySelector("#lista-contatos");
    let colunaMsg           = document.querySelector("#coluna-msg");
    let listaMensagensElem  = document.querySelector("#lista-mensagens");
    let conteudoTituloElem  = document.querySelector("#conteudo-titulo");
    let conteudoElem        = document.querySelector("#conteudo");
    let contatoConversaElem = document.querySelector("#contato-conversa");
    let menuEmoticonsElem   = document.querySelector("#menu-emoticons");
    let btnEmoticons        = document.querySelector("#btn-emoticons");
    let campoMensagemElem   = document.querySelector("#campo-mensagem");
    let inputMsgElem        = document.querySelector("#input-msg");
    let btnEnviarElem       = document.querySelector("#btn-enviar");

    // Realizar login
    function realizarLogin() {
        let usuarioLogin = inputLogin.value;
        if(usuarioLogin.trim().length == 0) return;

        usuario = usuarioLogin;
        localStorage.setItem("usuario", usuario);

        modalOverlay.style.display = "none";
        loginModal.style.display = "none";

        ajustarSistema();
    }

    // Realizar logout
    function realizarLogout() {
        usuario = false;
        localStorage.setItem("usuario", usuario);
        ajustarSistema();
    }

    // Salvar novo grupo
    function salvarGrupo() {
        let grupoNome = inputGroup.value;
        if(grupoNome.trim().length == 0) return;

        let novoGrupo = {groupName:grupoNome, groupId:urlify(grupoNome)};
        let json = JSON.stringify(novoGrupo);

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4) {
                console.log(xhttp.status);
            }
        }
        xhttp.open("POST", "http://rest.learncode.academy/api/davimagal/grupos", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(json);

        modalOverlay.style.display = "none";
        groupModal.style.display = "none";

        recuperarContatos();
    }

    // Recuperar e mostrar contatos e última mensagem trocada da lista de mensagens
    function recuperarContatos() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(xhttp.readyState == 4) {
                let response = JSON.parse(xhttp.responseText);
                listaContatosElem.innerHTML = "";
                
                for(let i in response) {
                    let contato = response[i].groupName;
        
                    let html = '<div class="item-contato '+i+'">' +
                    '<img src="imagens/usuario.png" />' +
                    '<i>12:34</i>' +
                    '<b>'+contato+'</b>' +
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
        if(mensagem.trim().length == 0) return;
        menuEmoticonsElem.classList.remove("show");
        listaMensagensElem.classList.remove("showing-menu-emoticons");

        let novaMensagem = {userName:usuario,message:mensagem};
        let json = JSON.stringify(novaMensagem);

        let xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://rest.learncode.academy/api/davimagal/"+contatoAtual, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(json);

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

    // Evento: mostrar login OU fazer logout
    btnLogin.addEventListener("click", function() {
        if(!usuario) {
            modalOverlay.style.display = "block";
            loginModal.style.display = "block";
        } else
            realizarLogout();
    });

    // Evento: fechar login
    window.addEventListener("click", function(e) {
        if(event.target == modalOverlay) {
            modalOverlay.style.display = "none";
            loginModal.style.display = "none";
            groupModal.style.display = "none";
        }
    });

    // Evento: realizar login
    btnLoginSubmit.addEventListener("click", realizarLogin);
    inputLogin.addEventListener("keydown", function(e) {
        if(e.key == "Enter") {
            e.preventDefault();
            realizarLogin();
        }
    });

    // Evento: criar grupo
    btnNovoChat.addEventListener("click", function() {
        modalOverlay.style.display = "block";
        groupModal.style.display = "block";
    });

    // Evento: salvar grupo
    btnGroupSubmit.addEventListener("click", salvarGrupo);
    inputGroup.addEventListener("keydown", function(e) {
        if(e.key == "Enter") {
            e.preventDefault();
            salvarGrupo();
        }
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
    inputMsgElem.addEventListener("keydown", function(e) {
        if(e.key == "Enter") {
            e.preventDefault();
            enviarMensagem(inputMsgElem.innerHTML);
        }
    });

    // Criar URL amigável: para criar groupId
    // Referência: https://gist.github.com/jzazove/1479763
    var urlify = function(a) {
        return a.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-").replace(/^-+|-+$/g, '')
    };

    // Ajustar layout
    function ajustarSistema() {
        if(!usuario) {
            btnLogin.innerHTML = "&#xE890;";
            btnLogin.setAttribute("title", "Entrar");
            btnNovoChat.style.display = "none";
            
            let div = document.createElement("div");
            let p = document.createElement("p");
            let text = document.createTextNode("Entre para visualizar os grupos.");
            div.id = "coluna-msg";
            p.appendChild(text);
            div.appendChild(p);
            listaContatosElem.innerHTML = "";
            listaContatosElem.appendChild(div);
        } else {
            btnLogin.innerHTML = "&#xE8FB;";
            btnLogin.setAttribute("title", "Sair");
            btnNovoChat.style.display = "inline-block";
            recuperarContatos();
        }
    }
    ajustarSistema();