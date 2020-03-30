var app = angular.module('CarBackendApp', ['tm.pagination', 'ui.grid', 'ui.grid.resizeColumns', 'ui.grid.selection', 'ui.grid.edit', 'angularFileUpload', 'fundoo.services', 'simditor', 'ui.grid.autoFitColumns']);

var uploadImageTemplateCar = '<div> <input type="file" name="files[]" accept="image/gif,image/jpeg,image/jpg,image/png" ng-file-select="grid.appScope.uploadImage($files, \'MODEL_COL_FIELD\', row.entity)"/> <div ng-repeat="imageName in MODEL_COL_FIELD.split(\',\')"> <div ng-show="imageName"> <a class="fancybox" target="_blank" data-fancybox-group="gallery" fancybox ng-href="/showImage/{{imageName}}"><img ng-src="/showimg/thumb/{{imageName}}" style="width:50px;height:50px;float:left"></a><input type="button" ng-click="grid.appScope.deleteImage(row.entity, \'MODEL_COL_FIELD\', imageName)" value="删除" style="float:left" /></div></div></div>';
var checkboxTemplateCar = '<div><input type="checkbox" ng-model="MODEL_COL_FIELD" ng-click="grid.appScope.updateEntity(col, row)" /></div>';
var childButtonTemplateCarFix = '<div align="center" style="height:26px;line-height:24px"><a href="#" data-toggle="tooltip" title="弹窗显示"><button class="btn btn-xs btn-success" ng-click="grid.appScope.popChildFix(row.entity)"><i class="icon-list-alt icon-white"></i></button></a> <a href="#" data-toggle="tooltip" title="跳转"><button class="btn btn-xs btn-primary" ng-click="grid.appScope.goToChildPageFix(row.entity.id)"><i class="icon-share icon-white"></i></button></a></div>';
var readonlyImageTemplateCar = '<div><div ng-repeat="imageName in MODEL_COL_FIELD.split(\',\')"><div ng-show="imageName"><a class="fancybox" target="_blank" data-fancybox-group="gallery" fancybox ng-href="/showImage/{{imageName}}"><img ng-src="/showimg/thumb/{{imageName}}" style="width:50px;height:50px;float:left"></a></div></div></div>';
var readonlyCheckboxTemplateCar = '<div><input type="checkbox" ng-model="MODEL_COL_FIELD" disabled="disabled" /></div>';

app.filter('safehtml', function ($sce) {
    return function (htmlString) {
        return $sce.trustAsHtml(htmlString);
    }
});


app.controller('CarBackendController', ['$scope', '$http', '$upload', 'createDialog', '$log', function ($scope, $http, $upload, createDialogService, $log) {
	$scope.isCar = true;
    
    if(GetQueryString('relate') && GetQueryString('relateValue')) {
        $scope.relate = GetQueryString('relate')
        $scope.relateValue = GetQueryString('relateValue')
    }
    
    var rowLowHeight = 26
    var rowHighHeight = 100 
    
    $scope.objFieldInfo = objFieldInfo
    $scope.objEnumInfo = objEnumInfo   
    
    $scope.status = [{"id": -100, "name": "全部"}]
    dropdownTemplateCarStatus = '<div>' +
        '<select ng-model="MODEL_COL_FIELD" ' +
        'ng-change="grid.appScope.updateEntity(col, row)" style="padding: 2px;">'
    for (var i = 0; i < Object.keys(objEnumInfo.Car.status).length; i++) {
        $scope.status.push({"id": i, "name": objEnumInfo.Car.status[i]})
        dropdownTemplateCarStatus += '<option ng-selected="MODEL_COL_FIELD==' + i
            + '" value=' + i + '>' + objEnumInfo.Car.status[i] + '</option>'
    }
    dropdownTemplateCarStatus += '</select></div>'

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
    
    $scope.leaveRecordEnum = []
    dropdownTemplateCarLeaveRecordEnum = '<div>' +
        '<select ng-model="MODEL_COL_FIELD" ' +
        'ng-change="grid.appScope.updateEntity(col, row)" style="padding: 2px;">'
    for (var i = 0; i < Object.keys(objEnumInfo.Car.leaveRecordEnum).length; i++) {
        $scope.leaveRecordEnum.push({"id": i, "name": objEnumInfo.Car.leaveRecordEnum[i]})
        dropdownTemplateCarLeaveRecordEnum += '<option ng-selected="MODEL_COL_FIELD==' + i
            + '" value=' + i + '>' + objEnumInfo.Car.leaveRecordEnum[i] + '</option>'
    }
    dropdownTemplateCarLeaveRecordEnum += '</select></div>'
    
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
        {field: 'name', displayName: objFieldInfo.Car.name, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'classify', displayName: objFieldInfo.Car.classify, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Car.status, width: 120, headerTooltip: '点击表头可进行排序, 通过直接下拉选取操作来更新数据', enableCellEdit: false, cellTemplate: dropdownTemplateCarStatus},
        {field: 'isVip', displayName: objFieldInfo.Car.isVip, headerTooltip: '点击表头可进行排序, 通过直接勾选操作来更新数据', enableCellEdit: false, cellTemplate: checkboxTemplateCar},
        {field: 'leaveRecordEnum', displayName: objFieldInfo.Car.leaveRecordEnum, width: 120, headerTooltip: '点击表头可进行排序, 通过直接下拉选取操作来更新数据', enableCellEdit: false, cellTemplate: dropdownTemplateCarLeaveRecordEnum},
        {field: 'leaveReason', displayName: objFieldInfo.Car.leaveReason, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'images', displayName: objFieldInfo.Car.images, width: 170, enableCellEdit: false, cellTemplate: uploadImageTemplateCar},
        {field: 'smallImages', displayName: objFieldInfo.Car.smallImages, width: 170, enableCellEdit: false, cellTemplate: uploadImageTemplateCar},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Car.lastUpdateTime, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Car.createdAt, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'description1', displayName: objFieldInfo.Car.description1, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'description2', displayName: objFieldInfo.Car.description2, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Car.comment, headerTooltip: '点击表头可进行排序', enableCellEdit: true},
        {field: 'refUserId', displayName: objFieldInfo.Car.refUserId, headerTooltip: '点击表头可进行排序', enableCellEdit: false, cellTemplate: '<a href="/admin/user?relate=id&relateValue={{COL_FIELD}}"><span ng-bind="COL_FIELD"></span></a>'},
        {field: 'childFix', displayName: objFieldInfo.Car.fixs, width: '80', headerTooltip: '弹窗/跳转显示', enableCellEdit: false, cellTemplate: childButtonTemplateCarFix},

        {field: 'user', displayName: objFieldInfo.Car.user, headerTooltip: '点击表头可进行排序', enableCellEdit: false, cellTemplate: '<a href="/admin/user?relate=id&relateValue={{COL_FIELD.id}}"><span ng-bind="COL_FIELD.name"></span></a>'},
    ];
    
    $scope.goToChildPageFix = function(pid) { location = '/admin/fix?relate=car.id&relateValue=' + pid }
    
    $scope.selectedParentUserId = 0
    $scope.parentUsers = []
    $scope.parentUsers4grid = []
    $scope.pageInfo4ParentUser = {}
    $scope.searchFieldNameUser = searchFieldNameUser
    $scope.searchFieldNameUserComment = searchFieldNameUserComment
    

    $scope.$watch('selectedParentUserId', function(newValue, oldValue, scope){
        if(newValue != oldValue) {
            if($scope.parentUsers.length > 0) {
                if ($scope.selectedParentUserId) {
                    if ($scope.paginationConf.currentPage != 1) {
                        $scope.paginationConf.currentPage = 1
                    }
                } else {
                    if ($scope.paginationConf.currentPage != 1) {
                        $scope.paginationConf.currentPage = 1
                    }
                    $scope.selectedParentUserId = 0
                }
                refreshData(true)
            }
        }
    }, false);
    
    $http.get('/base/User/all').success(function (data, status, headers, config) {
    	if (data.flag) {
            $scope.parentUsers = [{"id": 0, "name": "全部"}]
    		$scope.parentUsers = $scope.parentUsers.concat(data.data);
            if ((GetQueryString('relate') == 'user.id' || GetQueryString('relate') == 'refUserId') 
                && GetQueryString('relateValue')) 
                $scope.selectedParentUserId = parseInt(GetQueryString('relateValue'))
    	}
    });
    
    function fillGridWithParentUsers() {
        url = '/base/User/all?page=1' 
                    + '&size=1000000'
                    
        if ($scope.currentObj.queryKeyword4User)
            url += '&searchOn=' + $scope.searchFieldNameUser + '&kw=' + $scope.currentObj.queryKeyword4User
            
        $http.get(url)
            .success(function (data, status, headers, config) {
            if (data.flag) {
                $scope.parentUsers4grid = data.data;
                
                for (x in $scope.parentUsers4grid) {
                    if ($scope.parentUsers4grid[x].id === $scope.currentObj.refUserId) {
                        $scope.parentUsers4grid[x].refParentUser = true
                        break
                    }
                    else {
                        $scope.parentUsers4grid[x].refParentUser = false
                    }
                }
            }
            else {
                $scope.parentUsers4grid = [];
                //showAlert('错误: ', data.message, 'danger')
            }
        });
    }
    
    $scope.myParentUserSelections = [];
    $scope.gridParentUsers = {
        data: 'parentUsers4grid',
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        onRegisterApi: function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (rows) {
                $scope.myParentUserSelections = gridApi.selection.getSelectedRows();
            });
        },
        isRowSelectable: function(row){
            if(row.entity.refParentUser == true){
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
        fillGridWithParentUsers()
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
    $scope.getRefObjName = function (obj, pascalFieldName) {
        if (!obj['ref' + pascalFieldName + 'Id']) return
        $http.get('/base/' + pascalFieldName + '/' + obj['ref' + pascalFieldName + 'Id']).success(function (data, status, headers, config) {
            if (data.flag) obj[pascalFieldName.toLowerCase()] = data.data
        });
    }
    
    function getQueryUrl() {
        var url = 'startTime=' + $scope.startTime + '&endTime=' + $scope.endTime
                    + '&status=' + $scope.selectedStatus
                    
        
        var fieldOnParam = '';
        var fieldValueParam = '';
        
        if ($scope.selectedParentUserId != 0) {
            fieldOnParam += 'refUserId';
            fieldValueParam += $scope.selectedParentUserId;
        }
        url += '&fieldOn=' + fieldOnParam + '&fieldValue=' + fieldValueParam
        
        
        if ($scope.queryKeyword)
            url += '&searchOn=' + searchFieldName + '&kw=' + $scope.queryKeyword
            
        return url
    }

    function refreshData(showMsg){
        var url = '/base/Car/all?page=' 
                    + $scope.paginationConf.currentPage 
                    + '&size=' + $scope.paginationConf.itemsPerPage
                    + "&" + getQueryUrl();

        $http.get(url).success(function (data, status, headers, config) {
            if (data.flag) {
                for (x in data.data) {
                    if (!data.data[x].user) $scope.getRefObjName(data.data[x], 'User')
                }
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
        if ($scope.myParentUserSelections.length > 0) content.refUserId = $scope.myParentUserSelections[0].id
        
        var isNew = !content.id
        var url = '/car'
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
                        var deleteUrl = '/base/Car/' + content.id
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
        $scope.myParentUserSelections = [];
        $scope.$modalClose();
        refreshData(false)
    };
    
    $scope.addContent = function(){
        $http.get('/new/car')
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.currentObj = data.data;
                    
                    fillGridWithParentUsers();
                    
                    createDialogService("/assets/html/edit_templates/car.html",{
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
        
            fillGridWithParentUsers();

            createDialogService("/assets/html/edit_templates/car.html",{
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
                location.href = '/report/car?' + getQueryUrl()
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

    ////////// child Fix popup show //////////
    
    $scope.gridChildFix = {
        data: 'childFix4grid',
        rowHeight: rowLowHeight,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false
    };
    
    $scope.gridChildFix.columnDefs = [        
        {field: 'id', displayName: 'Id', width: '40', enableCellEdit: false},
        {field: 'name', displayName: objFieldInfo.Fix.name, enableCellEdit: true},
        {field: 'status', displayName: objFieldInfo.Fix.status, enableCellEdit: false, cellTemplate: '<span ng-bind="grid.appScope.objEnumInfo.Fix.status[MODEL_COL_FIELD]"></span>'},
        {field: 'refCarId', displayName: objFieldInfo.Fix.refCarId, enableCellEdit: true},
        {field: 'images', displayName: objFieldInfo.Fix.images, width: 170, enableCellEdit: false, cellTemplate: readonlyImageTemplateCar},
        {field: 'lastUpdateTime', displayName: objFieldInfo.Fix.lastUpdateTime, enableCellEdit: true},
        {field: 'createdAt', displayName: objFieldInfo.Fix.createdAt, enableCellEdit: true},
        {field: 'description1', displayName: objFieldInfo.Fix.description1, enableCellEdit: true},
        {field: 'description2', displayName: objFieldInfo.Fix.description2, enableCellEdit: true},
        {field: 'comment', displayName: objFieldInfo.Fix.comment, enableCellEdit: true},
    ];

    $scope.popChildFix = function (obj) {
        if (obj) {
            $scope.currentObj = obj;

            fillGridWithChildFix()

            createDialogService("/assets/html/child_pop_templates/car_2_fix.html", {
                id: 'child_fix',
                title: '查看',
                scope: $scope,
                footerTemplate: '<div></div>'
            });
        } else {
            showAlert('错误: ', '数据不存在', 'danger');
        }
    };

    $scope.pageInfo4childFix = {}

    $scope.$watch('paginationConf4ChildFix.itemsPerPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildFix();
        }
    }, false);

    $scope.$watch('paginationConf4ChildFix.currentPage', function(newValue, oldValue, scope){
        if (newValue != oldValue) {
            fillGridWithChildFix();
        }
    }, false);

    $scope.paginationConf4ChildFix = {
        currentPage: 1, //首页
        itemsPerPage: 10, //每页显示数量
        pagesLength: 5,  //显示多少个页数格子
        perPageOptions: [1, 2, 5, 10, 20, 50, 100],//选择每页显示数量
        rememberPerPage: 'itemsPerPage4childFix'
    };

    function fillGridWithChildFix() {
        $scope.childFix4grid = []
        $http.get('/base/Fix/all?page='
        + $scope.paginationConf4ChildFix.currentPage
        + '&size=' + $scope.paginationConf4ChildFix.itemsPerPage
        + '&fieldOn=car.id&fieldValue=' + $scope.currentObj.id)
            .success(function (data, status, headers, config) {
                if (data.flag) {
                    $scope.childFix4grid = data.data;
                    $scope.pageInfo4childFix = data.page;
                    $scope.paginationConf4ChildFix.totalItems = data.page.total;
                }
            });
    }
    
    
    ////////// web socket msg //////////
    var wsUri = ''
    var channelId = 'car_backend_' + getNowFormatDate()
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
