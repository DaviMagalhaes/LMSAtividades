
    // Dados
    let usuario = "victor23";
    let dados = JSON.parse('{"conversas":[{"usuario": "joao03","mensagens": [{"usuario": "joao03","texto": "Tudo bem?"},{"usuario": "victor23","texto": "Tudo Tranqs"},{"usuario": "joao03","texto": "Que bom"}]},{"usuario": "maria2000","mensagens": [{"usuario": "maria2000","texto": "Na paz?"},{"usuario": "victor23","texto": "Show"},{"usuario": "maria2000","texto": "Que bom"}]},{"usuario": "robson_alves","mensagens": [{"usuario": "victor23","texto": "Bom?"},{"usuario": "robson_alves","texto": "Bom"},{"usuario": "victor23","texto": "Que bom"}]}]}');

    // Recuperação dos elementos pertinentes à frente
    let listaContatosElem = document.querySelector("#lista-contatos");
    let listaMensagensElem = document.querySelector("#lista-mensagens");
    let conteudoTituloElem = document.querySelector("#conteudo-titulo");
    let conteudoElem = document.querySelector("#conteudo");
    let contatoConversaElem = document.querySelector("#contato-conversa");
    let menuEmoticonsElem = document.querySelector("#menu-emoticons");
    let btnEmoticons = document.querySelector("#btn-emoticons");
    let campoMensagemElem = document.querySelector("#campo-mensagem");
    let inputMsgElem = document.querySelector("#input-msg");
    let btnEnviarElem = document.querySelector("#btn-enviar");

    // Variáveis importantes
    let contatoAtual;

    // Mostrar contatos e última mensagem trocada na lista de contatos
    for(let i in dados.conversas) {
        let contato = dados.conversas[i].usuario;
        let ultimaMensagem = dados.conversas[i].mensagens.slice(-1)[0].texto;

        let html = '<div class="item-contato '+i+'">' +
        '<img src="imagens/usuario.png" />' +
        '<i>12:34</i>' +
        '<b>'+contato+'</b>' +
        '<span>'+ultimaMensagem+'</span>' +
        '</div>';

        listaContatosElem.innerHTML += html;

        // Só pra saber que existe
        /*let li = document.createElement('li');
        let text = document.createTextNode(name +" " +familyName);
        li.appendChild(text);
        friendList.appendChild(li);*/
    }

    // Mostrar conversa com o contato selecionado
    function mostrarConversa(c) {
        listaMensagensElem.innerHTML = "";
        conteudoTituloElem.style.display = "block";
        conteudoElem.style.backgroundImage = "url('imagens/trab2_bg-chat.png')";
        campoMensagemElem.style.display = "block";

        for(let i=0; i<dados.conversas[c].mensagens.length; i++) {
            let pos = (usuario != dados.conversas[c].mensagens[i].usuario ? "esq" : "dir");

            let html = '<div class="item-msg item-'+pos+'">' +
            '<div class="msg-'+pos+'">' +
            '<span>'+dados.conversas[c].mensagens[i].texto+'</span>' +
            '<i>12:34</i>' +
            '</div>' +
            '</div>';

            listaMensagensElem.innerHTML += html;
        }

        contatoConversaElem.innerHTML = dados.conversas[c].usuario;
        inputMsgElem.innerHTML = "";
        contatoAtual = c;
    }

    // Tratar exibição do menu emoticons
    function menuEmoticons() {
        menuEmoticonsElem.classList.toggle("show");
        listaMensagensElem.classList.toggle("showing-menu-emoticons");
    }

    // Adiciona emoticon ao campo
    function addEmoticon(img) {
        inputMsgElem.appendChild(img);
        inputMsgElem.focus();
    }

    // Enviar mensagem
    function enviarMensagem(mensagem) {
        let novaMensagem = {usuario:usuario,texto:mensagem};
        dados.conversas[contatoAtual].mensagens.push(novaMensagem);

        mostrarConversa(contatoAtual);
        inputMsgElem.innerHTML = "";
    }

    // Evita colar HTML no input
    inputMsgElem.addEventListener("paste", function(e) {
        e.preventDefault();
        let texto = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, texto);
    });

    // Evento: seleciona contato
    let listaContatos = document.querySelectorAll(".item-contato");
    for(let i=0; i<listaContatos.length; i++) {
        listaContatos[i].addEventListener("click", function() {
            mostrarConversa(i);
        })
    }

    // Evento: abrir menu emoticons
    btnEmoticons.addEventListener("click", menuEmoticons);

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
