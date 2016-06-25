var app = angular.module('flota-ferroviaria', ['ngRoute']);
var token = ""; 
app
	.config(function($routeProvider){
		$routeProvider
		.when('/',{ 
			templateUrl:'views/home.html',
			controller: 'mainctrl'
		})
		.when('/linea',{ 
			redirectTo: '/'
		})
		.when('/linea/:line',{ 
			templateUrl:'views/line.html',
			controller: 'line'
		})
		.when('/about',{ 
			templateUrl:'views/about.html'
		})
		.when('/404',{ 
			templateUrl:'views/404.html' 
		})
		.otherwise({
			redirectTo: '/404'
		});
	})

	.controller('contactform', function ($scope, $http, $compile) {
		$scope.modalShow = false;
		$scope.rand1 = Math.floor(Math.random() * 10) + 1; 
		$scope.rand2 = Math.floor(Math.random() * 10) + 1; 
		
		$scope.addNums = function(){
			var answer = $scope.md_frm_mathcaptcha;
			var digit1 = $scope.rand1;
			var digit2 = $scope.rand2;
			var sum = digit1 + digit2;
			if (answer == ""){
				alert("looks like you forgot something, hint it's the math question");
				$scope.rand1 = Math.floor(Math.random() * 10) + 1; 
				$scope.rand2 = Math.floor(Math.random() * 10) + 1; 
				return false;
			} else if (answer != sum){
				alert("do you need a calculator? don't feel bad, math is not for everyone");
				$scope.rand1 = Math.floor(Math.random() * 10) + 1; 
				$scope.rand2 = Math.floor(Math.random() * 10) + 1; 
				return false;
			} else{
				return true;
			}
		}
		$scope.sendmail = function() {
		$scope.success = "";
			if ($scope.addNums()) {
				$http({
					method: 'POST', 
					url: 'php/mailing.php',
					data: 'name=:'+ $scope.md_frm_name + '&email=' + $scope.md_frm_email + '&tel=' + $scope.md_frm_tel + '&msj='+$scope.md_frm_message,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}	
				}).	
				success(function(data, status) {
					// Set the data of the status
					$scope.alert = true; 
					$scope.resultado = data;
					$scope.md_frm_name = "";
					$scope.md_frm_email = "";
					$scope.md_frm_tel = "";
					$scope.md_frm_message = "";
					$scope.md_frm_mathcaptcha = "";
					$scope.rand1 = Math.floor(Math.random() * 10) + 1; 
					$scope.rand2 = Math.floor(Math.random() * 10) + 1; 
					$scope.success = "El mensaje fue enviado. Gracias por contactarte conmigo, te contestarÃ© lo mÃ¡s antes posible! ";
				}).
				error(function(data, status) {
					$scope.alert = true; 
					$scope.data = data || "Request failed";
					$scope.status = status;
				});
			}
		}
	})

	.controller('mainctrl', function ($scope) {
		console.log('Default'); 
		//$scope.agregar = function(){};
	})

	.controller('home', ['$http', '$scope', 'fact_youtube', function ($http, $scope, fact_youtube) {
		console.log('Home'); 
		var d = new Date();
		var year = d.getFullYear();
		var birth = moment("1994-11-05");
		var birthday = moment(year+"-11-05");
		var todaysdate = moment();
		$scope.age = todaysdate.diff(birth, 'years');
		$scope.nextbirthday = birthday.diff(todaysdate, 'days');
		$scope.nextage = todaysdate.diff(birth, 'years')+1;

		fact_youtube.getPlaylists("Fermoto5HD").then(function (response) {
			$scope.$apply(function () {
				$scope.playlists = response.items;
			})
		})

		fact_youtube.getPlaylistVideos('UUBnPjaDK2VBKTtPOeNF-GIQ').then(function (response) {
			$scope.ytuploads = response;
			console.log(response); 
		})
		fact_youtube.getChannelInfo("Fermoto5HD").then(function (response) {
			$scope.ytchannelinfo = response;
			console.log(response); 
		});

		$scope.getPlaylistVideos = function (selection) {
			fact_youtube.getPlaylistVideos(selection.snippets.id).then(function (response) {
				$scope.playlistvideos = response.data.items;
			});
		}
	}])

	.controller('youtube', ['$http', '$scope', 'fact_youtube', function ($http, $scope, fact_youtube) {
		//console.log('YouTube'); 
		//fact_youtube.getPlaylists('UCBnPjaDK2VBKTtPOeNF-GIQ').then(function (response) {
		//  $scope.$apply(function () {
		//    $scope.playlists = response.items;
		//	})
		//});

		fact_youtube.getPlaylists("Fermoto5HD").then(function (response) {
			$scope.$apply(function () {
				$scope.playlists = response.items;
			})
		})

		fact_youtube.getPlaylistVideos('UUBnPjaDK2VBKTtPOeNF-GIQ').then(function (response) {
			$scope.ytuploads = response;
			console.log(response); 
		})
		fact_youtube.getChannelInfo("Fermoto5HD").then(function (response) {
			$scope.ytchannelinfo = response;
			console.log(response); 
		});

		$scope.getPlaylistVideos = function (selection) {
			fact_youtube.getPlaylistVideos(selection.snippets.id).then(function (response) {
				$scope.playlistvideos = response.data.items;
			});
		}
	}])

	.factory('fact_InstagramAPI', ['$http', function($http) {
		return {
			fetchPhotos : function(callback) {
				var tokenURL = 'https://www.instagram.com/oauth/authorize/?client_id=3c38d510e4ce43b08f4157fd0ee381fb&redirect_uri=http://localhost/&response_type=token';
				$http.jsonp(tokenURL).success(function(response) {
					token = response.data;
				});
				var endpoint = 'https://api.instagram.com/v1/users/1631184808/media/recent/?count=1&access_token=1631184808.3c38d51.06928053fc3a4bacb7562a6b2a5e0245&callback=JSON_CALLBACK';
				$http.jsonp(endpoint).success(function(response) {
					callback(response.data);
				}).error(function() {
					callback(false);
				});
			}
		}
	}])
	.factory('fact_portfolioList', ['$http', function($http) {
		return {
			listPortfolio: function(callback) {
				$http.get('data/portfolio.json').success(function(data){
					callback(data);
				});
			}
		};
	}])
	.factory('fact_youtube', ['$http', function ($http) {
		//var channelId = "UCBnPjaDK2VBKTtPOeNF-GIQ"; 
		var key = 'AIzaSyAp2-KIKz8vpd0GgObEMpC2vFdAktw7KB0'; 
		//function getPlaylists(channelId) {
		//	return $.get("https://www.googleapis.com/youtube/v3/channels", { part: 'snippet', channelId: channelId, key: key, categoryId: "GCQmVzdCBvZiBZb3VUdWJl" });
		//}
		//function getPlaylistVideos(id) {
		//	return $http.get('https://www.googleapis.com/youtube/v3/videos', { params: { part: 'snippet', id: id, key: key } });
		//}
		function getChannelInfo(ytchannel) {
			return $.get("https://www.googleapis.com/youtube/v3/channels", {
				part : 'statistics', 
				forUsername : ytchannel,
				key: key
			});
		}
		function getPlaylists(ytchannel) {
			return $.get("https://www.googleapis.com/youtube/v3/channels", {
				part : 'contentDetails', 
				forUsername : ytchannel,
				key: key
			});
		}
		function getPlaylistVideos(id) {
			return $http.get('https://www.googleapis.com/youtube/v3/playlistItems', {
				params: {
					part : 'snippet', 
					maxResults : 10,
					playlistId : id,
					key: key
				} 
			});
		}
		return {getChannelInfo: getChannelInfo, getPlaylists: getPlaylists, getPlaylistVideos: getPlaylistVideos }
	}])

	.controller('Saitama', function($scope, fact_InstagramAPI) {
		$scope.layout = 'list';
		$scope.data = {};
		$scope.pics = [];

		fact_InstagramAPI.fetchPhotos(function(data) {
			if (data !== false) {
				$scope.pics = data;
			}
		});
	})
	.controller('listPortfolio', ['$scope', 'fact_portfolioList', function ($scope, fact_portfolioList) {
		$scope.portfolio = []; 
		fact_portfolioList.listPortfolio(function(data) {
			$scope.portfolio = data;
		});
	}]); 