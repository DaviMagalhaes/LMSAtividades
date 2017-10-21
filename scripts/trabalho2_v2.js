
    // Dados
    let usuario = "victor23";
    let dados = JSON.parse('{"conversas":[{"usuario": "joao03","mensagens": [{"usuario": "joao03","texto": "Tudo bem?"},{"usuario": "victor23","texto": "Tudo Tranqs"},{"usuario": "joao03","texto": "Que bom"}]},{"usuario": "maria2000","mensagens": [{"usuario": "maria2000","texto": "Na paz?"},{"usuario": "victor23","texto": "Show"},{"usuario": "maria2000","texto": "Que bom"}]},{"usuario": "robson_alves","mensagens": [{"usuario": "victor23","texto": "Bom?"},{"usuario": "robson_alves","texto": "Bom"},{"usuario": "victor23","texto": "Que bom"}]}]}');

    // Recuperação dos elementos pertinentes à frente
    let listaContatosElem = document.querySelector("#lista-contatos");
    let listaMensagensElem = document.querySelector("#lista-mensagens");
    let conteudoTituloElem = document.querySelector("#conteudo-titulo");
    let conteudoElem = document.querySelector("#conteudo");
    let contatoConversaElem = document.querySelector("#contato-conversa");
    let campoMensagemElem = document.querySelector("#campo-mensagem");

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
    }

    // Função para mostrar a conversa com o contato selecionado
    function mostrarConversa(c) {
        listaMensagensElem.innerHTML = "";
        conteudoTituloElem.style.display = "block";
        conteudoElem.style.backgroundImage = 'url("imagens/trab2_bg-chat.png")';
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
    }

    let listaContatos = document.querySelectorAll(".item-contato");
    for(let i=0; i<listaContatos.length; i++) {
        listaContatos[i].addEventListener("click", function() {
            mostrarConversa(i);
        })
    }
