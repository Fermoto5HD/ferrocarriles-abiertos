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
		//.when('/404',{ 
		//	templateUrl:'views/404.html' 
		//})
		.otherwise({
			//redirectTo: '/404'
			redirectTo: '/'
		});
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
		$scope.line = $routeParams.line; 
		$scope.data = [
			{ id:'A1', composition: 5, model: 'CNR Citic'},
			{ id:'X', composition: 5, model: 'Fiat Materfer'}
		]; 
		$http.get('data/linea'+$routeParams.line+'.csv').success(function(allText){
			// //console.log(data);
			// var lines, lineNumber, row, cell, length;
			// lines = data.match(/[^\r\n]+/g);
			// lineNumber = 0;
			// for (var i = 0; i < lines.length; i++) {
			// 	l = lines[i];
			// 	lineNumber++;
			// 	//console.log(l); 
			// 	row = l.split(/\t/);
			// 	console.log(row);
			// 	data = row[0].split(",");
			// 	//console.log(data);
			// 	//$scope.data.push({
			// 	//	name: name,
			// 	//	email: email,
			// 	//	status: "not sent"
			// 	//});
			// 	//var email = ? ? ?
			// 	//var name = ? ? ?
			// 	for (var k = 0; k < data.length; k++) {
			// 		console.log(data[k]);
			// 	}
			// };
			var allTextLines = allText.split(/\r\n|\n/);
			var headers = allTextLines[0].split(',');
			var tablehead = [];
			var lines = [];

			for ( var i = 0; i < allTextLines.length; i++) {
				// split content based on comma
				var data = allTextLines[i].split(',');
				if (i === 0) {
					if (data.length == headers.length) {
						var tarr = [];
						for ( var j = 0; j < headers.length; j++) {
							tarr.push(data[j]);
						}
						tablehead.push(tarr);
					}
				} else {
					if (data.length == headers.length) {
						var tarr = [];
						for ( var j = 0; j < headers.length; j++) {
							tarr.push(data[j]);
						}
						lines.push(tarr);
					}
				}
				
			}
			$scope.thead = tablehead;
			$scope.data = lines;
		});
		//$scope.agregar = function(){};
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