var book;
$(document).ready(function(){

	$.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vQhFVLGUts-0ZWrX0DfFLwQYrwcq5EwCzVpg7eAz04nrwOhPp1A5LKWtu1sbmr3XE-0oqwRox45I2oQ/pub?gid=0&single=true&output=csv", function (data) {
		book = JSON.parse(csvJSON(data));
		$(book).each(function (k, v) {
			console.log(v);
		})
		list();
    })
})

function list(){
	$('#books').bootstrapTable({
		toolbar:'#toolbar',
		clickToSelect:true,
		sortName: "年",
		sortOrder: "desc",
		pageNumber: 1,
		pageSize: 20,
		pageList: "[20, 50, 100, 200, All]",
		undefinedText: '無',
		search: true,
		pagination: true,
		columns: [{
			field: "年",
			title: "年",
			switchable: true,
			sortable: true
		},{
			field: '月',
			title: '月',
			switchable: true,
			sortable: true
		}, {
			field: '日',
			title: '日',
			switchable: true,
			sortable: true
		}, {
			field: '小時',
			title: '小時',
			switchable: true,
			sortable: true
		}, {
			field: '分',
			title: '分',
			switchable: true,
			sortable: true
		}, {
			field: '備注\r',
			title: '備注',
			width: '60%',
			switchable: true
		}],
	data: book,
	});
	$('#books').bootstrapTable('refreshOptions', {
        theadClasses: "thead-dark",
		iconSize: 'sm'
	})
}

(function ($) {//custom word
'use strict';
$.fn.bootstrapTable.locales['zh-CN'] = {
	formatLoadingMessage: function () {
		return '正在努力地載入資料中，請稍候……';
	},
	formatRecordsPerPage: function (pageNumber) {
		return '<span class = "page">每頁顯示 '+pageNumber+' 條記錄<br></span>';
	},
	formatShowingRows: function (pageFrom, pageTo, totalRows) {
		return '<span class = "page">顯示第 ' +  pageFrom  + ' 到第 ' +  pageTo  + ' 條記錄，總共 '+   totalRows +  ' 條記錄<span>';
	},
	formatSearch: function () {
		return '搜尋';
	},
	formatNoMatches: function () {
		return '沒有找到匹配的記錄';
	},
	formatPaginationSwitch: function () {
		return '隱藏/顯示分頁';
	},
	formatRefresh: function () {
		return '重新整理';
	},
	formatToggle: function () {
		return '切換';
	},
	formatColumns: function () {
		return '列';
	},
	formatFullscreen: function () {
		return '顯示欄位';
	}
};

$.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);
})(jQuery);


function csvJSON(csv){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
	  var obj = {};
	  var currentline=lines[i].split(",");
	  for(var j=0;j<=headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}
