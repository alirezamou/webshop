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
                                <td>{{ $filters.price(size.price) }}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="field">
                        <label>Quantity</label>
                        <input type="number" v-model="quantity">
                    </div>
                    <div class="field">
                        <label>Total</label>
                        <p>{{ $filters.price(total) }}</p>
                    </div>
                    <button type="submit" class="button is-success">
                        <fa-icon icon="fa-solid fa-plus"></fa-icon> Add to cart
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            pickedSize: 0,
            quantity: 1,
        };
    },
    computed: {
        product() {
            return this.$store.getters.getProduct(this.$route.params.id);
        },
        total() {
            if(this.product.sizes === undefined) return 0;

            return this.product.sizes[this.pickedSize].price * this.quantity;
        }
    },
    methods: {
        addToCart() {
            this.$store.commit("ADD_ITEM", {
                id: this.$route.params.id,
                size: this.pickedSize,
                quantity: this.quantity,
                price: this.product.sizes[this.pickedSize].price
            })
        }
    },
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