<template>
    <section class="section container">
        <div class="tabs is-navigation">
            <ul>
                <li :class="{ 'is-active': step === 1 }"><a>1. Information</a></li>
                <li :class="{ 'is-active': step === 2 }"><a>2. Payment &amp; Shipping</a></li>
                <li :class="{ 'is-active': step === 3 }"><a>3. Confirmation</a></li>
            </ul>
        </div>

        <div class="columns">
            <div class="column is-8 is-offset-2">
                <Form @submit="nextStep" v-if="step === 1">
                    <h1 class="title">Your information</h1>

                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                          <Field
                            class="input"
                            type="text"
                            v-model="customer.name"
                            placeholder="Your name"
                            name="name"
                            :rules="(value) => value ? true : 'Please enter your name'"
                          />
                          <ErrorMessage name="name" class="help is-danger" />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Address</label>
                        <div class="control">
                          <Field
                            class="input"
                            type="text"
                            v-model="customer.address"
                            placeholder="Your address"
                            name="address"
                            :rules="(value) => value ? true : 'Please enter your address'"
                          />
                          <ErrorMessage name="address" class="help is-danger" />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Country</label>
                        <CountrySelect @select="updateCountry" :selectedCountry="customer.country"/>
                    </div>

                    <div class="field">
                        <label class="label">City</label>
                        <div class="control">
                          <Field
                            class="input"
                            type="text"
                            v-model="customer.city"
                            placeholder="Marshmellow Town"
                            name="city" 
                            :rules="(value) => value ? true : 'Please enter your city'"
                          />
                          <ErrorMessage name="city" class="help is-danger" />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Postcode</label>
                        <div class="control">
                          <Field
                            class="input"
                            type="text"
                            v-model="customer.postcode"
                            placeholder="12345"
                            name="postcode" 
                            :rules="(value) => value ? true : 'Please enter your postcode'"
                          />
                          <ErrorMessage name="postcode" class="help is-danger" />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                          <Field
                            class="input"
                            type="text"
                            v-model="customer.email"
                            placeholder="Your@email.address"
                            name="email" 
                            :rules="validateEmail"
                          />
                          <ErrorMessage name="email" class="help is-danger" />
                        </div>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                          <button class="button is-link">Continue to shipping &amp; payment</button>
                        </div>
                    </div>

                </Form>

                <Form
                  @submit="nextStep"
                  v-slot="{ values }"
                  :validation-schema="schema"
                  v-if="step === 2"
                  class="columns is-multiline">
                    <div class="column is-third">
                        <div class="box">
                            <h2 class="title is-4">Shipping</h2>

                            <div class="control">
                                <p v-for="(shippingOption, index) in shippingOptions" :key="index">
                                    <label class="label">
                                        <Field
                                          type="radio"
                                          :value="index"
                                          name="shipping"
                                          v-model="shipping"
                                        />
                                        {{ shippingOption.name }} (+{{ shippingOption.price }})
                                    </label>
                                </p>

                                <ErrorMessage name="shipping" class="help is-danger" />
                            </div>
                        </div>
                    </div>

                    <div class="column is-third">
                        <div class="box">
                            <h2 class="title is-4">Payment</h2>

                            <div class="control">
                                <p v-for="(paymentOption, index) in paymentOptions" :key="index">
                                    <label class="label">
                                        <Field
                                          type="radio"
                                          :value="index"
                                          name="payment"
                                          v-model="payment"
                                        />
                                        {{ paymentOption.name }} (+{{ paymentOption.price }})
                                    </label>
                                </p>

                                <ErrorMessage name="payment" class="help is-danger" />
                            </div>
                        </div>
                    </div>

                    <div class="column is-third">
                        <div class="box">
                            <h2 class="title is-4">Total</h2>

                            <p>Cart: {{ totalItems }}</p>
                            <p>Incl. shipping and payment: {{ total }}</p>
                        </div>
                    </div>


                    <div class="field is-grouped column is-12">
                        <div class="control">
                            <button type="submit" class="button is-link">Continue to confirmation</button>
                        </div>
                    </div>
                </Form>

                <Form v-if="step === 3" class="columns is-multiline" @submit="checkout">
                    <Cart viewOnly />

                    <div class="column is-third">
                        <h2 class="title is-5">Shipping</h2>
                        <p>{{ selectedShipping.name }}</p>
                        <p>{{ selectedShipping.price }}</p>
                    </div>
                    <div class="column is-third">
                        <h2 class="title is-5">Payment</h2>
                        <p>{{ selectedPayment.name }}</p>
                        <p>{{ selectedPayment.price }}</p>
                    </div>

                    <div class="column is-third">
                        <h2 class="title is-4">Total {{ total }}</h2>
                    </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <button type="submit" class="button is-link">Confirm order</button>
                        </div>
                    </div>
                </Form>


                <div v-if="step === 4">
                    <h1 class="title">Thank you for your order!</h1>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import CountrySelect from "@/components/CountrySelect.vue";
import Cart from "@/components/Cart.vue";

import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    name: "Checkout",
    components: {
        CountrySelect,
        Cart,
        Form,
        Field,
        ErrorMessage
    },
    setup() {
        const schema = {
            shipping: (value) => {
                if (value || value !== undefined) {
                    return true;
                }

                return 'You must choose a shipping option';
            },
            payment: (value) => {
                if (value || value !== undefined) {
                    return true;
                }

                return 'You must choose a payment option';    
            }
        };

        return {
            schema,
        }
    },
    data() {
        return {
            step: 1,
            customer: this.$store.state.customer,
            shippingOptions: [
                { name: "Postal Service", price: 10 },
                { name: "Pickup", price: 0}
            ],
            paymentOptions: [
                { name: "Cash on delivery", price: 0 }
            ]
        };
    },
    computed: {
        total() { return this.$store.getters.total },
        totalItems() { return this.$store.getters.totalItems },
        shipping: {
            get() {
                return this.shippingOptions.findIndex(s => s.name === this.$store.state.shipping.name);
            },
            set(value) {
                this.$store.commit("SET_SHIPPING", this.shippingOptions[value]);
            }
        },
        selectedShipping() {
            return this.shippingOptions[this.shipping];
        },
        payment: {
            get() {
                return this.paymentOptions.findIndex(s => s.name === this.$store.state.payment.name);
            },
            set(value) {
                this.$store.commit("SET_PAYMENT", this.paymentOptions[value]);
            }
        },
        selectedPayment() {
            return this.paymentOptions[this.payment];
        },
    },
    watch: {
        customer: {
            handler(customer) {
                this.$store.commit("SET_CUSTOMER", customer);
            },
            deep: true,
        },
    },
    methods: {
        updateCountry(country) {
            this.customer.country = country;
        },
        nextStep() {
            this.step += 1;
        },
        checkout() {
            this.$store.dispatch("addOrder").then(() => this.step = 4);
        },
        validateEmail(value) {
            // if the field is empty
            if (!value) {
              return 'Please enter your email address';
            }
        
            // if the field is not a valid email
            const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!regex.test(value)) {
              return 'This field must be a valid email';
            }
        
            // All is good
            return true;
        },
    }
}

</script>

<style>
    
</style>