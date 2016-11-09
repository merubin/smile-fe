console.log("starting app.js");

angular
  .module("smile", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    "$locationProvider",
    Router
  ])
  .factory("PhotoFactory",[
    "$resource",
    PhotoFactoryFunction
  ])
  .controller("PhotoIndexController", [
    "PhotoFactory",
    "$location",
    PhotoIndexControllerFunction
  ])

function Router($stateProvider, $locationProvider){
  $locationProvider.html5Mode(true)
  $stateProvider
    .state("photoIndex", {
      url: "/",
      templateUrl: "ng-views/index.html",
      controller: "PhotoIndexController",
      controllerAs: "vm",
    })
}

function PhotoFactoryFunction($resource){
  console.log("PhotoFactoryFunction running");
  // ???????????
  // return $resource("http://localhost:3000/", {}, {
  return $resource("https://git.heroku.com/smile-be.git/", {}, {
    create: {method: "POST"}
  })
}

function PhotoIndexControllerFunction(PhotoFactory, $location){
  console.log("PhotoIndexControllerFunction running");
  console.log(PhotoFactory);
  this.photos = PhotoFactory.query()
  this.create = function() {
    console.log("Form submited CREATE")
    PhotoFactory.create({
      name: this.newPhoto.name,
      description: this.newPhoto.description,
      photoUrl: this.newPhoto.photoUrl
    }).$promise.then(  () => {
      console.log("CREATE then")
      this.photos = PhotoFactory.query()
    })

  }
}

console.log("end of app.js");
