/**
 * Created by jcarrell on 10/22/18.
 */

function main()
{
    Vue.options.delimiters = ["[[", "]]"];

    Vue.component("basic-item", {
        template: "#basicItemDisplayComponent",
        props: {
            item: undefined,
            allow_shopping_cart_update: true
        },

        data()
        {
            return {
                itemQuantity: 0
            };
        },

        methods: {
            addOneToCart()
            {
                /**
                 * Add 1 to the quantity of this item in the shopping cart
                 * and get back the total quantity for this item.
                 *
                 * :return: None
                 */

                this.itemQuantity = this.$root.addOneToCart(this.item);
            },

            removeOneFromCart()
            {
                /**
                 * Subtract 1 from the quantity of this item in the shopping cart
                 * and get back the total quantity for this item.
                 *
                 * :return: None
                 */

                this.itemQuantity = this.$root.removeOneFromCart(this.item);
            },

            updateShoppingCart()
            {
                /**
                 * Set the quantity of this item in the shopping cart to the value of 'this.itemQuantity'.
                 *
                 * :return: None
                 */

                this.$root.updateShoppingCart(this.item, this.itemQuantity);
            }
        },

        created()
        {
            /**
             * When this component is created call me.
             *
             * :return: None
             */

            // Initialize the itemQuantity based on the state of the shopping cart.
            this.itemQuantity = this.$root.getProductShoppingCartQuantity(this.item.id);
        }
    });

    const homeView = {
        template: $("#homeView").html(),
        name: "homeView",
        data()
        {
            /**
             * Component's must define their 'data' attribute as a function.
             * When an instance of the component is called this function is call to populate it's initial state.
             * If it were just an object each component's state would be a reference to the same object.
             *
             * :return: None
             */

            return {
                topSellers: undefined
            };
        },
        methods: {
            async getTopSellers()
            {
                try
                {
                    this.topSellers = await $.get("/api/get_top_sellers");
                }
                catch (e)
                {
                    console.error(e);
                }
            }
        },
        computed: {},

        created()
        {
            this.getTopSellers();
        }
    };
    const productDetailsView = {
        template: $("#productDetailsView").html(),

        // props: ["myid"],

        data()
        {
            return {
                product: undefined,
                itemQuantity: this.$root.getProductShoppingCartQuantity(this.$route.params.myid)
            }
        },

        methods: {
            async getProduct()
            {
                this.product = await ($.get(`/api/get_product_by_id/${this.$route.params.myid}`));
            },

            addOneToCart()
            {
                /**
                 * Add 1 to the quantity of this item in the shopping cart
                 * and get back the total quantity for this item.
                 *
                 * :return: None
                 */

                this.itemQuantity = this.$root.addOneToCart(this.product);
            },

            removeOneFromCart()
            {
                /**
                 * Subtract 1 from the quantity of this item in the shopping cart
                 * and get back the total quantity for this item.
                 *
                 * :return: None
                 */

                this.itemQuantity = this.$root.removeOneFromCart(this.product);
            },

            updateShoppingCart()
            {
                /**
                 * Set the quantity of this item in the shopping cart to the value of 'this.itemQuantity'.
                 *
                 * :return: None
                 */

                this.$root.updateShoppingCart(this.product, this.itemQuantity);
            }
        },

        created()
        {
            this.getProduct();
        }
    };
    const shoppingCartView = {
        template: $("#shoppingCartView").html(),
        name: "shoppingCartView",

        data()
        {
            return {};
        }
    };

    const routes = [
        {
            path: "/",
            component: homeView,
            props: true
        },
        {
            path: "/productdetails/:myid",
            name: "productdetails",
            component: productDetailsView
        },
        {
            path: "/shoppingcart",
            component: shoppingCartView
        }
    ];

    const router = new VueRouter({
        routes // short for `routes: routes`
    });

    app = new Vue({
        el: "#mainApp",
        name: "mainApp",
        router,

        data: {
            loggedIn: true,
            shoppingCart: [
                /*{
                    product: {
                        id: 0,
                        imageUrl: "https://picsum.photos/160/160/?random",
                        name: "Product A",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum.",
                        price: 2.35
                    },
                    quantity: 2
                }*/
            ]
        },

        methods: {
            addOneToCart(product)
            {
                /**
                 * Add one to the quantity of product 'product' in the shopping cart.
                 *
                 * :param: product: (object) The product for which to add one unit.
                 *
                 * :return: The total number of this item in the shopping cart after adding one.
                 */

                // TODO Maybe don't need anything but the product id
                for (const item of this.shoppingCart)
                {
                    if (item.product.id === product.id)
                    {
                        return ++item.quantity;
                    }
                }

                this.shoppingCart.push(
                    {
                        product,
                        quantity: 1
                    }
                );

                return 1;
            },

            removeOneFromCart(product)
            {
                /**
                 * Remove one from the quantity of product 'product' in the shopping cart.
                 *
                 * :param: product: (object) The product for which to remove one unit.
                 *
                 * :return: The total number of this item in the shopping cart after attempting to remove one.
                 */

                for (const [index, item] of this.shoppingCart.entries())
                {
                    if (item.product.id === product.id)
                    {
                        if (item.quantity <= 1)
                        {
                            this.shoppingCart.splice(index, 1);

                            return 0;
                        }
                        else
                        {
                            return --item.quantity;
                        }
                    }
                }

                return 0;
            },

            updateShoppingCart(product, quantity)
            {
                /**
                 * Set the quantity of the item representing 'product' in the shopping cart to 'quantity'.
                 *
                 * :param: product: (object) The product whose shopping cart entry's quantity should be set.
                 *
                 * :param: quantity: (int) The quantity to which to set the shopping cart entry representing 'product'.
                 *
                 * :return: None
                 */

                for (const [index, item] of this.shoppingCart.entries())
                {
                    if (item.product.id === product.id)
                    {
                        if (quantity > 1)
                        {
                            item.quantity = quantity;
                        }
                        else
                        {
                            this.shoppingCart.splice(index, 1);
                        }

                        return;
                    }
                }

                if (quantity > 0)
                {
                    this.shoppingCart.push(
                        {
                            product,
                            quantity: quantity
                        }
                    );
                }
            },

            getProductShoppingCartQuantity(productId)
            {
                /**
                 * Return the quantity for the item with product.id 'productId'
                 *
                 * :param: productId: The product.id value for which to search the shopping and return the quantity.
                 *
                 * :return: The quantity of the item in the shopping cart with the product.id value of 'productId'.
                 */


                for (const item of this.shoppingCart)
                {
                    if (item.product.id === productId)
                    {
                        return item.quantity;
                    }
                }

                return 0;
            },

            getShoppingCartTotalItems()
            {
                /**
                 * Return the total number of item units in the shopping cart.
                 *
                 * :return: The total number of items * each of their units in the shopping cart.
                 */

                return this.shoppingCart.reduce( (sum, cartItem) => sum + cartItem.quantity, 0 );
            },

            getShoppingCartSubtotal()
            {
                /**
                 * Get the total cost of all shopping cart units.
                 *
                 * :return: The total cost of all shopping cart units.
                 */

                return this.shoppingCart.reduce( (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0 );
            }
        }
    });
}

$(document).ready(main);