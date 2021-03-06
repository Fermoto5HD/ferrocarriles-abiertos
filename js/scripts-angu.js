var app = angular.module('flota-ferroviaria', ['ngRoute', 'ngSanitize', 'angularMoment']);
var token = ""; 
app
	.run(function(amMoment) {
		amMoment.changeLocale('es');
	})
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
		//.when('/404',{ 
		//	templateUrl:'views/404.html' 
		//})
		.otherwise({
			//redirectTo: '/404'
			redirectTo: '/'
		});
	})
	
	.filter('reverse', function() {
		return function(items) {
			return items.slice().reverse();
		};
	})

	.controller('feedbackform', function ($scope, $http, $compile) {
		$scope.modalShow = false;
		$scope.rand1 = Math.floor(Math.random() * 10) + 1; 
		$scope.rand2 = Math.floor(Math.random() * 10) + 1; 
		
		$scope.addNums = function(){
			var answer = $scope.md_frm_mathcaptcha;
			var digit1 = $scope.rand1;
			var digit2 = $scope.rand2;
			var sum = digit1 + digit2;
			if (answer == ""){
				$scope.rand1 = Math.floor(Math.random() * 10) + 1; 
				$scope.rand2 = Math.floor(Math.random() * 10) + 1; 
				return false;
			} else if (answer != sum){
				$scope.rand1 = Math.floor(Math.random() * 10) + 1; 
				$scope.rand2 = Math.floor(Math.random() * 10) + 1; 
				return false;
			} else{
				return true;
			}
		}
		$scope.sendfeedback = function() {
		$scope.success = "";
			if ($scope.addNums()) {
				$http({
					method: 'POST', 
					url: 'php/feedback.php',
					data: 'name=:'+ $scope.md_frm_name + '&email=' + $scope.md_frm_email + '&msj='+$scope.md_frm_message,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}	
				}).	
				success(function(data, status) {
					// Set the data of the status
					$scope.alert = true; 
					$scope.resultado = data;
					$scope.md_frm_name = "";
					$scope.md_frm_email = "";
					$scope.md_frm_message = "";
					$scope.md_frm_mathcaptcha = "";
					$scope.rand1 = Math.floor(Math.random() * 10) + 1; 
					$scope.rand2 = Math.floor(Math.random() * 10) + 1; 
					$scope.success = "El feedback fue enviado. Gracias por contactarte conmigo, te contestaré lo más antes posible! ";
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
	.controller('line', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
		var randomresult = undefined; 
		var onlyone = 0; 
		$scope.line = $routeParams.line; 
		$http.get('data/linea'+$routeParams.line+'.csv').success(function(allText, status, headers){
			var allTextLines = allText.split(/\r\n|\n/);
			var heads = allTextLines[0].split(',');
			var tablehead = [];
			var lines = [];

			for ( var i = 0; i < allTextLines.length; i++) {
				// split content based on comma
				var data = allTextLines[i].split(',');
				if (i === 0) {
					if (data.length == heads.length) {
						var tarr = [];
						for ( var j = 0; j < heads.length; j++) {
							tarr.push(data[j]);
						}
						tablehead.push(tarr);
					}
				} else {
					if (data.length == heads.length) {
						var tarr = [];
						for ( var j = 0; j < heads.length; j++) {
							tarr.push(data[j]);
						}
						lines.push(tarr);
					}
				}
				
			}
			$scope.thead = tablehead;
			$scope.data = lines;
			$scope.lastmod = headers()['last-modified']; 
		});
		$scope.loadCSV = function(file){
			$http.get('data/'+file).success(function(allText, status, headers){
				var allTextLines = allText.split(/\r\n|\n/);
				var heads = allTextLines[0].split(',');
				var tablehead = [];
				var lines = [];

				for ( var i = 0; i < allTextLines.length; i++) {
					// split content based on comma
					var data = allTextLines[i].split(',');
					if (i === 0) {
						if (data.length == heads.length) {
							var tarr = [];
							for ( var j = 0; j < heads.length; j++) {
								tarr.push(data[j]);
							}
							tablehead.push(tarr);
						}
					} else {
						if (data.length == heads.length) {
							var tarr = [];
							for ( var j = 0; j < heads.length; j++) {
								tarr.push(data[j]);
							}
							lines.push(tarr);
						}
					}
					
				}
				$scope.thead = tablehead;
				$scope.data = lines;
				$scope.lastmod = headers()['last-modified']; 
			});
		}
		$scope.randomize = function(datalength) {
			if (randomresult === undefined) {
				randomresult = Math.floor(Math.random()*datalength); 
			} 
			return randomresult;
		}; 
	}])

	.controller('home', ['$http', '$scope', 'fact_youtube', function ($http, $scope, fact_youtube) {
		console.log('Home'); 

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

	.factory('fact_saitamapic', ['$http', function($http) {
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
	.factory('fact_listRailways', ['$http', function($http) {
		return {
			listRailways: function(callback) {
				$http.get('data/railways.json').success(function(data){
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

	.controller('Saitama', function($scope, fact_saitamapic) {
		$scope.layout = 'list';
		$scope.data = {};
		$scope.pics = [];

		fact_saitamapic.fetchPhotos(function(data) {
			if (data !== false) {
				$scope.pics = data;
			}
		});
	})
	.controller('listRailways', ['$scope', 'fact_listRailways', function ($scope, fact_listRailways) {
		$scope.test = "Test"; 
		$scope.JSONlines = []; 
		fact_listRailways.listRailways(function(data) {
			$scope.JSONlines = data;
		});
	}]); 