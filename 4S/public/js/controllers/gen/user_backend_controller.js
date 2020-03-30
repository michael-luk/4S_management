var app = angular.module('UserBackendApp', ['tm.pagination', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.edit', 'angularFileUpload', 'fundoo.services', 'simditor', 'ui.grid.autoFitColumns']);

var uploadImageTemplateUser = '<div> <input type="file" name="files[]" accept="image/gif,image/jpeg,image/jpg,image/png" ng-file-select="grid.appScope.uploadImage($files, \'MODEL_COL_FIELD\', row.entity)"/> <div ng-repeat="imageName in MODEL_COL_FIELD.split(\',\')"> <div ng-show="imageName"> <a class="fancybox" target="_blank" data-fancybox-group="gallery" fancybox ng-href="/showImage/{{imageName}}"><img ng-src="/showimg/thumb/{{imageName}}" style="width:50px;height:50px;float:left"></a><input type="button" ng-click="grid.appScope.deleteImage(row.entity, \'MODEL_COL_FIELD\', imageName)" value="删除" style="float:left" /></div></div></div>';
var checkboxTemplateUser = '<div><input type="checkbox" ng-model="MODEL_COL_FIELD" ng-click="grid.appScope.updateEntity(col, row)" /></div>';
var childButtonTemplateUserCar = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popChildCar(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToChildPageCar(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var childButtonTemplateUserComplain = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popChildComplain(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToChildPageComplain(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var childButtonTemplateUserFeedback = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popChildFeedback(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToChildPageFeedback(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var childButtonTemplateUserPurchase = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popChildPurchase(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToChildPagePurchase(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var childButtonTemplateUserTicket = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popChildTicket(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToChildPageTicket(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var childButtonTemplateUserVisit = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popChildVisit(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToChildPageVisit(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
//var friendButtonTemplateUser = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPage(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var friendButtonTemplateUserPop = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popFriendPop(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPagePop(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
//var friendButtonTemplateUser = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPage(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var friendButtonTemplateUserRed = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popFriendRed(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPageRed(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
//var friendButtonTemplateUser = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPage(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var friendButtonTemplateUserRemind = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popFriendRemind(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPageRemind(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
//var friendButtonTemplateUser = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPage(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var friendButtonTemplateUserSale = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popFriendSale(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPageSale(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
//var friendButtonTemplateUser = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPage(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var friendButtonTemplateUserStaff = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popFriendStaff(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPageStaff(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var readonlyImageTemplateUser = '<div><div ng-repeat="imageName in MODEL_COL_FIELD.split(\',\')"><div ng-show="imageName"><a class="fancybox" target="_blank" data-fancybox-group="gallery" fancybox ng-href="/showImage/{{imageName}}"><img ng-src="/showimg/thumb/{{imageName}}" style="width:50px;height:50px;float:left"></a></div></div></div>';
var readonlyCheckboxTemplateUser = '<div><input type="checkbox" ng-model="MODEL_COL_FIELD" disabled="disabled" /></div>';

app.filter('safehtml', function ($sce) {
    return function (htmlString) {
        return $sce.trustAsHtml(htmlString);
    }
});


app.controller('UserBackendController', ['$scope', '$http', '$upload', 'createDialog', '$log', function ($scope, $http, $upload, createDialogService, $log) {
	$scope.isUser = true;
    
    if(GetQueryString('relate') && GetQueryString('relateValue')) {
        $scope.relate = GetQueryString('relate')
        $scope.relateValue = GetQueryString('relateValue')
    }
    
    var rowLowHeight = 26
    var rowHighHeight = 100 
    
    $scope.objFieldInfo = objFieldInfo
    $scope.objEnumInfo = objEnumInfo   
    
    $scope.status = [{"id": -100, "name": "全部"}]
    dropdownTemplateUserStatus = '<div>' +
        '<select ng-model="MODEL_COL_FIELD" ' +
        'ng-change="grid.appScope.updateEntity(col, row)" style="padding: 2px;">'
    for (var i = 0; i < Object.keys(objEnumInfo.User.status).length; i++) {
        $scope.status.push({"id": i, "name": objEnumInfo.User.status[i]})
        dropdownTemplateUserStatus += '<option ng-selected="MODEL_COL_FIELD==' + i
            + '" value=' + i + '>' + objEnumInfo.User.status[i] + '</option>'
    }
    dropdownTemplateUserStatus += '</select></div>'

    // -100即选择"全部"
    $scope.selectedStatus = -100 
    $scope.$watch('selectedStatus', function (newValue, oldValue, scope) {
        if (newValue != oldValue) {
            if ($scope.list.length > 0) {
                if ($scope.paginationConf.currentPage != 1) {
                    $scope.paginationConf.currentPage = 1
                }
            }
            refreshData(true);
        }
    }, false);
    
    $scope.sexEnum = []
    dropdownTemplateUserSexEnum = '<div>' +
        '<select ng-model="MODEL_COL_FIELD" ' +
        'ng-change="grid.appScope.updateEntity(col, row)" style="padding: 2px;">'
    for (var i = 0; i < Object.keys(objEnumInfo.User.sexEnum).length; i++) {
        $scope.sexEnum.push({"id": i, "name": objEnumInfo.User.sexEnum[i]})
        dropdownTemplateUserSexEnum += '<option ng-selected="MODEL_COL_FIELD==' + i
            + '" value=' + i + '>' + objEnumInfo.User.sexEnum[i] + '</option>'
    }
    dropdownTemplateUserSexEnum += '</select></div>'
    
    $scope.userRoleEnum = []
    dropdownTemplateUserUserRoleEnum = '<div>' +
        '<select ng-model="MODEL_COL_FIELD" ' +
        'ng-change="grid.appScope.updateEntity(col, row)" style="padding: 2px;">'
    for (var i = 0; i < Object.keys(objEnumInfo.User.userRoleEnum).length; i++) {
        $scope.userRoleEnum.push({"id": i, "name": objEnumInfo.User.userRoleEnum[i]})
        dropdownTemplateUserUserRoleEnum += '<option ng-selected="MODEL_COL_FIELD==' + i
            + '" value=' + i + '>' + objEnumInfo.User.userRoleEnum[i] + '</option>'
    }
    dropdownTemplateUserUserRoleEnum += '</select></div>'
    
    $scope.mySelections = [];
    $scope.gridOptions = {
        data: 'list',
        rowHeight: hasImageField ? rowHighHeight : rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                $scope.mySelections = gridApi.selection.getSelectedRows();
            });
        }
    };

    $scope.gridOptions.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', headerTooltip: '点击表头可进行排序', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.User.name, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'thirdId', displayName: objFieldInfo.User.thirdId, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'loginName', displayName: objFieldInfo.User.loginName, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'email', displayName: objFieldInfo.User.email, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'isEmailVerified', displayName: objFieldInfo.User.isEmailVerified, headerTooltip: '点击表头可进行排序, 通过直接勾选操作来更新数据', enableCellEdit: false, cellTemplate: checkboxTemplateUser},
        {field: 'emailKey', displayName: objFieldInfo.User.emailKey, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'emailOverTime', displayName: objFieldInfo.User.emailOverTime, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'password', displayName: objFieldInfo.User.password, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'headImage', displayName: objFieldInfo.User.headImage, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'images', displayName: objFieldInfo.User.images, width: 170, enableCellEdit: false, cellTemplate: uploadImageTemplateUser},
        {field: 'sexEnum', displayName: objFieldInfo.User.sexEnum, width: 120, headerTooltip: '点击表头可进行排序, 通过直接下拉选取操作来更新数据', enableCellEdit: false, cellTemplate: dropdownTemplateUserSexEnum},
        {field: 'phone', displayName: objFieldInfo.User.phone, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'cardNumber', displayName: objFieldInfo.User.cardNumber, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'country', displayName: objFieldInfo.User.country, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'province', displayName: objFieldInfo.User.province, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'city', displayName: objFieldInfo.User.city, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'zone', displayName: objFieldInfo.User.zone, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'address', displayName: objFieldInfo.User.address, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'birth', displayName: objFieldInfo.User.birth, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'lastUpdateTime', displayName: objFieldInfo.User.lastUpdateTime, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.User.createdAt, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'lastLoginIp', displayName: objFieldInfo.User.lastLoginIp, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'lastLoginTime', displayName: objFieldInfo.User.lastLoginTime, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'lastLoginIpArea', displayName: objFieldInfo.User.lastLoginIpArea, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.User.status, width: 120, headerTooltip: '点击表头可进行排序, 通过直接下拉选取操作来更新数据', enableCellEdit: false, cellTemplate: dropdownTemplateUserStatus},
        {field: 'userRoleEnum', displayName: objFieldInfo.User.userRoleEnum, width: 120, headerTooltip: '点击表头可进行排序, 通过直接下拉选取操作来更新数据', enableCellEdit: false, cellTemplate: dropdownTemplateUserUserRoleEnum},
        {field: 'comment', displayName: objFieldInfo.User.comment, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'childCar', displayName: objFieldInfo.User.cars, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: childButtonTemplateUserCar},
        {field: 'childComplain', displayName: objFieldInfo.User.complains, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: childButtonTemplateUserComplain},
        {field: 'childFeedback', displayName: objFieldInfo.User.feedbacks, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: childButtonTemplateUserFeedback},
        {field: 'childPurchase', displayName: objFieldInfo.User.purchases, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: childButtonTemplateUserPurchase},
        {field: 'childTicket', displayName: objFieldInfo.User.tickets, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: childButtonTemplateUserTicket},
        {field: 'childVisit', displayName: objFieldInfo.User.visits, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: childButtonTemplateUserVisit},
        {field: 'friendPop', displayName: objFieldInfo.User.pops, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: friendButtonTemplateUserPop},
        {field: 'friendRed', displayName: objFieldInfo.User.reds, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: friendButtonTemplateUserRed},
        {field: 'friendRemind', displayName: objFieldInfo.User.reminds, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: friendButtonTemplateUserRemind},
        {field: 'friendSale', displayName: objFieldInfo.User.sales, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: friendButtonTemplateUserSale},
        {field: 'friendStaff', displayName: objFieldInfo.User.staffs, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: friendButtonTemplateUserStaff},

    ];
    
    $scope.goToChildPageCar = function(pid) { location = '/admin/car?relate=user.id&relateValue=' + pid }
    $scope.goToChildPageComplain = function(pid) { location = '/admin/complain?relate=user.id&relateValue=' + pid }
    $scope.goToChildPageFeedback = function(pid) { location = '/admin/feedback?relate=user.id&relateValue=' + pid }
    $scope.goToChildPagePurchase = function(pid) { location = '/admin/purchase?relate=user.id&relateValue=' + pid }
    $scope.goToChildPageTicket = function(pid) { location = '/admin/ticket?relate=user.id&relateValue=' + pid }
    $scope.goToChildPageVisit = function(pid) { location = '/admin/visit?relate=user.id&relateValue=' + pid }
    $scope.goToFriendPagePop = function(pid) { location = '/admin/pop?relate=users.id&relateValue=' + pid }
    $scope.goToFriendPageRed = function(pid) { location = '/admin/red?relate=users.id&relateValue=' + pid }
    $scope.goToFriendPageRemind = function(pid) { location = '/admin/remind?relate=users.id&relateValue=' + pid }
    $scope.goToFriendPageSale = function(pid) { location = '/admin/sale?relate=users.id&relateValue=' + pid }
    $scope.goToFriendPageStaff = function(pid) { location = '/admin/staff?relate=users.id&relateValue=' + pid }
    
    $scope.friends4gridPop = []
    $scope.pageInfo4FriendPop = {}
    $scope.searchFieldNamePop = searchFieldNamePop
    $scope.searchFieldNamePopComment = searchFieldNamePopComment
    
    function fillGridWithFriendsPop() {
        url = '/base/Pop/all?page=1' 
                    + '&size=1000000'
                    
        if ($scope.currentObj.queryKeyword4Pop)
            url += '&searchOn=' + $scope.searchFieldNamePop + '&kw=' + $scope.currentObj.queryKeyword4Pop
            
        $http.get(url)
            .success(function (data, status, headers, config) {
            if (data.flag) {
                
                if ($scope.currentObj.id) {
                    var allFriends = data.data;
                    
                    //用于比较, 全取不分页
                    $http.get('/user/' + $scope.currentObj.id + '/pops?page=1&size=1000000')
                    .success(function (data, status, headers, config) {
                        if (data.flag){
                            for (x in allFriends) {
                                allFriends[x].refFriend = false
                                for (y in data.data) {
                                    if (allFriends[x].id === data.data[y].id) {
                                        allFriends[x].refFriend = true
                                        break
                                    }
                                }
                            }
                        }
                        $scope.friends4gridPop = allFriends;
                    })
                }
                else {
                    $scope.friends4gridPop = data.data;
                }
            }
            else {
                $scope.parentPops4grid = [];
                //showAlert('错误: ', data.message, 'danger')
            }
        });
    }
    
    $scope.myFriendSelectionsPop = [];
    $scope.gridFriendsPop = {
        data: 'friends4gridPop',
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                $scope.myFriendSelectionsPop = gridApi.selection.getSelectedRows();
            });
        },
        isRowSelectable: function(row){
            if(row.entity.refFriend == true){
                row.grid.api.selection.selectRow(row.entity);
            }
        },
        columnDefs: [        
            {field: 'id', displayName: 'Id', width: '30', enableCellEdit: false},
            {field: 'name', displayName: '名称', width: '45%', enableCellEdit: true},
            {field: 'createdAt', displayName: '创建时间', width: '45%', enableCellEdit: true},
        ]
    };

    $scope.searchContent4Pop = function(){
        fillGridWithFriendsPop()
    }
    $scope.friends4gridRed = []
    $scope.pageInfo4FriendRed = {}
    $scope.searchFieldNameRed = searchFieldNameRed
    $scope.searchFieldNameRedComment = searchFieldNameRedComment
    
    function fillGridWithFriendsRed() {
        url = '/base/Red/all?page=1' 
                    + '&size=1000000'
                    
        if ($scope.currentObj.queryKeyword4Red)
            url += '&searchOn=' + $scope.searchFieldNameRed + '&kw=' + $scope.currentObj.queryKeyword4Red
            
        $http.get(url)
            .success(function (data, status, headers, config) {
            if (data.flag) {
                
                if ($scope.currentObj.id) {
                    var allFriends = data.data;
                    
                    //用于比较, 全取不分页
                    $http.get('/user/' + $scope.currentObj.id + '/reds?page=1&size=1000000')
                    .success(function (data, status, headers, config) {
                        if (data.flag){
                            for (x in allFriends) {
                                allFriends[x].refFriend = false
                                for (y in data.data) {
                                    if (allFriends[x].id === data.data[y].id) {
                                        allFriends[x].refFriend = true
                                        break
                                    }
                                }
                            }
                        }
                        $scope.friends4gridRed = allFriends;
                    })
                }
                else {
                    $scope.friends4gridRed = data.data;
                }
            }
            else {
                $scope.parentReds4grid = [];
                //showAlert('错误: ', data.message, 'danger')
            }
        });
    }
    
    $scope.myFriendSelectionsRed = [];
    $scope.gridFriendsRed = {
        data: 'friends4gridRed',
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                $scope.myFriendSelectionsRed = gridApi.selection.getSelectedRows();
            });
        },
        isRowSelectable: function(row){
            if(row.entity.refFriend == true){
                row.grid.api.selection.selectRow(row.entity);
            }
        },
        columnDefs: [        
            {field: 'id', displayName: 'Id', width: '30', enableCellEdit: false},
            {field: 'name', displayName: '名称', width: '45%', enableCellEdit: true},
            {field: 'createdAt', displayName: '创建时间', width: '45%', enableCellEdit: true},
        ]
    };

    $scope.searchContent4Red = function(){
        fillGridWithFriendsRed()
    }
    $scope.friends4gridRemind = []
    $scope.pageInfo4FriendRemind = {}
    $scope.searchFieldNameRemind = searchFieldNameRemind
    $scope.searchFieldNameRemindComment = searchFieldNameRemindComment
    
    function fillGridWithFriendsRemind() {
        url = '/base/Remind/all?page=1' 
                    + '&size=1000000'
                    
        if ($scope.currentObj.queryKeyword4Remind)
            url += '&searchOn=' + $scope.searchFieldNameRemind + '&kw=' + $scope.currentObj.queryKeyword4Remind
            
        $http.get(url)
            .success(function (data, status, headers, config) {
            if (data.flag) {
                
                if ($scope.currentObj.id) {
                    var allFriends = data.data;
                    
                    //用于比较, 全取不分页
                    $http.get('/user/' + $scope.currentObj.id + '/reminds?page=1&size=1000000')
                    .success(function (data, status, headers, config) {
                        if (data.flag){
                            for (x in allFriends) {
                                allFriends[x].refFriend = false
                                for (y in data.data) {
                                    if (allFriends[x].id === data.data[y].id) {
                                        allFriends[x].refFriend = true
                                        break
                                    }
                                }
                            }
                        }
                        $scope.friends4gridRemind = allFriends;
                    })
                }
                else {
                    $scope.friends4gridRemind = data.data;
                }
            }
            else {
                $scope.parentReminds4grid = [];
                //showAlert('错误: ', data.message, 'danger')
            }
        });
    }
    
    $scope.myFriendSelectionsRemind = [];
    $scope.gridFriendsRemind = {
        data: 'friends4gridRemind',
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                $scope.myFriendSelectionsRemind = gridApi.selection.getSelectedRows();
            });
        },
        isRowSelectable: function(row){
            if(row.entity.refFriend == true){
                row.grid.api.selection.selectRow(row.entity);
            }
        },
        columnDefs: [        
            {field: 'id', displayName: 'Id', width: '30', enableCellEdit: false},
            {field: 'name', displayName: '名称', width: '45%', enableCellEdit: true},
            {field: 'createdAt', displayName: '创建时间', width: '45%', enableCellEdit: true},
        ]
    };

    $scope.searchContent4Remind = function(){
        fillGridWithFriendsRemind()
    }
    $scope.friends4gridSale = []
    $scope.pageInfo4FriendSale = {}
    $scope.searchFieldNameSale = searchFieldNameSale
    $scope.searchFieldNameSaleComment = searchFieldNameSaleComment
    
    function fillGridWithFriendsSale() {
        url = '/base/Sale/all?page=1' 
                    + '&size=1000000'
                    
        if ($scope.currentObj.queryKeyword4Sale)
            url += '&searchOn=' + $scope.searchFieldNameSale + '&kw=' + $scope.currentObj.queryKeyword4Sale
            
        $http.get(url)
            .success(function (data, status, headers, config) {
            if (data.flag) {
                
                if ($scope.currentObj.id) {
                    var allFriends = data.data;
                    
                    //用于比较, 全取不分页
                    $http.get('/user/' + $scope.currentObj.id + '/sales?page=1&size=1000000')
                    .success(function (data, status, headers, config) {
                        if (data.flag){
                            for (x in allFriends) {
                                allFriends[x].refFriend = false
                                for (y in data.data) {
                                    if (allFriends[x].id === data.data[y].id) {
                                        allFriends[x].refFriend = true
                                        break
                                    }
                                }
                            }
                        }
                        $scope.friends4gridSale = allFriends;
                    })
                }
                else {
                    $scope.friends4gridSale = data.data;
                }
            }
            else {
                $scope.parentSales4grid = [];
                //showAlert('错误: ', data.message, 'danger')
            }
        });
    }
    
    $scope.myFriendSelectionsSale = [];
    $scope.gridFriendsSale = {
        data: 'friends4gridSale',
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                $scope.myFriendSelectionsSale = gridApi.selection.getSelectedRows();
            });
        },
        isRowSelectable: function(row){
            if(row.entity.refFriend == true){
                row.grid.api.selection.selectRow(row.entity);
            }
        },
        columnDefs: [        
            {field: 'id', displayName: 'Id', width: '30', enableCellEdit: false},
            {field: 'name', displayName: '名称', width: '45%', enableCellEdit: true},
            {field: 'createdAt', displayName: '创建时间', width: '45%', enableCellEdit: true},
        ]
    };

    $scope.searchContent4Sale = function(){
        fillGridWithFriendsSale()
    }
    $scope.friends4gridStaff = []
    $scope.pageInfo4FriendStaff = {}
    $scope.searchFieldNameStaff = searchFieldNameStaff
    $scope.searchFieldNameStaffComment = searchFieldNameStaffComment
    
    function fillGridWithFriendsStaff() {
        url = '/base/Staff/all?page=1' 
                    + '&size=1000000'
                    
        if ($scope.currentObj.queryKeyword4Staff)
            url += '&searchOn=' + $scope.searchFieldNameStaff + '&kw=' + $scope.currentObj.queryKeyword4Staff
            
        $http.get(url)
            .success(function (data, status, headers, config) {
            if (data.flag) {
                
                if ($scope.currentObj.id) {
                    var allFriends = data.data;
                    
                    //用于比较, 全取不分页
                    $http.get('/user/' + $scope.currentObj.id + '/staffs?page=1&size=1000000')
                    .success(function (data, status, headers, config) {
                        if (data.flag){
                            for (x in allFriends) {
                                allFriends[x].refFriend = false
                                for (y in data.data) {
                                    if (allFriends[x].id === data.data[y].id) {
                                        allFriends[x].refFriend = true
                                        break
                                    }
                                }
                            }
                        }
                        $scope.friends4gridStaff = allFriends;
                    })
                }
                else {
                    $scope.friends4gridStaff = data.data;
                }
            }
            else {
                $scope.parentStaffs4grid = [];
                //showAlert('错误: ', data.message, 'danger')
            }
        });
    }
    
    $scope.myFriendSelectionsStaff = [];
    $scope.gridFriendsStaff = {
        data: 'friends4gridStaff',
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                $scope.myFriendSelectionsStaff = gridApi.selection.getSelectedRows();
            });
        },
        isRowSelectable: function(row){
            if(row.entity.refFriend == true){
                row.grid.api.selection.selectRow(row.entity);
            }
        },
        columnDefs: [        
            {field: 'id', displayName: 'Id', width: '30', enableCellEdit: false},
            {field: 'name', displayName: '名称', width: '45%', enableCellEdit: true},
            {field: 'createdAt', displayName: '创建时间', width: '45%', enableCellEdit: true},
        ]
    };

    $scope.searchContent4Staff = function(){
        fillGridWithFriendsStaff()
    }
    
    $scope.currentObj = {}
    $scope.list = []
    $scope.pageInfo = {}
    $scope.queryKeyword = ''
    $scope.startTime = ''
    $scope.endTime = ''
    
    $scope.$watch('paginationConf.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            refreshData(false);
        }
    }, false);

    $scope.$watch('paginationConf.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            refreshData(false);
        }
    }, false);

    $scope.paginationConf = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 10,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage'
    };
    
    if (!GetQueryString('relate')) {
        refreshData(false);
    } 
    else {
        refreshData(true);
    }
    
    function getQueryUrl() {
        var url = 'startTime=' + $scope.startTime + '&endTime=' + $scope.endTime
                    + '&status=' + $scope.selectedStatus
                    
        
        if ($scope.relate) {
            url += '&fieldOn=' + $scope.relate + '&fieldValue=' + $scope.relateValue
        }
        
        if ($scope.queryKeyword)
            url += '&searchOn=' + searchFieldName + '&kw=' + $scope.queryKeyword
            
        return url
    }

    function refreshData(showMsg){
        var url = '/base/User/all?page=' 
                    + $scope.paginationConf.currentPage 
                    + '&size=' + $scope.paginationConf.itemsPerPage
                    + "&" + getQueryUrl();

        $http.get(url).success(function (data, status, headers, config) {
            if (data.flag) {
                $scope.list = data.data;
                $scope.pageInfo = data.page;
                $scope.paginationConf.totalItems = data.page.total;
            }
            else {
                if (showMsg) {
                    $scope.list = [];
                    showAlert('错误: ', data.message, 'danger')
                }
            }
        });
    }
    
	$scope.uploadImage = function($files, imageField, parentObj, needUpdateObj) {// imageField example: imagesList
        var needUpdateObj = (arguments[3] === undefined) ? true : arguments[3]
        imageField = imageField.replace('row.entity.', '')
        for (var i = 0; i < $files.length; i++) {
            var file = $files[i];

            $log.log('start upload image file on id: ' + parentObj.id + ', file: ' + file
                + ', property: ' + imageField)

            $scope.upload = $upload.upload({
                    url : '/upload/image',
                    file : file
                })
                .progress(
                    function(evt) {
                        $log.log('upload image percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                    })
                .success(function(data, status, headers, config) {
                    $log.log(data);
                    if (data.flag) {
                        if (imageField.indexOf("mages") != -1) {
                            if(parentObj[imageField])
                                parentObj[imageField] += ',' + data.data;
                            else
                                parentObj[imageField] = data.data;
                            
                            if (needUpdateObj == true) {
                                $scope.currentObj = parentObj;
                                $scope.saveContent()
                            }
                        } else {
                            showAlert('错误: ', '字段不存在: ' + imageField, 'danger')
                        }
                    } else {
                        showAlert('错误: ', data.message, 'danger')
                    }
                });
            // .error(...)
            // .then(success, error, progress);
        }
    };
    
    // 删除图片
	$scope.deleteImage = function(obj, property, imageName) {
        $scope.currentObj = obj;
        property = property.replace('row.entity.', '')
        var imgList = obj[property].split(',')
        var index = imgList.indexOf(imageName)
        imgList.splice(index, 1)//在数组中删掉这个图片文件名
        obj[property] = imgList.join(",")//数组转为字符串, 以逗号分隔
        $log.log('更新后的images字符串: ' + obj[property])
        
        $scope.saveContent();
	};

    // 当前行更新字段 (only for checkbox & dropdownlist)
    $scope.updateEntity = function(column, row) {
        $scope.currentObj = row.entity;
        $scope.saveContent();
    };

    // 新建或更新对象
    $scope.saveContent = function() {
        var content = $scope.currentObj;
        if ($scope.myFriendSelectionsPop.length > 0) content.pops = $scope.myFriendSelectionsPop
        if ($scope.myFriendSelectionsRed.length > 0) content.reds = $scope.myFriendSelectionsRed
        if ($scope.myFriendSelectionsRemind.length > 0) content.reminds = $scope.myFriendSelectionsRemind
        if ($scope.myFriendSelectionsSale.length > 0) content.sales = $scope.myFriendSelectionsSale
        if ($scope.myFriendSelectionsStaff.length > 0) content.staffs = $scope.myFriendSelectionsStaff
        
        var isNew = !content.id
        var url = '/user'
        if(isNew){
        	var http_method = "POST";
        }else{
        	var http_method = "PUT";
        	url += '/' + content.id
        }
        
        $http({method: http_method, url: url, data:content}).success(function(data, status, headers, config) {
            if(data.flag){
                if(isNew){
                    $scope.list.unshift(data.data);
                    showAlert('操作成功: ', '', 'success')
                }else{
                    showAlert('操作成功', '', 'success')
                    gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL)
                }
            }else{
                if (data.message)
                    showAlert('错误: ', data.message, 'danger')
                else {
                    if(data.indexOf('<html') > 0){
                        showAlert('错误: ', '您没有修改权限, 请以超级管理员登录系统.', 'danger');
                        refreshData(false)
                        return
                    }
                }
            }
        });
    };

    $scope.deleteContent = function(){
        var items = $scope.mySelections;
        if(items.length == 0){
            showAlert('错误: ', '请至少选择一个对象', 'warning');
        }else{
            var content = items[0];
            if(content.id){
                bootbox.confirm("您确定要删除这个对象吗?", function(result) {
                    if(result) {
                        var deleteUrl = '/user/' + content.id
                        $http.delete(deleteUrl).success(function(data, status, headers, config) {
                            if (data.flag) {
                            	var index = $scope.list.indexOf(content);
                                $scope.list.splice(index, 1);
                                $scope.mySelections = [];
                                showAlert('操作成功', '', 'success');
                            }
                            else {
                                if (data.message)
                                    showAlert('错误: ', data.message, 'danger')
                                else {
                                    if(data.indexOf('<html') > 0){
                                        showAlert('错误: ', '您没有修改权限, 请以超级管理员登录系统.', 'danger');
                                        refreshData(false)
                                        return
                                    }
                                }
                            }
                        });
                    }
                });
            }
        }
    };

    $scope.formSave = function(formOk){
    	if(!formOk){
            showAlert('错误: ', '输入项验证有误, 请重试', 'warning');
            return
    	}
        $scope.saveContent();
        $scope.$modalClose();
    };

    $scope.dialogClose = function(){
        $scope.$modalClose();
        refreshData(false)
    };
    
    $scope.addContent = function(){
        $http.get('/new/user')
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.currentObj = data.data;
                    
                    fillGridWithFriendsPop();
                    fillGridWithFriendsRed();
                    fillGridWithFriendsRemind();
                    fillGridWithFriendsSale();
                    fillGridWithFriendsStaff();
                    
                    createDialogService("/assets/html/edit_templates/user.html",{
                        id: 'editor',
                        title: '新增',
                        scope: $scope,
                        footerTemplate: '<div></div>'
                    });
                }
            });
    };

    $scope.updateContent = function(){
        var items = $scope.mySelections;
        if(items.length == 0){
            showAlert('错误: ', '请至少选择一个对象', 'warning');
        }else{
            var content = items[0];
            if(content.id) {
                $scope.currentObj = items[0];
            }
        
            fillGridWithFriendsPop();
            fillGridWithFriendsRed();
            fillGridWithFriendsRemind();
            fillGridWithFriendsSale();
            fillGridWithFriendsStaff();

            createDialogService("/assets/html/edit_templates/user.html",{
                id: 'editor',
                title: '编辑',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        }
    };
    
    $scope.searchContent = function(){
        if($scope.paginationConf.currentPage != 1){
            $scope.paginationConf.currentPage = 1
        }
        else{
            refreshData(true)
        }
    }
    
    $scope.report = function () {
        var notifyMsg = "将导出所有的数据, 确定吗?"
        if($scope.startTime && $scope.endTime) {
            notifyMsg = "将导出从 " + $scope.startTime + " 至 " + $scope.endTime + "之间的数据, 确定吗? (通过调整时间范围可以导出不同时间阶段的数据)"
        }
        bootbox.confirm(notifyMsg, function(result) {
            if(result) {
                location.href = '/report/user?' + getQueryUrl()
            }
        });
    }
    
    $scope.refresh = function(){
        refreshData(true)
    }
    
    $.fn.datetimepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今天",
        suffix: [],
        meridiem: ["上午", "下午"]
    };

    $('#startTime').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        minView: 'month',
        todayBtn: true,
        todayHighlight: true,
        autoclose: true
    });

    $('#endTime').datetimepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        minView: 'month',
        todayBtn: true,
        todayHighlight: true,
        autoclose: true
    });

    ////////// child Car popup show //////////
    
    $scope.gridChildCar = {
        data: 'childCar4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridChildCar.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.Car.name, enableCellEdit: true},
        {field: 'classify', displayName: objFieldInfo.Car.classify, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Car.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Car.status[MODEL_COL_FIELD]"></span>'},
        {field: 'isVip', displayName: objFieldInfo.Car.isVip, width: 120, enableCellEdit: false, cellTemplate: readonlyCheckboxTemplateUser},
        {field: 'leaveRecordEnum', displayName: objFieldInfo.Car.leaveRecordEnum, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Car.leaveRecordEnum[MODEL_COL_FIELD]"></span>'},
        {field: 'leaveReason', displayName: objFieldInfo.Car.leaveReason, enableCellEdit: true},
        {field: 'images', displayName: objFieldInfo.Car.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateUser},
        {field: 'smallImages', displayName: objFieldInfo.Car.smallImages, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateUser},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Car.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Car.createdAt, enableCellEdit: true},
        {field: 'description1', displayName: objFieldInfo.Car.description1, enableCellEdit: true},
        {field: 'description2', displayName: objFieldInfo.Car.description2, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Car.comment, enableCellEdit: true},
        {field: 'refUserId', displayName: objFieldInfo.Car.refUserId, enableCellEdit: true},
    ];

    $scope.popChildCar = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithChildCar()

            createDialogService("/assets/html/child_pop_templates/user_2_car.html", {
                id: 'child_car',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4childCar = {}

    $scope.$watch('paginationConf4ChildCar.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildCar();
        }
    }, false);

    $scope.$watch('paginationConf4ChildCar.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildCar();
        }
    }, false);

    $scope.paginationConf4ChildCar = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4childCar'
    };

    function fillGridWithChildCar() {
        $scope.childCar4grid = []
        $http.get('/base/Car/all?page='
        + $scope.paginationConf4ChildCar.currentPage
        + '&size=' + $scope.paginationConf4ChildCar.itemsPerPage
        + '&fieldOn=user.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.childCar4grid = data.data;
                    $scope.pageInfo4childCar = data.page;
                    $scope.paginationConf4ChildCar.totalItems = data.page.total;
                }
            });
    }
    ////////// child Complain popup show //////////
    
    $scope.gridChildComplain = {
        data: 'childComplain4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridChildComplain.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.Complain.name, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Complain.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Complain.status[MODEL_COL_FIELD]"></span>'},
        {field: 'description', displayName: objFieldInfo.Complain.description, enableCellEdit: true},
        {field: 'refUserId', displayName: objFieldInfo.Complain.refUserId, enableCellEdit: true},
        {field: 'images', displayName: objFieldInfo.Complain.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateUser},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Complain.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Complain.createdAt, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Complain.comment, enableCellEdit: true},
    ];

    $scope.popChildComplain = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithChildComplain()

            createDialogService("/assets/html/child_pop_templates/user_2_complain.html", {
                id: 'child_complain',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4childComplain = {}

    $scope.$watch('paginationConf4ChildComplain.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildComplain();
        }
    }, false);

    $scope.$watch('paginationConf4ChildComplain.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildComplain();
        }
    }, false);

    $scope.paginationConf4ChildComplain = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4childComplain'
    };

    function fillGridWithChildComplain() {
        $scope.childComplain4grid = []
        $http.get('/base/Complain/all?page='
        + $scope.paginationConf4ChildComplain.currentPage
        + '&size=' + $scope.paginationConf4ChildComplain.itemsPerPage
        + '&fieldOn=user.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.childComplain4grid = data.data;
                    $scope.pageInfo4childComplain = data.page;
                    $scope.paginationConf4ChildComplain.totalItems = data.page.total;
                }
            });
    }
    ////////// child Feedback popup show //////////
    
    $scope.gridChildFeedback = {
        data: 'childFeedback4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridChildFeedback.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.Feedback.name, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Feedback.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Feedback.status[MODEL_COL_FIELD]"></span>'},
        {field: 'description', displayName: objFieldInfo.Feedback.description, enableCellEdit: true},
        {field: 'refUserId', displayName: objFieldInfo.Feedback.refUserId, enableCellEdit: true},
        {field: 'images', displayName: objFieldInfo.Feedback.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateUser},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Feedback.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Feedback.createdAt, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Feedback.comment, enableCellEdit: true},
    ];

    $scope.popChildFeedback = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithChildFeedback()

            createDialogService("/assets/html/child_pop_templates/user_2_feedback.html", {
                id: 'child_feedback',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4childFeedback = {}

    $scope.$watch('paginationConf4ChildFeedback.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildFeedback();
        }
    }, false);

    $scope.$watch('paginationConf4ChildFeedback.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildFeedback();
        }
    }, false);

    $scope.paginationConf4ChildFeedback = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4childFeedback'
    };

    function fillGridWithChildFeedback() {
        $scope.childFeedback4grid = []
        $http.get('/base/Feedback/all?page='
        + $scope.paginationConf4ChildFeedback.currentPage
        + '&size=' + $scope.paginationConf4ChildFeedback.itemsPerPage
        + '&fieldOn=user.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.childFeedback4grid = data.data;
                    $scope.pageInfo4childFeedback = data.page;
                    $scope.paginationConf4ChildFeedback.totalItems = data.page.total;
                }
            });
    }
    ////////// child Purchase popup show //////////
    
    $scope.gridChildPurchase = {
        data: 'childPurchase4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridChildPurchase.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.Purchase.name, enableCellEdit: true},
        {field: 'refUserId', displayName: objFieldInfo.Purchase.refUserId, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Purchase.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Purchase.status[MODEL_COL_FIELD]"></span>'},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Purchase.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Purchase.createdAt, enableCellEdit: true},
        {field: 'quantity', displayName: objFieldInfo.Purchase.quantity, enableCellEdit: true},
        {field: 'pids', displayName: objFieldInfo.Purchase.pids, enableCellEdit: true},
        {field: 'amount', displayName: objFieldInfo.Purchase.amount, enableCellEdit: true},
        {field: 'useVipPoint', displayName: objFieldInfo.Purchase.useVipPoint, enableCellEdit: true},
        {field: 'vipPointDiscount', displayName: objFieldInfo.Purchase.vipPointDiscount, enableCellEdit: true},
        {field: 'useBalance', displayName: objFieldInfo.Purchase.useBalance, enableCellEdit: true},
        {field: 'balanceDiscount', displayName: objFieldInfo.Purchase.balanceDiscount, enableCellEdit: true},
        {field: 'shipName', displayName: objFieldInfo.Purchase.shipName, enableCellEdit: true},
        {field: 'shipPhone', displayName: objFieldInfo.Purchase.shipPhone, enableCellEdit: true},
        {field: 'shipProvince', displayName: objFieldInfo.Purchase.shipProvince, enableCellEdit: true},
        {field: 'shipCity', displayName: objFieldInfo.Purchase.shipCity, enableCellEdit: true},
        {field: 'shipZone', displayName: objFieldInfo.Purchase.shipZone, enableCellEdit: true},
        {field: 'shipLocation', displayName: objFieldInfo.Purchase.shipLocation, enableCellEdit: true},
        {field: 'buyerMessage', displayName: objFieldInfo.Purchase.buyerMessage, enableCellEdit: true},
        {field: 'payReturnCode', displayName: objFieldInfo.Purchase.payReturnCode, enableCellEdit: true},
        {field: 'payReturnMsg', displayName: objFieldInfo.Purchase.payReturnMsg, enableCellEdit: true},
        {field: 'payResultCode', displayName: objFieldInfo.Purchase.payResultCode, enableCellEdit: true},
        {field: 'payTransitionId', displayName: objFieldInfo.Purchase.payTransitionId, enableCellEdit: true},
        {field: 'payAmount', displayName: objFieldInfo.Purchase.payAmount, enableCellEdit: true},
        {field: 'payTime', displayName: objFieldInfo.Purchase.payTime, enableCellEdit: true},
        {field: 'payBank', displayName: objFieldInfo.Purchase.payBank, enableCellEdit: true},
        {field: 'payRefOrderNo', displayName: objFieldInfo.Purchase.payRefOrderNo, enableCellEdit: true},
        {field: 'paySign', displayName: objFieldInfo.Purchase.paySign, enableCellEdit: true},
        {field: 'description1', displayName: objFieldInfo.Purchase.description1, enableCellEdit: true},
        {field: 'description2', displayName: objFieldInfo.Purchase.description2, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Purchase.comment, enableCellEdit: true},
    ];

    $scope.popChildPurchase = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithChildPurchase()

            createDialogService("/assets/html/child_pop_templates/user_2_purchase.html", {
                id: 'child_purchase',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4childPurchase = {}

    $scope.$watch('paginationConf4ChildPurchase.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildPurchase();
        }
    }, false);

    $scope.$watch('paginationConf4ChildPurchase.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildPurchase();
        }
    }, false);

    $scope.paginationConf4ChildPurchase = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4childPurchase'
    };

    function fillGridWithChildPurchase() {
        $scope.childPurchase4grid = []
        $http.get('/base/Purchase/all?page='
        + $scope.paginationConf4ChildPurchase.currentPage
        + '&size=' + $scope.paginationConf4ChildPurchase.itemsPerPage
        + '&fieldOn=user.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.childPurchase4grid = data.data;
                    $scope.pageInfo4childPurchase = data.page;
                    $scope.paginationConf4ChildPurchase.totalItems = data.page.total;
                }
            });
    }
    ////////// child Ticket popup show //////////
    
    $scope.gridChildTicket = {
        data: 'childTicket4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridChildTicket.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.Ticket.name, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Ticket.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Ticket.status[MODEL_COL_FIELD]"></span>'},
        {field: 'description', displayName: objFieldInfo.Ticket.description, enableCellEdit: true},
        {field: 'images', displayName: objFieldInfo.Ticket.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateUser},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Ticket.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Ticket.createdAt, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Ticket.comment, enableCellEdit: true},
        {field: 'refUserId', displayName: objFieldInfo.Ticket.refUserId, enableCellEdit: true},
        {field: 'refStaffId', displayName: objFieldInfo.Ticket.refStaffId, enableCellEdit: true},
    ];

    $scope.popChildTicket = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithChildTicket()

            createDialogService("/assets/html/child_pop_templates/user_2_ticket.html", {
                id: 'child_ticket',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4childTicket = {}

    $scope.$watch('paginationConf4ChildTicket.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildTicket();
        }
    }, false);

    $scope.$watch('paginationConf4ChildTicket.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildTicket();
        }
    }, false);

    $scope.paginationConf4ChildTicket = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4childTicket'
    };

    function fillGridWithChildTicket() {
        $scope.childTicket4grid = []
        $http.get('/base/Ticket/all?page='
        + $scope.paginationConf4ChildTicket.currentPage
        + '&size=' + $scope.paginationConf4ChildTicket.itemsPerPage
        + '&fieldOn=user.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.childTicket4grid = data.data;
                    $scope.pageInfo4childTicket = data.page;
                    $scope.paginationConf4ChildTicket.totalItems = data.page.total;
                }
            });
    }
    ////////// child Visit popup show //////////
    
    $scope.gridChildVisit = {
        data: 'childVisit4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridChildVisit.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.Visit.name, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Visit.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Visit.status[MODEL_COL_FIELD]"></span>'},
        {field: 'typeEnum', displayName: objFieldInfo.Visit.typeEnum, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Visit.typeEnum[MODEL_COL_FIELD]"></span>'},
        {field: 'images', displayName: objFieldInfo.Visit.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateUser},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Visit.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Visit.createdAt, enableCellEdit: true},
        {field: 'description1', displayName: objFieldInfo.Visit.description1, enableCellEdit: true},
        {field: 'description2', displayName: objFieldInfo.Visit.description2, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Visit.comment, enableCellEdit: true},
        {field: 'refUserId', displayName: objFieldInfo.Visit.refUserId, enableCellEdit: true},
    ];

    $scope.popChildVisit = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithChildVisit()

            createDialogService("/assets/html/child_pop_templates/user_2_visit.html", {
                id: 'child_visit',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4childVisit = {}

    $scope.$watch('paginationConf4ChildVisit.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildVisit();
        }
    }, false);

    $scope.$watch('paginationConf4ChildVisit.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildVisit();
        }
    }, false);

    $scope.paginationConf4ChildVisit = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4childVisit'
    };

    function fillGridWithChildVisit() {
        $scope.childVisit4grid = []
        $http.get('/base/Visit/all?page='
        + $scope.paginationConf4ChildVisit.currentPage
        + '&size=' + $scope.paginationConf4ChildVisit.itemsPerPage
        + '&fieldOn=user.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.childVisit4grid = data.data;
                    $scope.pageInfo4childVisit = data.page;
                    $scope.paginationConf4ChildVisit.totalItems = data.page.total;
                }
            });
    }
    
    ////////// friend Pop popup show //////////
    
    $scope.gridFriendPop = {
        data: 'friendPop4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridFriendPop.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.Pop.name, enableCellEdit: true},
        {field: 'classify', displayName: objFieldInfo.Pop.classify, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Pop.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Pop.status[MODEL_COL_FIELD]"></span>'},
        {field: 'images', displayName: objFieldInfo.Pop.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateUser},
        {field: 'smallImages', displayName: objFieldInfo.Pop.smallImages, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateUser},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Pop.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Pop.createdAt, enableCellEdit: true},
        {field: 'description1', displayName: objFieldInfo.Pop.description1, enableCellEdit: true},
        {field: 'description2', displayName: objFieldInfo.Pop.description2, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Pop.comment, enableCellEdit: true},
    ];

    $scope.popFriendPop = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithFriendPop()

            createDialogService("/assets/html/child_pop_templates/user_2_pop.html", {
                id: 'friend_pop',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4friendPopPop = {}

    $scope.$watch('paginationConf4FriendPopPop.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendPop();
        }
    }, false);

    $scope.$watch('paginationConf4FriendPopPop.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendPop();
        }
    }, false);

    $scope.paginationConf4FriendPopPop = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4friendPopPop'
    };

    function fillGridWithFriendPop() {
        $scope.friendPop4grid = []
        $http.get('/base/Pop/all?page='
        + $scope.paginationConf4FriendPopPop.currentPage
        + '&size=' + $scope.paginationConf4FriendPopPop.itemsPerPage
        + '&fieldOn=users.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.friendPop4grid = data.data;
                    $scope.pageInfo4friendPopPop = data.page;
                    $scope.paginationConf4FriendPopPop.totalItems = data.page.total;
                }
            });
    }
    ////////// friend Red popup show //////////
    
    $scope.gridFriendRed = {
        data: 'friendRed4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridFriendRed.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.Red.name, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Red.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Red.status[MODEL_COL_FIELD]"></span>'},
        {field: 'images', displayName: objFieldInfo.Red.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateUser},
        {field: 'money', displayName: objFieldInfo.Red.money, enableCellEdit: true},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Red.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Red.createdAt, enableCellEdit: true},
        {field: 'description1', displayName: objFieldInfo.Red.description1, enableCellEdit: true},
        {field: 'description2', displayName: objFieldInfo.Red.description2, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Red.comment, enableCellEdit: true},
    ];

    $scope.popFriendRed = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithFriendRed()

            createDialogService("/assets/html/child_pop_templates/user_2_red.html", {
                id: 'friend_red',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4friendPopRed = {}

    $scope.$watch('paginationConf4FriendPopRed.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendRed();
        }
    }, false);

    $scope.$watch('paginationConf4FriendPopRed.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendRed();
        }
    }, false);

    $scope.paginationConf4FriendPopRed = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4friendPopRed'
    };

    function fillGridWithFriendRed() {
        $scope.friendRed4grid = []
        $http.get('/base/Red/all?page='
        + $scope.paginationConf4FriendPopRed.currentPage
        + '&size=' + $scope.paginationConf4FriendPopRed.itemsPerPage
        + '&fieldOn=users.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.friendRed4grid = data.data;
                    $scope.pageInfo4friendPopRed = data.page;
                    $scope.paginationConf4FriendPopRed.totalItems = data.page.total;
                }
            });
    }
    ////////// friend Remind popup show //////////
    
    $scope.gridFriendRemind = {
        data: 'friendRemind4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridFriendRemind.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.Remind.name, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Remind.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Remind.status[MODEL_COL_FIELD]"></span>'},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Remind.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Remind.createdAt, enableCellEdit: true},
        {field: 'description', displayName: objFieldInfo.Remind.description, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Remind.comment, enableCellEdit: true},
    ];

    $scope.popFriendRemind = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithFriendRemind()

            createDialogService("/assets/html/child_pop_templates/user_2_remind.html", {
                id: 'friend_remind',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4friendPopRemind = {}

    $scope.$watch('paginationConf4FriendPopRemind.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendRemind();
        }
    }, false);

    $scope.$watch('paginationConf4FriendPopRemind.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendRemind();
        }
    }, false);

    $scope.paginationConf4FriendPopRemind = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4friendPopRemind'
    };

    function fillGridWithFriendRemind() {
        $scope.friendRemind4grid = []
        $http.get('/base/Remind/all?page='
        + $scope.paginationConf4FriendPopRemind.currentPage
        + '&size=' + $scope.paginationConf4FriendPopRemind.itemsPerPage
        + '&fieldOn=users.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.friendRemind4grid = data.data;
                    $scope.pageInfo4friendPopRemind = data.page;
                    $scope.paginationConf4FriendPopRemind.totalItems = data.page.total;
                }
            });
    }
    ////////// friend Sale popup show //////////
    
    $scope.gridFriendSale = {
        data: 'friendSale4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridFriendSale.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'showNo', displayName: objFieldInfo.Sale.showNo, enableCellEdit: true},
        {field: 'name', displayName: objFieldInfo.Sale.name, enableCellEdit: true},
        {field: 'soldNumber', displayName: objFieldInfo.Sale.soldNumber, enableCellEdit: true},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Sale.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Sale.createdAt, enableCellEdit: true},
        {field: 'endTime', displayName: objFieldInfo.Sale.endTime, enableCellEdit: true},
        {field: 'images', displayName: objFieldInfo.Sale.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateUser},
        {field: 'description', displayName: objFieldInfo.Sale.description, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Sale.comment, enableCellEdit: true},
        {field: 'price', displayName: objFieldInfo.Sale.price, enableCellEdit: true},
        {field: 'originalPrice', displayName: objFieldInfo.Sale.originalPrice, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Sale.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Sale.status[MODEL_COL_FIELD]"></span>'},
    ];

    $scope.popFriendSale = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithFriendSale()

            createDialogService("/assets/html/child_pop_templates/user_2_sale.html", {
                id: 'friend_sale',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4friendPopSale = {}

    $scope.$watch('paginationConf4FriendPopSale.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendSale();
        }
    }, false);

    $scope.$watch('paginationConf4FriendPopSale.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendSale();
        }
    }, false);

    $scope.paginationConf4FriendPopSale = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4friendPopSale'
    };

    function fillGridWithFriendSale() {
        $scope.friendSale4grid = []
        $http.get('/base/Sale/all?page='
        + $scope.paginationConf4FriendPopSale.currentPage
        + '&size=' + $scope.paginationConf4FriendPopSale.itemsPerPage
        + '&fieldOn=users.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.friendSale4grid = data.data;
                    $scope.pageInfo4friendPopSale = data.page;
                    $scope.paginationConf4FriendPopSale.totalItems = data.page.total;
                }
            });
    }
    ////////// friend Staff popup show //////////
    
    $scope.gridFriendStaff = {
        data: 'friendStaff4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridFriendStaff.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.Staff.name, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Staff.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Staff.status[MODEL_COL_FIELD]"></span>'},
        {field: 'images', displayName: objFieldInfo.Staff.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateUser},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Staff.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Staff.createdAt, enableCellEdit: true},
        {field: 'description1', displayName: objFieldInfo.Staff.description1, enableCellEdit: true},
        {field: 'description2', displayName: objFieldInfo.Staff.description2, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Staff.comment, enableCellEdit: true},
    ];

    $scope.popFriendStaff = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithFriendStaff()

            createDialogService("/assets/html/child_pop_templates/user_2_staff.html", {
                id: 'friend_staff',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4friendPopStaff = {}

    $scope.$watch('paginationConf4FriendPopStaff.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendStaff();
        }
    }, false);

    $scope.$watch('paginationConf4FriendPopStaff.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendStaff();
        }
    }, false);

    $scope.paginationConf4FriendPopStaff = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4friendPopStaff'
    };

    function fillGridWithFriendStaff() {
        $scope.friendStaff4grid = []
        $http.get('/base/Staff/all?page='
        + $scope.paginationConf4FriendPopStaff.currentPage
        + '&size=' + $scope.paginationConf4FriendPopStaff.itemsPerPage
        + '&fieldOn=users.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.friendStaff4grid = data.data;
                    $scope.pageInfo4friendPopStaff = data.page;
                    $scope.paginationConf4FriendPopStaff.totalItems = data.page.total;
                }
            });
    }
    
    ////////// web socket msg //////////
    var wsUri = ''
    var channelId = 'user_backend_' + getNowFormatDate()
    $scope.websocketInit = function (isOn, host) {
        if (isOn) {
            wsUri = "ws://" + host + "/chat/connect";
            window.addEventListener("load", init, false);
        }
    }

    window.onbeforeunload = function () {
        websocket.send("close," + channelId)
    }

    function init() {
        websocket = new WebSocket(wsUri);
        websocket.onopen = function (evt) {
            onOpen(evt)
        };
        websocket.onclose = function (evt) {
            onClose(evt)
        };
        websocket.onmessage = function (evt) {
            onMessage(evt)
        };
        websocket.onerror = function (evt) {
            onError(evt)
        };
    }

    function onOpen(evt) {
        $scope.chatMsg = '即时通讯连接成功！'
        websocket.send("init," + channelId)
    }

    function onClose(evt) {
        $scope.chatMsg = '即时通讯关闭！'
    }

    function onMessage(evt) {
        if (evt.data.startsWith('update')) {
            $scope.chatMsg = "更新: " + evt.data + " / " + $scope.list.length + " - " + getNowFormatDate()
            refreshData(false)
        } else if (evt.data.startsWith('new')) {
            $scope.chatMsg = "新增: " + evt.data + " / " + $scope.list.length + " - " + getNowFormatDate()
            refreshData(false)
        } else if (evt.data.startsWith('delete')) {
            $scope.chatMsg = "删除: " + evt.data + " / " + $scope.list.length + " - " + getNowFormatDate()
            refreshData(false)
        }
        //if (evt.data == 'new') {
        //    $scope.chatMsg = "新增数据" + "(" + $scope.list.length + ")"
        //    refreshData(false)
        //} else {
        //    if (evt.data.indexOf("delete:") != -1) {
        //        var deleteId = evt.data.split(':')[1]
        //        for (x in $scope.list) {
        //            if ($scope.list[x].id.toString() == deleteId) {
        //                $scope.list.splice(x, 1)
        //                $scope.chatMsg = "删除: " + deleteId + "(" + $scope.list.length + ")"
        //                return
        //            }
        //        }
        //    } else {
        //        $scope.chatMsg = "更新: " + evt.data + "(" + $scope.list.length + ")"
        //        refreshData(false)
        //        //for (x in $scope.list) {
        //        //    if ($scope.list[x].id.toString() == evt.data) {
        //        //        $http.get('/base/Game/' + evt.data).success(function (data, status, headers, config) {
        //        //            if (data.flag) {
        //        //                $scope.list[x] = data.data
        //        //                $scope.chatMsg = "更新: " + evt.data + "(" + $scope.list.length + ")"
        //        //                return
        //        //            }
        //        //        });
        //        //    }
        //        //}
        //    }
        //}
    }

    function onError(evt) {
        $scope.chatMsg = '服务器报错: ' + evt.data
    }
}]);
