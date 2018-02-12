var app=new Vue({
	el:"#app",
	data:{
		lv:99,
		str:1,
		agi:1,
		vit:1,
		luk:1,
		dex_eq:0,
		int_eq:0,
		dex_cd:0,
		int_cd:0,
		list99:[]
	},
	methods:{
		refresh:function (evt){
			var st=new status();
			st.str=this.str;
			st.agi=this.agi;
			st.vit=this.vit;
			st.luk=this.luk;
			var r;
			st.lv=this.lv;
			st.dex=99;
			var A=[];
			for(st.int=1;st.int<=99 && fitDex();++st.int)
			{
				if(A.length==0 || A[A.length-1].dex!=st.dex)
					A.push({dex:st.dex,int:st.int});
				else
					A[A.length-1].int=st.int;
			}
			A.forEach(function (v,i,arr){
				var dmg=(Math.floor((this.dex_eq+v.dex+20)*1.12)+this.dex_cd)*(3.99)*(1+(this.int_eq+this.int_cd+v.int+4)/35)*5;
				arr[i].dmg=Math.round(dmg*0.9)+"～"+Math.round(dmg*1.1);
				arr[i].avg=dmg;
			},this);
			A.sort(function(a,b){
				return b.avg-a.avg;
			});
			this.list99=A;
			function fitDex()
			{
				for(;st.dex>=1 && st.getRest()<0;--st.dex);
				if(st.dex<1)
					return false;
				else
					return true;
			}
		},
		sortByDex:function(evt){
			this.list99.sort(function (a,b){
				return b.dex-a.dex;
			});
		},
		sortByInt:function(evt){
			this.list99.sort(function (a,b){
				return b.int-a.int;
			});
		},
		sortByDmg:function(evt){
			this.list99.sort(function (a,b){
				return b.avg-a.avg;
			});
		}
	},
	computed:{
		restpoint:function (){
			var st=new status();
			st.lv=this.lv;
			st.str=this.str;
			st.agi=this.agi;
			st.vit=this.vit;
			st.int=this.luk;
			st.dex=1;
			st.luk=1;
			return st.getRest();
		}
	}
});
