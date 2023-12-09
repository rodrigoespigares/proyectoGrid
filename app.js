window.onload = () => {
  const { createApp } = Vue
      
    createApp({
        data() {
            return {
                showPrincipal:true,
                showCatalogo:false,
                showDetalle:false,
                showRegister:false,
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
            cargaProductos(){
                fetch("prueba.json")
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

// Trying Behaviour Delegation instead of "JS classes"

const ANIMATING_CLASS = 'slider__item--animating';

const Slider = {
  init() {
    this.sliderEl = document.querySelector('.slider');
    this.slideInnerEl = document.querySelector('.slider__inner');
    this.sliderItemsEl = document.querySelectorAll('.slider__item');
    this.offset = 0;
    this.direction = 'left';
    this.maxOffset = (this.sliderItemsEl.length - 1) * 100;

    this.slideInnerEl.addEventListener('transitionend', this.onSliderTransitionEnd.bind(this));
    setInterval(this.slide.bind(this), 6000);
  },
  slide() {
    if (this.isMaxLeft()) {
      this.direction = 'right';
    } else if (this.isMaxRight()) {
      this.direction = 'left';
    }

    this.moveSlider();
  },
  isMaxLeft() {
    return this.offset <= -this.maxOffset;
  },
  isMaxRight() {
    return this.offset >= 0;
  },
  getCurrentPage() {
    if (this.offset < 0) {
      return (this.offset * -1) / 100;
    }

    return this.offset / 100;
  },
  getSignal() {
    return this.direction === 'left' ? -1 : 1;
  },
  onSliderTransitionEnd() {
    const signal = this.getSignal();
    const currentPage = this.getCurrentPage();

    this.sliderItemsEl.forEach(element => element.classList.remove(ANIMATING_CLASS));
  },
  moveSlider() {
    const signal = this.getSignal();
    const currentPage = this.getCurrentPage();

    this.offset = this.offset + (signal * 100);
    this.sliderItemsEl[currentPage].classList.add(ANIMATING_CLASS);
    this.sliderItemsEl[currentPage + (-1 * signal)].classList.add(ANIMATING_CLASS);
    this.slideInnerEl.style.setProperty('--slider-offset', `${this.offset}%`);
  }
};

const slider = Object.create(Slider);
slider.init();

}