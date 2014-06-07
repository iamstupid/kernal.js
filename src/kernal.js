//client
var kernaljs;
(function() {
	var kernal = {};
	kernal.module = plotjs.module ? plotjs.module.mbind(window.kernaljs) : (function(name, module) {
		module.call(kernaljs);
	});
	kernal.module('kernaljs', function() {
		//module define
		this.kernals=function(url,number){
			this.kernals=new Array(number);
			this.kernalsWork=new Array(number);
			this.pushTask=function(mapper,reducer,workingParts,done){
				this.tasks.push(new task(mapper,reducer))
			}
			this.processOnMessage=function(e){
				var d=e.data,tid=d.taskId,wid=d.kernalId;
				this.kernalWork[wid]=false;
				this.recData[tid][d.workId]=d.dataRec;
				this.status[tid]++;
				this.kernalPushTask(e.kernalId);
				if(this.status[tid]==this.tasks[tid].workingKernals){
					//done job
					this.tasks[tid].done(this.reduce(this.recData));
				}
			}
			this.recData=[];
			this.tasks=[];
			this.status=0;
			for(var i=0;i<number;i++){
				this.kernals[i]=new Worker(url);
				//make workers
				this.kernals[i].onmessage=this.processOnMessage;
				//associate onmessage
				this.kernals[i].postMessage({type:"initial",kernalId:i});
				//generate a unique worker ID(@least in this kernals class)
				this.kernalsWork=false;//not working
			}
		}
	});

})();