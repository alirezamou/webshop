<template>
    <div>
        Admin Product
    </div>
</template>
<script>
import db from "@/library/Database";

export default {
    name: "AdminProduct",
    data() {
        return {
            products: [],
            addingProduct: false,
            newProduct: {
                name: "",
                description: "",
                image: "",
                sizes: [],
            },
            newSize: {
                weight: "",
                name: "",
                price: ""
            },
        };
    },
    methods: {
        addProduct() {

            this.db.add_product(this.newProduct)
            .then((product) => {
                this.products.unshift({
                    id: product.id,
                    data: this.newProduct,
                });
            })
            .catch(error => console.log(error));

            this.addingProduct = false;
            this.newProduct = {
                name: "",
                description: "",
                image: "",
                sizes: [],
            };

            this.editProduct(0);
        },
        editProduct(index) {
            this.products.forEach(product => product.editing = false);
            this.products[index].editing = true;
        },
        saveProduct(index) {
            db.save_product(this.products[index].id, this.products[index].data)
            .then(() => {
                this.products[index].editing = false;
            });
        },
        deleteProduct(index) {
            db.delete_product(this.products[index].id)
            .then(() => {
                this.products.splice(index, 1);
            })
        },
        deleteSize(productIndex, sizeIndex) {
            this.products[productIndex].sizes.splice(sizeIndex, 1);
        },
        add_size(index) {
            this.products[index].sizes.push(this.newSize);
            this.newSize = {
                weight: "",
                name: "",
                price: ""
            };
        }
    }
}
</script>
<style>
    
</style>