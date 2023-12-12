window.onload = () => {
  const { createApp } = Vue
      
    createApp({
        data() {
            return {
                showPrincipal:false,
                showCatalogo:false,
                showDetalle:false,
                showRegister:true,
                check:false,
                productos:[],
                idSeleccionado:1,
            }
        },
        methods:{
            verCatalogo(){
                this.check = false,
                this.showPrincipal = false,
                this.showCatalogo = true,
                this.showDetalle = false,
                this.showRegister = false
            },
            verDetalle(id){
                id = id-1
                this.idSeleccionado = id,
                this.check = false,
                this.showPrincipal = false,
                this.showCatalogo = false,
                this.showDetalle = true,
                this.showRegister = false
            },
            verRegistro(click){
                this.check = false;
                this.showPrincipal = false;
                this.showCatalogo = false;
                this.showDetalle = false;
                this.showRegister = true;
                const container = document.getElementById('container');
                if(click=="register"){
                    
                    container.classList.add("right-panel-active");
                }else{
                    container.classList.remove("right-panel-active");
                }
            },
            cerrarLogin(){
                this.check = false,
                this.showPrincipal = true,
                this.showCatalogo = false,
                this.showDetalle = false,
                this.showRegister = false
            },
            cargaProductos(){
                fetch("productos.json")
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error en la petición AJAX');
                        }
                        return response.json();
                    })
                    .then(data => {
                        this.productos = (data);

                    })
                    .catch(error => {
                        console.error('Error al hacer la petición AJAX:', error);
                    });
            }
        },
        mounted() {
            this.cargaProductos();
        }
    }).mount('#app')

    const slider = document.querySelector(".items");
    const slides = document.querySelectorAll(".item");
    const button = document.querySelectorAll(".button");

    let current = 0;
    let prev = 4;
    let next = 1;

    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
    }

    const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

    const gotoNext = () => current < 4 ? gotoNum(current + 1) : gotoNum(0);

    const gotoNum = number => {
        current = number;
        prev = current - 1;
        next = current + 1;

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
            slides[i].classList.remove("prev");
            slides[i].classList.remove("next");
        }

        if (next == 5) {
            next = 0;
        }

        if (prev == -1) {
            prev = 4;
        }

        slides[current].classList.add("active");
        slides[prev].classList.add("prev");
        slides[next].classList.add("next");
    }
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const signUpButton2 = document.getElementById('signUp2');
    const signInButton2 = document.getElementById('signIn2');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    signUpButton2.addEventListener('click', () => {
        console.log("hola");
        container.classList.add("right-panel-active");
    });

    signInButton2.addEventListener('click', () => {
        console.log("hola");
        container.classList.remove("right-panel-active");
    });
}