const slice = Array.prototype.slice;
 class SyncHook{
    constructor(args) {
        this.args= args;
        this.taps=[];
    }
    tap(name,fn) {
        this.taps.push(fn);
    }
    call() {
        this.taps.forEach(fn=>fn(...slice.call(arguments,0,this.args.length)));
    }
} 


/* 
为什么不是直接…arguments 

还要用slice方法截取
  */