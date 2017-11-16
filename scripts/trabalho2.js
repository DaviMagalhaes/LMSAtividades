
    let dados = [
        { 
             usuario: "joao03",
             mensagens: [
                {
                    usuario: "joao03",
                    texto: "Tudo bem?"
                },
                {
                    usuario: "victor23",
                    texto: "Tudo Tranqs"
                },
                {
                    usuario: "joao03",
                    texto: "Que bom"
                }
            ]
        },
        { 
             usuario: "maria2000",
             mensagens: [
                {
                    usuario: "maria2000",
                    texto: "Na paz?"
                },
                {
                    usuario: "victor23",
                    texto: "Show"
                },
                {
                    usuario: "maria2000",
                    texto: "Que dlicia"
                },
            ]
        },
        { 
            usuario: "robson_alves",
            mensagens: [
                {
                    usuario: "victor23",
                    texto: "Bom?"
                },
                {
                    usuario: "robson_alves",
                    texto: "Bom"
                },
                {
                    usuario: "victor23",
                    texto: "Que bom"
                },
            ]
        }
    ];

    // Recuperar as bagaças
    let listaContatosElem = document.querySelector("#lista-contatos");
    let listaContatos;

    function listarContatos() {
        for (let i = 0;i<dados.length;i++) {
            let posUltimaMsg = dados[i].mensagens.length-1;
            let ultimaMsg = dados[i].mensagens[posUltimaMsg].texto;

            let html = '<div class="item-contato">' +
            '<img src="imagens/usuario.png" />' +
            '<i>14:02</i>' +
            '<b>'+dados[i].usuario+'</b>' +
            '<span>'+ultimaMsg+'</span>' +
            '</div>';

            listaContatosElem.innerHTML += html;
        }
    }
    listarContatos();

    function mostrarConversa(contato) {
        let nomeContato = document.querySelector("#nome-contato");
        nomeContato.innerHTML = dados[contato].usuario;
    }

    listaContatos = document.querySelectorAll(".item-contato");
    for (let i=0; i<listaContatos.length; i++){
        listaContatos[i].addEventListener("click", function() {
            mostrarConversa(i);
        })
    }


    