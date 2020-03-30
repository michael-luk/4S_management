var app = angular.module('StaffBackendApp', ['tm.pagination', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.edit', 'angularFileUpload', 'fundoo.services', 'simditor', 'ui.grid.autoFitColumns']);

var uploadImageTemplateStaff = '<div> <input type="file" name="files[]" accept="image/gif,image/jpeg,image/jpg,image/png" ng-file-select="grid.appScope.uploadImage($files, \'MODEL_COL_FIELD\', row.entity)"/> <div ng-repeat="imageName in MODEL_COL_FIELD.split(\',\')"> <div ng-show="imageName"> <a class="fancybox" target="_blank" data-fancybox-group="gallery" fancybox ng-href="/showImage/{{imageName}}"><img ng-src="/showimg/thumb/{{imageName}}" style="width:50px;height:50px;float:left"></a><input type="button" ng-click="grid.appScope.deleteImage(row.entity, \'MODEL_COL_FIELD\', imageName)" value="删除" style="float:left" /></div></div></div>';
var checkboxTemplateStaff = '<div><input type="checkbox" ng-model="MODEL_COL_FIELD" ng-click="grid.appScope.updateEntity(col, row)" /></div>';
var childButtonTemplateStaffTicket = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popChildTicket(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToChildPageTicket(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
//var friendButtonTemplateStaff = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPage(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var friendButtonTemplateStaffUser = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popFriendUser(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPageUser(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
//var friendButtonTemplateStaff = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPage(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var friendButtonTemplateStaffVisit = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popFriendVisit(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToFriendPageVisit(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var readonlyImageTemplateStaff = '<div><div ng-repeat="imageName in MODEL_COL_FIELD.split(\',\')"><div ng-show="imageName"><a class="fancybox" target="_blank" data-fancybox-group="gallery" fancybox ng-href="/showImage/{{imageName}}"><img ng-src="/showimg/thumb/{{imageName}}" style="width:50px;height:50px;float:left"></a></div></div></div>';
var readonlyCheckboxTemplateStaff = '<div><input type="checkbox" ng-model="MODEL_COL_FIELD" disabled="disabled" /></div>';

app.filter('safehtml', function ($sce) {
    return function (htmlString) {
        return $sce.trustAsHtml(htmlString);
    }
});


app.controller('StaffBackendController', ['$scope', '$http', '$upload', 'createDialog', '$log', function ($scope, $http, $upload, createDialogService, $log) {
	$scope.isStaff = true;
    
    if(GetQueryString('relate') && GetQueryString('relateValue')) {
        $scope.relate = GetQueryString('relate')
        $scope.relateValue = GetQueryString('relateValue')
    }
    
    var rowLowHeight = 26
    var rowHighHeight = 100 
    
    $scope.objFieldInfo = objFieldInfo
    $scope.objEnumInfo = objEnumInfo   
    
    $scope.status = [{"id": -100, "name": "全部"}]
    dropdownTemplateStaffStatus = '<div>' +
        '<select ng-model="MODEL_COL_FIELD" ' +
        'ng-change="grid.appScope.updateEntity(col, row)" style="padding: 2px;">'
    for (var i = 0; i < Object.keys(objEnumInfo.Staff.status).length; i++) {
        $scope.status.push({"id": i, "name": objEnumInfo.Staff.status[i]})
        dropdownTemplateStaffStatus += '<option ng-selected="MODEL_COL_FIELD==' + i
            + '" value=' + i + '>' + objEnumInfo.Staff.status[i] + '</option>'
    }
    dropdownTemplateStaffStatus += '</select></div>'

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
        {field: 'name', displayName: objFieldInfo.Staff.name, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Staff.status, width: 120, headerTooltip: '点击表头可进行排序, 通过直接下拉选取操作来更新数据', enableCellEdit: false, cellTemplate: dropdownTemplateStaffStatus},
        {field: 'images', displayName: objFieldInfo.Staff.images, width: 170, enableCellEdit: false, cellTemplate: uploadImageTemplateStaff},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Staff.lastUpdateTime, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Staff.createdAt, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'description1', displayName: objFieldInfo.Staff.description1, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'description2', displayName: objFieldInfo.Staff.description2, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Staff.comment, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'childTicket', displayName: objFieldInfo.Staff.tickets, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: childButtonTemplateStaffTicket},
        {field: 'friendUser', displayName: objFieldInfo.Staff.users, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: friendButtonTemplateStaffUser},
        {field: 'friendVisit', displayName: objFieldInfo.Staff.visits, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: friendButtonTemplateStaffVisit},

    ];
    
    $scope.goToChildPageTicket = function(pid) { location = '/admin/ticket?relate=staff.id&relateValue=' + pid }
    $scope.goToFriendPageUser = function(pid) { location = '/admin/user?relate=staffs.id&relateValue=' + pid }
    $scope.goToFriendPageVisit = function(pid) { location = '/admin/visit?relate=staffs.id&relateValue=' + pid }
    
    $scope.friends4gridUser = []
    $scope.pageInfo4FriendUser = {}
    $scope.searchFieldNameUser = searchFieldNameUser
    $scope.searchFieldNameUserComment = searchFieldNameUserComment
    
    function fillGridWithFriendsUser() {
        url = '/base/User/all?page=1' 
                    + '&size=1000000'
                    
        if ($scope.currentObj.queryKeyword4User)
            url += '&searchOn=' + $scope.searchFieldNameUser + '&kw=' + $scope.currentObj.queryKeyword4User
            
        $http.get(url)
            .success(function (data, status, headers, config) {
            if (data.flag) {
                
                if ($scope.currentObj.id) {
                    var allFriends = data.data;
                    
                    //用于比较, 全取不分页
                    $http.get('/staff/' + $scope.currentObj.id + '/users?page=1&size=1000000')
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
                        $scope.friends4gridUser = allFriends;
                    })
                }
                else {
                    $scope.friends4gridUser = data.data;
                }
            }
            else {
                $scope.parentUsers4grid = [];
                //showAlert('错误: ', data.message, 'danger')
            }
        });
    }
    
    $scope.myFriendSelectionsUser = [];
    $scope.gridFriendsUser = {
        data: 'friends4gridUser',
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                $scope.myFriendSelectionsUser = gridApi.selection.getSelectedRows();
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

    $scope.searchContent4User = function(){
        fillGridWithFriendsUser()
    }
    $scope.friends4gridVisit = []
    $scope.pageInfo4FriendVisit = {}
    $scope.searchFieldNameVisit = searchFieldNameVisit
    $scope.searchFieldNameVisitComment = searchFieldNameVisitComment
    
    function fillGridWithFriendsVisit() {
        url = '/base/Visit/all?page=1' 
                    + '&size=1000000'
                    
        if ($scope.currentObj.queryKeyword4Visit)
            url += '&searchOn=' + $scope.searchFieldNameVisit + '&kw=' + $scope.currentObj.queryKeyword4Visit
            
        $http.get(url)
            .success(function (data, status, headers, config) {
            if (data.flag) {
                
                if ($scope.currentObj.id) {
                    var allFriends = data.data;
                    
                    //用于比较, 全取不分页
                    $http.get('/staff/' + $scope.currentObj.id + '/visits?page=1&size=1000000')
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
                        $scope.friends4gridVisit = allFriends;
                    })
                }
                else {
                    $scope.friends4gridVisit = data.data;
                }
            }
            else {
                $scope.parentVisits4grid = [];
                //showAlert('错误: ', data.message, 'danger')
            }
        });
    }
    
    $scope.myFriendSelectionsVisit = [];
    $scope.gridFriendsVisit = {
        data: 'friends4gridVisit',
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: true,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                $scope.myFriendSelectionsVisit = gridApi.selection.getSelectedRows();
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

    $scope.searchContent4Visit = function(){
        fillGridWithFriendsVisit()
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
        var url = '/base/Staff/all?page=' 
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
        if ($scope.myFriendSelectionsUser.length > 0) content.users = $scope.myFriendSelectionsUser
        if ($scope.myFriendSelectionsVisit.length > 0) content.visits = $scope.myFriendSelectionsVisit
        
        var isNew = !content.id
        var url = '/staff'
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
                        var deleteUrl = '/staff/' + content.id
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
        $http.get('/new/staff')
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.currentObj = data.data;
                    
                    fillGridWithFriendsUser();
                    fillGridWithFriendsVisit();
                    
                    createDialogService("/assets/html/edit_templates/staff.html",{
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
        
            fillGridWithFriendsUser();
            fillGridWithFriendsVisit();

            createDialogService("/assets/html/edit_templates/staff.html",{
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
                location.href = '/report/staff?' + getQueryUrl()
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
        {field: 'images', displayName: objFieldInfo.Ticket.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateStaff},
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

            createDialogService("/assets/html/child_pop_templates/staff_2_ticket.html", {
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
        + '&fieldOn=staff.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.childTicket4grid = data.data;
                    $scope.pageInfo4childTicket = data.page;
                    $scope.paginationConf4ChildTicket.totalItems = data.page.total;
                }
            });
    }
    
    ////////// friend User popup show //////////
    
    $scope.gridFriendUser = {
        data: 'friendUser4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridFriendUser.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.User.name, enableCellEdit: true},
        {field: 'thirdId', displayName: objFieldInfo.User.thirdId, enableCellEdit: true},
        {field: 'loginName', displayName: objFieldInfo.User.loginName, enableCellEdit: true},
        {field: 'email', displayName: objFieldInfo.User.email, enableCellEdit: true},
        {field: 'isEmailVerified', displayName: objFieldInfo.User.isEmailVerified, width: 120, enableCellEdit: false, cellTemplate: readonlyCheckboxTemplateStaff},
        {field: 'emailKey', displayName: objFieldInfo.User.emailKey, enableCellEdit: true},
        {field: 'emailOverTime', displayName: objFieldInfo.User.emailOverTime, enableCellEdit: true},
        {field: 'password', displayName: objFieldInfo.User.password, enableCellEdit: true},
        {field: 'headImage', displayName: objFieldInfo.User.headImage, enableCellEdit: true},
        {field: 'images', displayName: objFieldInfo.User.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateStaff},
        {field: 'sexEnum', displayName: objFieldInfo.User.sexEnum, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.User.sexEnum[MODEL_COL_FIELD]"></span>'},
        {field: 'phone', displayName: objFieldInfo.User.phone, enableCellEdit: true},
        {field: 'cardNumber', displayName: objFieldInfo.User.cardNumber, enableCellEdit: true},
        {field: 'country', displayName: objFieldInfo.User.country, enableCellEdit: true},
        {field: 'province', displayName: objFieldInfo.User.province, enableCellEdit: true},
        {field: 'city', displayName: objFieldInfo.User.city, enableCellEdit: true},
        {field: 'zone', displayName: objFieldInfo.User.zone, enableCellEdit: true},
        {field: 'address', displayName: objFieldInfo.User.address, enableCellEdit: true},
        {field: 'birth', displayName: objFieldInfo.User.birth, enableCellEdit: true},
        {field: 'lastUpdateTime', displayName: objFieldInfo.User.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.User.createdAt, enableCellEdit: true},
        {field: 'lastLoginIp', displayName: objFieldInfo.User.lastLoginIp, enableCellEdit: true},
        {field: 'lastLoginTime', displayName: objFieldInfo.User.lastLoginTime, enableCellEdit: true},
        {field: 'lastLoginIpArea', displayName: objFieldInfo.User.lastLoginIpArea, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.User.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.User.status[MODEL_COL_FIELD]"></span>'},
        {field: 'userRoleEnum', displayName: objFieldInfo.User.userRoleEnum, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.User.userRoleEnum[MODEL_COL_FIELD]"></span>'},
        {field: 'comment', displayName: objFieldInfo.User.comment, enableCellEdit: true},
    ];

    $scope.popFriendUser = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithFriendUser()

            createDialogService("/assets/html/child_pop_templates/staff_2_user.html", {
                id: 'friend_user',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4friendPopUser = {}

    $scope.$watch('paginationConf4FriendPopUser.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendUser();
        }
    }, false);

    $scope.$watch('paginationConf4FriendPopUser.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendUser();
        }
    }, false);

    $scope.paginationConf4FriendPopUser = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4friendPopUser'
    };

    function fillGridWithFriendUser() {
        $scope.friendUser4grid = []
        $http.get('/base/User/all?page='
        + $scope.paginationConf4FriendPopUser.currentPage
        + '&size=' + $scope.paginationConf4FriendPopUser.itemsPerPage
        + '&fieldOn=staffs.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.friendUser4grid = data.data;
                    $scope.pageInfo4friendPopUser = data.page;
                    $scope.paginationConf4FriendPopUser.totalItems = data.page.total;
                }
            });
    }
    ////////// friend Visit popup show //////////
    
    $scope.gridFriendVisit = {
        data: 'friendVisit4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridFriendVisit.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.Visit.name, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Visit.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Visit.status[MODEL_COL_FIELD]"></span>'},
        {field: 'typeEnum', displayName: objFieldInfo.Visit.typeEnum, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Visit.typeEnum[MODEL_COL_FIELD]"></span>'},
        {field: 'images', displayName: objFieldInfo.Visit.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateStaff},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Visit.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Visit.createdAt, enableCellEdit: true},
        {field: 'description1', displayName: objFieldInfo.Visit.description1, enableCellEdit: true},
        {field: 'description2', displayName: objFieldInfo.Visit.description2, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Visit.comment, enableCellEdit: true},
        {field: 'refUserId', displayName: objFieldInfo.Visit.refUserId, enableCellEdit: true},
    ];

    $scope.popFriendVisit = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithFriendVisit()

            createDialogService("/assets/html/child_pop_templates/staff_2_visit.html", {
                id: 'friend_visit',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4friendPopVisit = {}

    $scope.$watch('paginationConf4FriendPopVisit.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendVisit();
        }
    }, false);

    $scope.$watch('paginationConf4FriendPopVisit.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithFriendVisit();
        }
    }, false);

    $scope.paginationConf4FriendPopVisit = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4friendPopVisit'
    };

    function fillGridWithFriendVisit() {
        $scope.friendVisit4grid = []
        $http.get('/base/Visit/all?page='
        + $scope.paginationConf4FriendPopVisit.currentPage
        + '&size=' + $scope.paginationConf4FriendPopVisit.itemsPerPage
        + '&fieldOn=staffs.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.friendVisit4grid = data.data;
                    $scope.pageInfo4friendPopVisit = data.page;
                    $scope.paginationConf4FriendPopVisit.totalItems = data.page.total;
                }
            });
    }
    
    ////////// web socket msg //////////
    var wsUri = ''
    var channelId = 'staff_backend_' + getNowFormatDate()
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
