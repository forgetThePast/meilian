var ML = ML || {} ;
// 配置url
var MLurl = "http://localhost:8080";

// 加载头部信息
angular.module('app',[]).directive("appHead",['$http',function($http){
	return {
		restrict:'A',
		replace:true,
		templateUrl:"template.html",
		
	}
}]);
// angular.module('app',[]).controller('mainCtrl', ['$scope', function($scope){
//
// }])



ML.list = {
	"女士":{
		"包袋 Bags":["所有包袋","手提包 Totes","单肩包 Shoulder Bags","斜挎包 Messenger Bags","手拿包 Clutch Bags","双肩包 Travel Bags"],
		"配饰 Accessories":["所有配饰","钱包 Wallets","手表 Watches","太阳眼镜 Sunglasses","饰品 Jewelry","腰带 Belts","围巾 Scarf","小配件 Small Acc."],	"鞋履 Shoes":['所有鞋履',"平底鞋 Flat Shoes","高跟鞋 Pumps","靴子 Boots"],
		"服装 Clothes":['所有服装',"卫衣 Hoodies","衬衫 Shirt","针织/毛衫 Knit/Sweater","夹克 Jacket","大衣 Coat","半裙 Skirts","连衣裙 Dresses"]
	},
	"男士":{
		"包袋 Bags":["所有包袋","手提包 Totes","单肩包 Shoulder Bags","斜挎包 Messenger Bags","手拿包 Clutch Bags","双肩包 Travel Bags"],
		"配饰 Accessories":["所有配饰","钱包 Wallets","手表 Watches","太阳眼镜 Sunglasses","腰带 Belts","围巾 Scarf","领带 Ties","数码周边 Technology","小配件 Small Acc."],
		"鞋履 Shoes":['所有鞋履',"平底鞋 Flat Shoes","休闲皮鞋 Casual Shoes","正装皮鞋 Business Shoes"],
		"服装 Clothes":['所有服装',"卫衣 Hoodies","T恤/POLO T-Shirt/POLO","衬衫 Shirt","西装套装 Suit","夹克 Jacket","大衣 Coat","羽绒服/棉衣 Down Jacket","休闲裤 Casual Pants"]
	},
	"品牌":{
		"国际大牌 Luxury Brand":["Diesel 迪赛","Chloe 蔻依","Dior 迪奥","BVLGARI 宝格丽","3.1 Phillip Lim 菲利林",
		"Love Moschino 莫斯奇诺","Giuseppe Zanotti 朱塞佩·萨诺","Moschino 莫斯奇诺",""],
		
	}
};

ML.index = (function(self){


	var event = function(){
			$('.imgList li:first').show();
			$('.btnList li:last').css('margin-right', 0);

			//定义一个模拟变量，用来模拟那个不断改变的下标
			var num=0;
			var timer;
			var $rightBtn=$('.rightBtn');
			var $leftBtn=$('.leftBtn');
			var $btnLi=$('.btnList li');
			var $imgLi=$('.imgList li');
			var $box=$('.box');

			//封装下一张的功能
			function nextFn(event) {
				
				$imgLi.eq(num).stop().fadeOut();

				num++;
				if(num>3){
					num=0;
				}
			
				$imgLi.eq(num).stop().fadeIn();

			}

			
			$rightBtn.click(nextFn);

	
			$leftBtn.click(function(event) {
				
				//让当前这一张淡出，让上一张淡入

				//num这个变量在操控它之前，就代表当前这一张
				$imgLi.eq(num).stop().fadeOut();

				num--;
				if(num<0){
					num=3;
				}

				
				$imgLi.eq(num).stop().fadeIn();
			});

			//自动走
			timer=setInterval(nextFn, 2000);	

			//停止 和 重启 定时器
			$box.hover(function() {
				clearInterval(timer);
			}, function() {
				clearInterval(timer);
				timer=setInterval(nextFn, 2000);	
			});

			$('.specialItem img').click(function(event) {
				window.location.href = "dior.html";
			});

	};



	var buildList = function(param){
		
		var html = "";
		var html1 = "";

		var data = ML.list[param];
		for(var item in data){
			// console.log();
			var html1 = "";
			var str =data[item];
			// console.log(str);
			for(var i = 0;i<str.length;i++){
				html1+="<li>"+str[i]+"</li>";
			}
			
			html+='<li class="fl items">'+item+"<ul>"+html1+"</ul></li>";
		}
		
		
		return html;
	};



	self.init = function(){
		event();
		$(".navList li a").hover(function(){
			var $this = $(this).text()
			if($this=="首页"){
				$(".itemList").hide()
			}else{
				$('.itemList').stop().slideDown();
				$('.itemList  ol').empty();
				var str =buildList($this);
				$('.itemList  ol').prepend(str);
				$(".itemList").mouseleave(function(event) {
					$(this).hide();
				});
			}
			// console.log($this);
			if($this=="女士"){
				$('.itemList li').click(function(){
					window.location.href = "nv.html";
				})
			}else if($this=="男士"){
				$('.itemList li').click(function(){
					window.location.href = "nan.html";
				})
			}else if($this=="品牌"){
				$('.itemList li').click(function(){
					window.location.href = "brand.html";
				})
			}
			
		})

		var sessionItem = sessionStorage.getItem("token");
		var data = {token:sessionItem}
		$.ajax({
			url:MLurl+"/common/auth",
 			type:"post",
 			dataType:"json",
 			contentType: "application/json;charset=UTF-8",
 			data:JSON.stringify(data),
 			success:function(resp){
 				console.log(resp)
 			}
		})

		
		
	}
	return self ;
})(ML.index||{});

ML.dior = (function(self){
	var buildList = function(param){
		
		var html = "";
		var html1 = "";

		var data = ML.list[param];
		for(var item in data){
			// console.log();
			var html1 = "";
			var str =data[item];
			// console.log(str);
			for(var i = 0;i<str.length;i++){
				html1+="<li>"+str[i]+"</li>";
			}
			
			html+='<li class="fl items">'+item+"<ul>"+html1+"</ul></li>";
		}
		
		
		return html;
	};



	var linkPage = function(){
		$(".prods li").click(function(event) {
			var str = $(this).children('img').attr("src");
			console.log(str)
			var srcPath = str.split("/")[2];
			window.location.href = "details.html?srcPath="+srcPath;
		});
	}

	
	self.init = function(){
		
		$(".navList li a").hover(function(){
			var $this = $(this).text()
			if($this=="首页"){
				$(".itemList").hide()
			}else{
				$('.itemList').stop().slideDown();
				$('.itemList  ol').empty();
				var str =buildList($this);
				$('.itemList  ol').prepend(str);
				$(".itemList").mouseleave(function(event) {
					$(this).hide();
				});
			}
			// console.log($this);
			if($this=="女士"){
				$('.itemList li').click(function(){
					location.href = "nv.html";
				})
			}else if($this=="男士"){
				$('.itemList li').click(function(){
					
					location.href = "nan.html";
				})
			}else if($this=="品牌"){
				$('.itemList li').click(function(){
					location.href = "brand.html";
				})
			}
			
		});
		
		linkPage();
		$('.member_form_btn').on('click',function(){
			
		})
		
	}
	return self ;
})(ML.dior||{});

ML.details = (function(self){
	var buildList = function(param){
		
		var html = "";
		var html1 = "";

		var data = ML.list[param];
		for(var item in data){
			// console.log();
			var html1 = "";
			var str =data[item];
			// console.log(str);
			for(var i = 0;i<str.length;i++){
				html1+="<li>"+str[i]+"</li>";
			}
			
			html+='<li class="fl items">'+item+"<ul>"+html1+"</ul></li>";
		}
		
		
		return html;
	};
	var showPage = function(){
		var str = window.location.href;
		var param = str.split("=")[1].split(".")[0];
		var data = ML.details[param]
		
	}

	self.init = function(){
		$(".navList li a").hover(function(){
			var $this = $(this).text()
			if($this=="首页"){
				$(".itemList").hide()
			}else{
				$('.itemList').stop().slideDown();
				$('.itemList  ol').empty();
				var str =buildList($this);
				$('.itemList  ol').prepend(str);
				$(".itemList").mouseleave(function(event) {
					$(this).hide();
				});
			}
			// console.log($this);
			if($this=="女士"){
				$('.itemList li').click(function(){
					window.location.href = "nv.html";
				})
			}else if($this=="男士"){
				$('.itemList li').click(function(){
					window.location.href = "nan.html";
				})
			}else if($this=="品牌"){
				$('.itemList li').click(function(){
					window.location.href = "brand.html";
				})
			}

			
			
		});
		showPage();
	}
	return self;
})(ML.details||{});


ML.register = (function(self){
	$('#defaultForm').bootstrapValidator({
 //        live: 'disabled',
         // message: 'This value is not valid',
         feedbackIcons: {
             valid: 'glyphicon glyphicon-ok',
             invalid: 'glyphicon glyphicon-remove',
             validating: 'glyphicon glyphicon-refresh'
         },
         fields: {
           
             email: {
                 validators: {
                 	 notEmpty: {
                            message: '邮箱不能为空！'
                        },
                     emailAddress: {
                         message: '请检查邮箱是否正确！'
                     }
                 }
             },
              username: {
                 validators: {
                 	 notEmpty: {
                            message: '用户名不能为空！'
                        },
                     emailAddress: {
                         message: 'nothing！'
                     }
                 }
             },
              code1:{
             	validators: {
                 	 notEmpty: {
                            message: '验证码不能为空！'
                        },
                     
                 }
             },
             password: {
                 validators: {
                     notEmpty: {
                         message: '密码不能为空'
                     },
                     identical: {
                         field: 'confirmPassword',
                         message: '两次密码填写不一致，请检查！'
                     },
                    
                 }
             },
             confirmPassword: {
                 validators: {
                     notEmpty: {
                         message: '确认密码不能为空！'
                     },
                     identical: {
                         field: 'password',
                         message: '两次密码填写不一致，请检查！'
                     },
                    
                 }
             },
           
         }
     });

	// 获取验证码
	var getCode = function(){

			var xhr = new XMLHttpRequest();    
		    xhr.open("get", MLurl+"/common/account/getValidateCode", true);
		    xhr.responseType = "blob";
		   	xhr.withCredentials = true;
		    xhr.onload = function() {
		        if (this.status == 200) {
		            var blob = this.response;
		            var img = document.createElement("img");
		            img.onload = function(e) {
		              window.URL.revokeObjectURL(img.src); 
		            };
		           
		　　　　　　　$("#remoteimg").attr("src",window.URL.createObjectURL(blob));
			 } }
			 xhr.send()
	};
	self.init = function(){

		getCode();
		$("#remoteimg").on("click",function(){
			getCode();
		})

		$('.member_form_btn').click(function() {
         	$('#defaultForm').bootstrapValidator('validate');
         	if(!$('.form-group').hasClass('has-error')){
         		var Data = Data || {};
         		Data.accountCode=$("#useracount").val();
         		Data.password = $("#password").val();
         		Data.validateCode = $("#code").val();
         		Data.accountName = $("#username").val();
         		$.ajaxSetup({
				  xhrFields: {
				    withCredentials: true
				  }
				});
         		$.ajax({
         			url:MLurl+"/common/account",
         			type:"post",
         			// dataType:"json",
         			contentType: "application/json;charset=UTF-8",
         			data:JSON.stringify(Data),

         			success:function(resp){
         				if(resp&&resp.code=="0"){
         					alert("恭喜你,注册成功!")
         				}else{

         				}
         			}
         		})
         	}

	    })
	}
	return self;
})(ML.register||{});
ML.login = (function(self){
	$('#defaultForm').bootstrapValidator({
 //        live: 'disabled',
         // message: 'This value is not valid',
         feedbackIcons: {
             valid: 'glyphicon glyphicon-ok',
             invalid: 'glyphicon glyphicon-remove',
             validating: 'glyphicon glyphicon-refresh'
         },
         fields: {
           
             email: {
                 validators: {
                 	 notEmpty: {
                            message: '邮箱不能为空！'
                        },
                     emailAddress: {
                         message: '请检查邮箱是否正确！'
                     }
                 }
             },
            
             password: {
                 validators: {
                     notEmpty: {
                         message: '密码不能为空'
                     },     
                 }
             },
            
           
         }
     });
	self.init = function(){
		$('.member_form_btn').click(function() {
         	$('#defaultForm').bootstrapValidator('validate');
         	if(!$('.form-group').hasClass('has-error')){
         		var data = data || {};
         		data.accountCode = $("#username").val();
         		data.password = $('#password').val();
         		$.ajax({
         			url:MLurl+"/common/auth",
         			type:"post",
         			dataType:"json",
         			contentType: "application/json;charset=UTF-8",
         			data:JSON.stringify(data),
         			success:function(resp){
         				if(resp&&resp.code=="-1"){
         					alert('该账号不存在')
         				}else if(resp&&resp.code=="0"){
         					
         					sessionStorage.setItem("token", resp.data.token);
         					location.href='index.html';
         				}
         			}
         		})
         	}
	    })
	}
	return self;
})(ML.login||{});


ML.shop = (function(self){
	
	self.init = function(){
		$(".table input[type='checkbox']").prop('checked',true)
		$(".table tbody tr td div input").click(function(){
			if($(".table tbody tr td div input").prop('checked')){
				$(".selectAll").prop("checked","checked")
			}else{
				$(".selectAll").prop("checked",false)
			}
		})
	}
	return self;
})(ML.shop||{});


// 订单
ML.order = (function(self){
	
	self.init = function(){
		$(".table input[type='checkbox']").prop('checked',true)
		$(".table tbody tr td div input").click(function(){
			if($(".table tbody tr td div input").prop('checked')){
				$(".selectAll").prop("checked","checked")
			}else{
				$(".selectAll").prop("checked",false)
			}
		})

		$('.address-item ').click(function(){
			$('#myModal').modal('show')
		})
		addressInit('province', 'city', 'district', '安徽', '合肥市', '蜀山区');

		$('.addressbtn').click(function(){
			if($('.detailAddress').val()==""){
				alert("请填写详细地址")
			}
			if($('.username').val()==""){
				alert("请填写收件人")
			}
			if($('.phone').val()==""){
				alert("请填写联系电话")
			}
			var Address = Address || {};
			Address.province = $('.province').val();
			Address.city = $('.city').val();
			Address.district = $('.district').val();
			Address.detailAddress = $('.detailAddress').val();
			Address.username = $('.username').val();
			Address.phone = $('.phone').val();
			// Address.detailAddress = $('.detailAddress').val();
			var str = JSON.stringify(Address)
			sessionStorage.obj = str;
			$('#myModal').modal('hide')
		});


		// 回填数据
		var getSession = function(){
			var addressData = JSON.parse(sessionStorage.obj);
			return addressData;
		} 
		
		console.log(getSession())
		var addressData = getSession()
		if(addressData){
			$(".address-list").prepend('<div class="address-item active" style="margin: 20px 20px 0 0;width: 200px;float: left;padding: 5px 8px 2px;border: 3px dashed #ccc;cursor: pointer;height:95px;">'+ 
					'<div class="address-new" style="padding: 6px;text-align: center;color: #ccc;">'+
					'<div class="text" style="border-bottom:1px solid #ccc;">'+addressData["province"]+"  "+addressData["city"]+" "+addressData["detailAddress"]+'</div>'+
					 '<div class="text">'+addressData["username"]+" ("+addressData["phone"]+" 收)"+'</div></div><div class="opa"></div></div>');


		}

		$('.address-list .active').hover(function(){
			$(this).css('border-color',"red");
			$(this).children('.opa').empty().html('<a class="edit" href="javascript:;" style="margin-right:20px">修改</a><a href="javascript:;" class="remove">删除</a>')
		},function(){
			$(this).css('border-color',"#ccc");
			$(this).children('.opa').empty();
		})
		

		$('.edit').click(function(){
			// $('#myModal').modal('show')
			alert("123")
		})

	}
	return self;
})(ML.order||{});