/**
 * Created by jcarrell on 10/22/18.
 */

function main()
{
    Vue.options.delimiters = ["[[", "]]"];

    const homeViewTemplate = { template: $("#homeView").html() };
    const productDetailsViewTemplate = { template: $("#productDetailsView").html() };

    const routes = [
        { path: '/', component: homeViewTemplate },
        { path: '/productdetails', component: productDetailsViewTemplate }
    ];

    const router = new VueRouter({
        routes // short for `routes: routes`
    });

    app = new Vue({
        el: "#mainApp",

        data: {
            loggedIn: true
        },

        router
    });
}

$(document).ready(main);