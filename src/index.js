const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//mockup productos
const PRODUCTS = require('./mockups/productos');




/**
 * Servicio REST para obtener la lista de productos
 * dado un termino de busqueda
 * @param q Termino de busqueda
 * @returns Devuelve el objeto con la lista de productos
 */
app.get('/sites/MLA/search', (req, res) => {

    const query = req.query.q;

    let productsResponse = {
        author: {
            name: "Laura",
            lastname: "Ramos"
        },
        categories: ["Electronica, audio y video", "Cocina", "Hogar"],
        items: []
    }


    // Buscar productos por el temrino de busqueda
    for (let product of PRODUCTS.items) {
        if (product.title.toLocaleLowerCase().includes(query)) {
            productsResponse.items.push(product);
        }
    }
    res.json(productsResponse);
})


/**
   * Servicio REST para obetener el detalle de un producto dado el ID
   * @param id Id del producto seleccionado
   * @returns Devuelve el objeto detalle del producto
   */
app.get('/items', (req, res) => {

    const id = req.query.id;

    let productsResponse = {
        author: {
            name: "Laura",
            lastname: "Ramos"
        },
        item: {}
    }

    
    // Buscar el detalle dado el Id del producto
    for (let product of PRODUCTS.items) {
        if (product.id === id) {
            productsResponse.item = product;
        }
    }
    res.json(productsResponse);
})




//Iniciando el servidor, escuchando...
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});