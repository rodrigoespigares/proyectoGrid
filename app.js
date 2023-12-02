window.onload = () => {
  const { createApp } = Vue
      
createApp({
    data() {
        return {
            showPrincipal:true,
            showCatalogo:false,
            showDetalle:false,
            showCarrito:false,
        }
    },
    methods:{

    }
}).mount('#app')
}