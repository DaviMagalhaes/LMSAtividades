
  // ####### MENU
  let button = document.querySelector("#btn-sanduiche");
  let menu = document.querySelector("#menu");

  function toggleMenu() {
    menu.classList.toggle("show");
  }

  button.addEventListener("click", toggleMenu);

  // ####### ACCORDION
  let collapses = document.querySelectorAll(".accordion .collapse");

  function showCollapse(i) {
    // No que clicou, se exibindo, oculta, senão, exibe.
    // Nos diferentes do clicado: oculta. 
    collapses[i].classList.toggle("show");
    for(let j=0; j < collapses.length; j++) {
      if(j != i)
        collapses[j].classList.remove("show");
    }
  }

  for(let i=0; i < collapses.length; i++)
    collapses[i].addEventListener("click", function(){showCollapse(i);});