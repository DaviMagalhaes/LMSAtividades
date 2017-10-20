



    let secoes = document.querySelectorAll(".secao");


    function mostrarSecao(indice){
        secoes[indice].classList.toggle("show");

        for (let i=0; i < secoes.length; i++){
            if(i != indice){
                secoes[i].classList.remove("show");
            }
        };

        // Scroll
        let height = secoes[indice].children[0].scrollHeight;
        window.scrollTo(0, indice * height);
    }

    for(let i=0; i<secoes.length; i++) {
        secoes[i].addEventListener("click", function(){
            mostrarSecao(i);
        })
    }
