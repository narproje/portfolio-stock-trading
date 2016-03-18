app.controller('LeaderBoardController', function($scope, $stateParams, DashboardFactory, leaderBoardFactory, $location, $rootScope){

  // members will be an object of each member in the league
  // containing name, portfolio value, and other stats
  // desired to go on the leaderboard
  $scope.members = [
    {
      username: 'Sonny',
      value: 15000,
      return: '10%',
      transactions: 25
    },
    {
      username: 'Ted',
      value: 9000,
      return: '20%',
      transactions: 45
    },
    {
      username: 'Devonte',
      value: 3567,
      return: '6%',
      transactions: 5
    }
  ];

  $scope.leagueId = $stateParams.leagueId;
  $scope.portfolios;
  $scope.leagueName;

  $scope.getLeaderBoard = function(){
    // this will call a factory function to grab http data from server and assign returned data to $scope.members;
    leaderBoardFactory.getPortfolios($scope.leagueId)
      .then(function(portfolios){
        console.log(portfolios)
        $scope.portfolios = portfolios;
        $scope.leagueName = portfolios[0].leaguename;
        $scope.code = portfolios[0].code;
      })
  };

  $scope.getLeagueById = function(){
    DashboardFactory.getLeagueById($scope.leagueId).then(function(data){
      console.log('setting scope', data.code);
      $scope.secretCode = data.code;
    })
  }

  $scope.getLeagueById();
  $scope.getLeaderBoard();
  // once we have league ID, call to initialize leaderboard
  //$scope.getLeaderBoard(leagueId);
  $rootScope.$on("PortfolioUpdate", function(){
    $scope.getLeaderBoard();
  })
});