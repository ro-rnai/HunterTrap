function status()
{
	this.lv=1;
	this.trans=false;
	this.str=1;
	this.agi=1;
	this.vit=1;
	this.int=1;
	this.dex=1;
	this.luk=1;
	this.str_ex=0;
	this.agi_ex=0;
	this.vit_ex=0;
	this.int_ex=0;
	this.dex_ex=0;
	this.luk_ex=0;
	
	//計算梯形級數
	var getSum=function (x,a,m,d) //x>0,
	{
		var n=((x-1)/m|0);
		return (2*a*m+(n-1)*m*d)*n/2+((x-1)%m+1)*(a+d*n);
	}
	//取得素質點到多少的點數消耗
	var getCost=function (statusValue)
	{
		var n;
		if(statusValue>100)
			return 639+getSum(statusValue-100,16,5,4);
		if(statusValue<1)
			return 0;
		return getSum(statusValue-1,2,10,1);
	}
	//取得該等級的所有素質點數
	this.getTotal=function()
	{
		basePoint=this.trans?100:48;
		if(this.lv==1)
			return basePoint;
		if(this.lv<=100)
			return basePoint+getSum(this.lv,3,5,1)-3;
		if(this.lv<=150)
			return basePoint+1247+getSum(this.lv-100,23,10,1);
		return basePoint+2497+getSum(this.lv-150,28,7,1);
	}
	//以下為計算結果函式
	this.getAutoLevel=function (minLv,maxLv)
	{
		var k=getCost(this.str)+getCost(this.vit)+getCost(this.int)
		     +getCost(this.agi)+getCost(this.dex)+getCost(this.luk);
		for(this.lv=minLv;this.lv<maxLv && this.getTotal()<k;++this.lv);
		return this.lv;
	}
	this.getRest=function()
	{
		return this.getTotal()-getCost(this.str)-getCost(this.vit)-getCost(this.int)
		                      -getCost(this.agi)-getCost(this.dex)-getCost(this.luk);
	}
	this.getAtk=function (rangedWeapon)
	{
		if(rangedWeapon)
			return Math.floor(this.lv/4+this.dex+this.dex_ex+(this.luk+this.luk_ex)/3+(this.str+this.str_ex)/5);
		return Math.floor(this.lv/4+this.str+this.str_ex+(this.luk+this.luk_ex)/3+(this.dex+this.dex_ex)/5);
	}
	this.getDef=function ()
	{
		return Math.floor((this.vit+this.vit_ex+this.lv)/2+((this.agi+this.agi_ex)/5));
	}
	this.getMatk=function ()
	{
		return Math.floor(this.lv/4)+Math.floor((this.int+this.int_ex)*1.5)+Math.floor((this.dex+this.dex_ex)/5)+Math.floor((this.luk+this.luk_ex)/3);
	}
	this.getMdef=function ()
	{
		return Math.floor(this.int+this.int_ex+this.lv/4+(this.dex+this.dex_ex+this.vit+this.vit_ex)/5);
	}
	this.getHit=function ()
	{
		return 175+Math.floor(this.dex+this.dex_ex+this.lv+(this.luk+this.luk_ex)/3);
	}
	this.getFlee=function ()
	{
		return 100+Math.floor(this.agi+this.agi_ex+this.lv+(this.luk+this.luk_ex)/5);
	}
	this.getCri=function ()
	{
		return 1+Math.floor((this.luk+this.luk_ex)/3);
	}
	this.getLukFlee=function ()
	{
		return 1+Math.floor((this.luk+this.luk_ex)/10);
	}
	this.getCastReduce=function ()
	{
		return Math.sqrt((this.dex+this.dex_ex)/265+(this.int+this.int_ex)/530);
	}
	this.getNoCast=function ()
	{
		return 265-(this.dex+this.dex_ex+(this.int+this.int_ex)/2);
	}
	this.getAspd=function (mode,right,left,speedUp200,speedAdd200,speedUp195,speedAdd195)
	{//mode=0 一般 mode=1 弓 mode=2 雙刀
		var aspd,f1,f2;
		if(mode==0)
		{
			f1=10.09;
			f2=(right<145?1:1-(right-144)/50);
		}
		else if(mode==1)
		{
			f1=10;
			f2=(right<145?1:1-(right-144)/50);
		}
		else
		{
			f1=10.01
			f2=1.04518;
		}
		aspd=right-(194-left)/4+Math.sqrt(f1*(this.agi+this.agi_ex)+11/60*(this.dex+this.dex_ex))*f2;
		aspd=aspd+(200-aspd)*speedUp200+speedAdd200;
		aspd=aspd+(195-aspd)*speedUp195+speedAdd195;
		return aspd;
	}
	this.get193=function (mode,right,left,speedUp200,speedAdd200,speedUp195,speedAdd195)
	{
		var aspd,f1,f2;
		if(mode==0)
		{
			f1=10.09;
			f2=(right<145?1:1-(right-144)/50);
		}
		else if(mode==1)
		{
			f1=10;
			f2=(right<145?1:1-(right-144)/50);
		}
		else
		{
			f1=10.01
			f2=1.04518;
		}
		aspd=(193-speedAdd195-195*speedUp195)/(1-speedUp195);
		aspd=(aspd-speedAdd200-200*speedUp200)/(1-speedUp200);
		aspd=(aspd-right+(194-left)/4)/f2;
		aspd=aspd*aspd-f1*(this.agi+this.agi_ex)-11/60*(this.dex+this.dex_ex);
		return [aspd/f1,aspd*60/11];
	}
}







