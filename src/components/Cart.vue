<template>
    <section class="container section">
        <h1 class="title">Cart</h1>
        
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Size</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="items.length !== 0" v-for="item in items" :key="item.id + item.size">
                    <td>{{ getItem(item.id) }}</td>
                    <td>{{ getSize(item.id, item.size) }}</td>
                    <td v-if="!viewOnly">
                        <input
                          type="number"
                          min="1"
                          v-model="item.quantity"
                          @change="editQuantity(item.id, item.size, $event.target.value)"
                          class="input"
                        >
                    </td>
                    <td v-if="viewOnly">{{ item.quantity }}</td>
                    <td>{{ $filters.price(item.price) }}</td>
                    <td>{{ $filters.price(item.price * item.quantity) }}</td>
                    <td v-if="!viewOnly"><a @click="removeItem(item.id, item.size)">
                        <fa-icon icon="fa-solid fa-times"></fa-icon>
                    </a></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" class="has-text-right is-size-4">Total</td>
                    <td colspan="2" class="is-size-4">{{ $filters.price(totalItems) }}</td>
                </tr>
            </tfoot>
        </table>

        <p v-if="noItemsError">You haven't selected any Products Yet.</p>

        <a v-if="!viewOnly" @click="checkout" class="button is-info">Checkout</a>
    </section>
</template>

<script>

export default {
    props: {
        viewOnly: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            noItemsError: false,
        }
    },
    computed: {
        items() {
            return this.$store.state.items;
        },
        products() {
            return this.$store.state.products;
        },
        totalItems() {
            return this.$store.getters.totalItems;
        },
    },
    methods: {
        getItem(id) {
            return this.products[id].name;
        },
        getSize(id, size) {
            return this.products[id].sizes[size].size;
        },
        editQuantity(id, size, quantity) {
            this.$store.commit("SET_ITEM_QUANTITY", { id, size, quantity });
        },
        removeItem(id, size) {
            this.$store.commit("REMOVE_ITEM", { id, size });
        },
        checkout() {
            if(this.items.length > 0) {
                this.$router.push("/checkout");
            } else {
                this.noItemsError = true;
            }
        }
    }
}

</script>

<style>
    
</style>