angular.module("app").controller("shopCtrl",["$scope",function($scope){
	var accountIds = sessionStorage.getItem('accountId');
	var returnData = function(id){
		var list=[];
		$.ajax({
			url:MLurl+"/sellmall/cart/selectCartListByAccountId?accountId="+id,
			type:"get",
			contentType: "application/json;charset=UTF-8",
			beforeSend:function (request) {
                    request.setRequestHeader("X-Token", sessionStorage.getItem("token"));
                },
			success:function(resp){
				if(resp.code=="0"){
					for(var i =0;i<resp.data.length;i++){
						list[i]=resp.data[i];
					}
				}
			},
		});
		console.log(list.length)
	}

	console.log(returnData(accountIds))
	// $scope.list=$scope.returnData(accountIds);
	var result=[];
	var i;
	// 筛选数量
	// function find(i){
	// 	  if(i<4){
	// 	     result[i]=value[i]
	// 	     find(i+1);
	// 	  }
	// 	}
	// 	find(0);
	// console.log(arr)

// 计算总价
	$scope.totalPrice = function(){
		var total = 0;
		angular.forEach($scope.list,function(item){
			total+=parseFloat(item.number*item.price);
		})
		return total ;
	}

	// 计算购买数
	$scope.totalNum = function(){
		var total = 0;
		angular.forEach($scope.list,function(item){
			total+=parseInt(item.number);
		})
		return total ;
	}
	// 寻找当前的index
	var findIndex = function(id){
		var index = -1;
		angular.forEach($scope.list,function(item,key){
			if(item.id===id){
				index = key;
				return;
			}
		})
	
		return index;
	}
	// 移除
	$scope.remove = function(id){
		var index = findIndex(id);
		if(index!==-1){
			$scope.list.splice(index,1)
		}
	}
	
	// 增加数量
	$scope.add = function(id){
		var index = findIndex(id);
		if(index!==-1){
			++$scope.list[index].number;
		}
	}

	// 减少一个产品数量
	$scope.reduce = function(id){
		// alert("123")
		var index = findIndex(id);
		console.log(index)
		if(index!=-1){
			var item = $scope.list[index];
			console.log(item)
			if(item.number>1){
			
				--item.number;
			}else{
				var retrunKey = confirm("是否从购物车清除该商品？");
				if(retrunKey){
					$scope.remove(id);
				}
			}
		}
	}

	// 监听数量变化
	$scope.$watch("list",function(newValue,oldValue){
		angular.forEach(newValue,function(item,key){
			if(item.number<1){
				var retrunKey = confirm("是否从购物车清除该商品？");
				if(retrunKey){
					$scope.remove(item.id);
				}else{
					item.number = oldValue[key].number;
				}
				
			}
		})
	},true)

	// 全选
	$(".selectAll").click(function(event) {
		/* Act on the event */
		if($(this).prop("checked")){
			$(".table tbody tr td div input").prop("checked","checked")
		}else{
			$(".table tbody tr td div input").prop("checked",false)
		}
	});

	


}])