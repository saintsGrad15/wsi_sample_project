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
                this.itemQuantity = this.$root.addOneToCart(this.item);
            },

            removeOneFromCart()
            {
                this.itemQuantity = this.$root.removeOneFromCart(this.item);
            },

            updateShoppingCart()
            {
                this.$root.updateShoppingCart(this.item, this.itemQuantity);
            }
        },

        created()
        {
            this.itemQuantity = this.$root.getProductShoppingCartQuantity(this.item.id);
        }
    });

    const homeViewTemplate = {
        template: $("#homeView").html(),
        data()
        {
            return {
                topSellers: [
                    {
                        id: 0,
                        imageUrl: "https://picsum.photos/160/160/?random",
                        name: "Product H",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum.",
                        price: 2.35
                    },
                    {
                        id: 1,
                        imageUrl: "https://picsum.photos/160/160/?random",
                        name: "Product A",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum.",
                        price: 4.00
                    },
                    {
                        id: 2,
                        imageUrl: "https://picsum.photos/160/160/?random",
                        name: "Product A",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum.",
                        price: 0.75
                    },
                    {
                        id: 3,
                        imageUrl: "https://picsum.photos/160/160/?random",
                        name: "Product A",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum.",
                        price: 10.00
                    },
                    {
                        id: 4,
                        imageUrl: "https://picsum.photos/160/160/?random",
                        name: "Product A",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum.",
                        price: 6.18
                    }
                ],
            };
        },
        methods: {},
        computed: {}
    };
    const productDetailsViewTemplate = {
        template: $("#productDetailsView").html(),
        methods: {}
    };

    const routes = [
        {
            path: '/',
            component: homeViewTemplate,
            props: true
        },
        {
            path: '/productdetails',
            component: productDetailsViewTemplate
        }
    ];

    const router = new VueRouter({
        routes // short for `routes: routes`
    });

    app = new Vue({
        el: "#mainApp",
        name: "mainApp",

        data: {
            loggedIn: true,
            shoppingCart: [
                {
                    product: {
                        id: 0,
                        imageUrl: "https://picsum.photos/160/160/?random",
                        name: "Product H",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum.",
                        price: 2.35
                    },
                    quantity: 2
                }
            ]
        },

        methods: {
            addOneToCart(product)
            {
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
                console.log(quantity);

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
                return this.shoppingCart.length;
            },

            getShoppingCartSubtotal()
            {
                return this.shoppingCart.reduce( (sum, cartItem) =>
                {
                    return sum + cartItem.product.price * cartItem.quantity;
                }, 0 );
            }
        },

        router
    });
}

$(document).ready(main);