app.config(["$mdIconProvider", function ($mdIconProvider) {
    $mdIconProvider
        .defaultIconSet('./assets/icons/mdi.svg')
}]);

// Disable aria warnings
app.config(["$mdAriaProvider", function ($mdAriaProvider) {
    $mdAriaProvider.disableWarnings();
}]);

// Fix for not working inputs on mobile devices
app.config(["$mdGestureProvider", function ($mdGestureProvider) {
    $mdGestureProvider.skipClickHijack();
}]);

// Sets the theme for the app
app.config(["$mdThemingProvider", function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo', {
            "default": "700"
        })
        .accentPalette('blue-grey', {
            "default": "500"
        })
        .warnPalette('deep-orange')
        .backgroundPalette('grey');

    $mdThemingProvider.theme('default-dark')
        .primaryPalette('blue-grey', {
            "default": "500"
        })
        .accentPalette('orange', {
            "default": "300"
        })
        .warnPalette('deep-orange')
        .backgroundPalette('grey')
        .dark();

    $mdThemingProvider.setDefaultTheme('default-dark');

}]);

// Sets the different routes for the app
app.config(["$routeProvider", "$injector", "RouteServiceProvider", function ($routeProvider, $injector, RouteServiceProvider) {

    var RouteService = RouteServiceProvider.$get[1]();

    var defaultRoute = RouteService.getDefaultRoute();
    var sidenavRoutes = RouteService.getRoutes().sidenav;
    var otherRoutes = RouteService.getRoutes().others;
    var redirects = RouteService.getRedirects();

    // Set default route
    $routeProvider
        .when("/", {
            redirectTo: "/"+defaultRoute.id
        });

    // Set sidenavRoutes
    angular.forEach(sidenavRoutes, function (route, routeId) {
        $routeProvider.when("/" + routeId, {
            template: route.template
        })
    });

    // Set otherRoutes
    angular.forEach(otherRoutes, function (route, routeId) {
        $routeProvider.when("/" + routeId, {
            template: route.template
        })
    });

    // Set redirects
    angular.forEach(redirects, function (redirect, index) {
        $routeProvider.when("/" + redirect["when"], {
            redirectTo: "/" + redirect.route.id
        })
    });

    // Set otherwise
    $routeProvider.otherwise("/");

}]);

