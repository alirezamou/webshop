<template>
    <section class="section container">
        <div class="columns box">
            <div class="column is-8">
                <img :src="product.image" :alt="product.name">

                <p>{{ product.description }}</p>
            </div>

            <div class="column is-4">
                <h1 class="title">{{ product.name }}</h1>

                <form @submit.prevent="addToCart">
                    <table class="table is-borderless is-hoverable is-compact">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Size</th>
                                <th>Weight</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(size, index) in product.sizes" :key="index">
                                <td><input type="radio" name="size" :value="index" v-model="pickedSize"></td>
                                <td>{{ size.name }}</td>
                                <td>{{ size.weight }}</td>
                                <td>{{ size.price }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="field">
                        <label>Quantity</label>
                        <input type="number" v-model="quantity">
                    </div>
                    <div class="field">
                        <label>Total</label>
                        <p>{{ total }}</p>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
import db from "@/library/Database";

export default {
    data() {
        return {
            product: {},
            pickedSize: 0,
            quantity: 1,
        };
    },
    computed: {
        total() {
            if(this.product.sizes === undefined) return 0;

            return this.product.sizes[this.pickedSize].price * this.quantity;
        }
    },
    methods: {
        addToCart() {}
    },
    created() {
        db.get_product(this.$route.params.id)
        .then((product) => this.product = product.data())
    }
}
</script>

<style scoped>

img {
    margin: -32px;
    margin-bottom: 1.5rem;
}

p {
    font-size: 1.1em;
}
</style>