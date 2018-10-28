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

        methods: {
            addToCart(product, clickEvent)
            {
                const newQuantity = this.$root.addToCart(product);

                $(clickEvent.currentTarget)
                    .parent()
                    .find(".shoppingCartQuantity")
                    .val(newQuantity);
            },

            removeFromCart(product, clickEvent)
            {
                const newQuantity = this.$root.removeFromCart(product);

                $(clickEvent.currentTarget)
                    .parent()
                    .find(".shoppingCartQuantity")
                    .val(newQuantity);
            }
        },
    });

    const homeViewTemplate = {
        template: $("#homeView").html(),
        // props: ["top_sellers"],
        data()
        {
            return {
                topSellers: [
                    {
                        id: 0,
                        imageUrl: "https://picsum.photos/160/160/?random",
                        name: "Product H",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum."
                    },
                    {
                        id: 1,
                        imageUrl: "https://picsum.photos/160/160/?random",
                        name: "Product A",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum."
                    },
                    {
                        id: 2,
                        imageUrl: "https://picsum.photos/160/160/?random",
                        name: "Product A",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum."
                    },
                    {
                        id: 3,
                        imageUrl: "https://picsum.photos/160/160/?random",
                        name: "Product A",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum."
                    },
                    {
                        id: 4,
                        imageUrl: "https://picsum.photos/160/160/?random",
                        name: "Product A",
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum."
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
                        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent cursus sed neque vel lobortis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porttitor augue eu libero molestie tincidunt. In nec augue id libero vehicula venenatis vitae nec turpis. Cras sit amet turpis at velit venenatis ornare. Aliquam tincidunt, mauris et rhoncus lobortis, nunc dui vehicula massa, non viverra augue diam eget felis. Nullam vitae mattis lacus. Quisque hendrerit lorem quis tellus bibendum, non imperdiet felis interdum."
                    },
                    quantity: 2
                }
            ]
        },

        methods: {
            addToCart(product)
            {
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

            removeFromCart(product)
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

            getProductShoppingCartQuantity(productId)
            {
                for (const item of this.$root.shoppingCart)
                {
                    if (item.product.id === productId)
                    {
                        return item.quantity;
                    }
                }

                return 0;
            }
        },

        router
    });
}

$(document).ready(main);