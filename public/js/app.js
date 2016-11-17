"use strict";function Router(e,o){e.state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("moodIndex",{url:"/moodIndex",templateUrl:"/templates/moodIndex.html"}).state("userForm",{url:"/userForm",templateUrl:"/templates/userForm.html",controller:"UserFormController as userForm"}).state("search",{url:"/search",templateUrl:"/templates/searchEngine/search.html"}).state("searchPictures",{url:"/search/pictures",templateUrl:"/templates/searchEngine/searchPictures.html",controller:"PicturesIndexController as picturesIndex"}).state("searchVideos",{url:"/search/videos",templateUrl:"/templates/searchEngine/searchVideos.html",controller:"VideosIndexController as videosIndex"}).state("userData",{url:"/userData",templateUrl:"/templates/userData.html",controller:"UserDataController as userData"}).state("soundScapeExperience",{url:"/experiences/soundscape",templateUrl:"/templates/sessions/soundScapeExperience.html",controller:"SoundScapeController as soundScape"}).state("instrumentExperience",{url:"/experiences/instrument",templateUrl:"/templates/sessions/instrumentExperience.html",controller:"InstrumentExperienceController as instrumentExperience"}).state("breathingExercise",{url:"/experiences/breathing",templateUrl:"/templates/sessions/breathingExercise.html",controller:"BreathingExerciseController as breathingExercise"}).state("elizaChatBot",{url:"/experiences/elizaChatBot",templateUrl:"/templates/sessions/elizaChatBot.html",controller:"ElizaChatBotController as elizaChatBot"}).state("moodCarousel",{url:"/templates/moodCarousel",templateUrl:"/templates/moodCarousel.html",controller:"MoodCarouselController as moodCarousel"}),o.otherwise("/moodIndex")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1114403908656537"}),e.github({clientId:"f226d5ade062bb0c6600"})}function RegisterController(e,o){function t(){e.signup(r.user).then(function(){o.go("login")})}var r=this;r.user={},r.submit=t}function LoginController(e,o){function t(){e.login(l.credentials).then(function(){o.go("userForm")})}function r(t){e.authenticate(t).then(function(e){console.log(e),o.go("moodIndex")})}var l=this;l.credentials={},l.submit=t,l.authenticate=r}function SoundScapeController(){}function InstrumentExperienceController(){}function BreathingExerciseController(){}function ElizaChatBotController(){}function MoodCarouselController(){}function MainController(e,o,t){function r(){e.logout().then(function(){o.go("moodIndex")})}function l(t,r){n.message=null,console.log(r,t),!e.isAuthenticated()&&s.includes(r.name)&&(t.preventDefault(),n.message="You must be logged in to go there!",o.go("login"))}var n=this;n.isLoggedIn=e.isAuthenticated,n.message=null;var s=["moodIndex"];t.$on("$stateChangeStart",l),n.logout=r}function Pictures(e){return new e("/pictures/:id",{id:"@_id"},{update:{method:"PUT"}})}function PicturesIndexController(e){var o=this;console.log(e),o.all=e.query()}function PicturesShowController(e,o,t){var r=this;r.picture=e.get(o.params),r.isLoggedIn=t.isAuthenticated}function PicturesNewController(e,o){function t(){e.save(r.picture,function(){o.go("searchPictures")})}var r=this;r.picture={},r.create=t}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function UserFormController(e,o,t){function r(){l.user.$update(function(){console.log("post update your data",l.user),t.go("moodIndex")})}var l=this;l.user=o.get({id:e.getPayload()._id}),l.submit=r}function UserDataController(e,o){var t=this;t.user=o.get({id:e.getPayload()._id})}function MoodCarouselController(e,o,t){function r(r){console.log("clicked: ",r),l.user.mood=r,console.log(l.user);var n=o.update({id:e.getPayload()._id},l.user);console.log("updateResult:",n),t.go("userData")}var l=this;l.user=o.get({id:e.getPayload()._id}),l.moodSelect=r}function Videos(e){return new e("/videos/:id",{id:"@_id"},{update:{method:"PUT"}})}function VideosIndexController(e){var o=this;console.log(e),o.all=e.query()}function VideosShowController(e,o,t){var r=this;r.video=e.get(o.params),r.isLoggedIn=t.isAuthenticated}function VideosNewController(e,o){function t(){e.save(r.video,function(){o.go("searchVideos")})}var r=this;r.video={},r.create=t}angular.module("moodApp",["ngResource","ui.router","satellizer","angular-carousel"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("moodApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["$auth","$state"],angular.module("moodApp").controller("SoundScapeController",SoundScapeController).controller("InstrumentExperienceController",InstrumentExperienceController).controller("BreathingExerciseController",BreathingExerciseController).controller("ElizaChatBotController",ElizaChatBotController).controller("MoodCarouselController",MoodCarouselController),SoundScapeController.$inject=[],InstrumentExperienceController.$inject=[],BreathingExerciseController.$inject=[],ElizaChatBotController.$inject=[],MoodCarouselController.$inject=[],angular.module("moodApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope"],angular.module("moodApp").factory("Pictures",Pictures),Pictures.$inject=["$resource"],angular.module("moodApp").controller("PicturesIndexController",PicturesIndexController).controller("PicturesShowController",PicturesShowController).controller("PicturesNewController",PicturesNewController),PicturesIndexController.$inject=["Pictures"],PicturesShowController.$inject=["Picture","$state","$auth"],PicturesNewController.$inject=["Picture","$state"],angular.module("moodApp").factory("User",User),User.$inject=["$resource"],angular.module("moodApp").controller("UserFormController",UserFormController).controller("UserDataController",UserDataController).controller("MoodCarouselController",MoodCarouselController),UserFormController.$inject=["$auth","User","$state"],UserDataController.$inject=["$auth","User"],MoodCarouselController.$inject=["$auth","User","$state"],angular.module("moodApp").factory("Videos",Videos),Videos.$inject=["$resource"],angular.module("moodApp").controller("VideosIndexController",VideosIndexController).controller("VideosShowController",VideosShowController).controller("VideosNewController",VideosNewController),VideosIndexController.$inject=["Videos"],VideosShowController.$inject=["Video","$state","$auth"],VideosNewController.$inject=["Video","$state"];
//# sourceMappingURL=app.js.map
