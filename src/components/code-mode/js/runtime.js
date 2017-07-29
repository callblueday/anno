const IntervalBetweenSteps = 0;

class Runtime {
  constructor(props) {
    this.onFinish = null;
    this.highlightPause = false;
    this.stepTimer = null;
    this.isFinished = false;
    this.nextStepDelay = MBlockly.Runtime.IntervalBetweenSteps;
    this.topBlockID = 0;
    this.widgetId = id ? id : null;

    this.OPEN_HIGHLIGHT = true;
  }

  highlightBlock (id) {
    if(this.OPEN_HIGHLIGHT) {
      // when 代码块不进行高亮
      if(id != this.topBlockID){
        workspace.highlightBlock(id);
      }
      this.highlightPause = true;
    }
  }

  print (msg){
    document.getElementById('log').childNodes[0].nodeValue = msg;
  }

  doInterpreter (code) {
    this.evalCodeViaJsInterpreter(code);
  }

  parseCode (startBlock){
    // Generate JavaScript code and parse it.
    var code;

    // Highlight code
    if(this.OPEN_HIGHLIGHT) {
      Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
      Blockly.JavaScript.addReservedWords('highlightBlock');
    }

    if(startBlock){
      Blockly.JavaScript.init(workspace);
      code = Blockly.JavaScript.blockToCode(startBlock);
      if(typeof code == "object") {
        code = code[0] + ";";
      }
      code = Blockly.JavaScript.finish(code);
    }
    else{
      // 没有顶部 block 块的代码生成，实际就是对整个 workspace 的代码进行生成.
      code = Blockly.JavaScript.workspaceToCode(workspace);
    }

    this.topBlockID = startBlock ? startBlock.id : 0;

    code = code.split("window.alert").join("print");
    var array = code.split("\n");
    for (var i = 0; i < array.length; i++) {
      var c = array[i];
      if (c.indexOf("getSensorValue") > -1) {
        var split = "getSensorValue" + c.split("getSensorValue")[1].split(")")[0] + ")";
        var output = split + ";\n"+c.split(split).join("getResponseValue()") + "\n" ;
        code = code.split(c).join(output);
      }
    }
    return code;
  }

  /**
   * 用 JS Interpreter 来执行编译后的 js 代码块
   * @param  {string} code 编译后的 js 代码块
   */
  evalCodeViaJsInterpreter (code) {
    // 注册 block 块对应的方法
    this.interpreter = new Interpreter(code, this.initApi);
    this.interpreter.runtime = this;
    if(this.OPEN_HIGHLIGHT) {
      this.highlightPause = false;
      workspace.traceOn(true);
      workspace.highlightBlock(null);
    }
    // 分步解析代码块
    this.step();
  }

  step () {
    var that = this;
    if(this.isFinished) {
      return;
    }
    if(this.isPaused && !this.isFinished){
      return;
    }
    try{
      if(this.interpreter.step()){
        var delay = this.nextStepDelay;
          // 当设置了 wait 以后，记得还原正常nextStep的值
          this.nextStepDelay = IntervalBetweenSteps;
          this.stepTimer = setTimeout(function() {
            that.step();
          }, delay);
        }
      else{   // the program is done
        this.callback && this.callback();
        if(this.onFinish){
          this.stop();
        }
      }
    }
    catch (err){
      console.log("【error】" + err);
      if(err == 'BleDisconnected'){
        this.stop();
      }
    }
  }

  wait (time){
    this.nextStepDelay = time * 1000;
  }

  pause (){
    if(this.stepTimer){
      clearTimeout(this.stepTimer);
    }
    this.isPaused = true;
  }

  resume (){
    this.isPaused = false;
    this.step();
  }

  stop (){
    this.pause();
    this.isFinished = true;
  }

  initApi (interpreter, scope) {
    // Add an API function for the alert() block.
    var wrapper = function(text) {
      text = text ? text.toString() : '';
      return interpreter.createPrimitive(alert(text));
    };
    interpreter.setProperty(scope, 'alert',
      interpreter.createNativeFunction(wrapper));

    // Add an API function for the prompt() block.
    var wrapper = function(text) {
      text = text ? text.toString() : '';
      return interpreter.createPrimitive(prompt(text));
    };
    interpreter.setProperty(scope, 'prompt',
      interpreter.createNativeFunction(wrapper));

    // Add an API function for highlighting blocks.
    var wrapper = function(id) {
      id = id ? id.toString() : '';
      return interpreter.createPrimitive(interpreter.runtime.highlightBlock(id));
    };
    interpreter.setProperty(scope, 'highlightBlock',
      interpreter.createNativeFunction(wrapper));

    // Add an API function for wait blocks.
    var wrapper = function(d) {
      return interpreter.createPrimitive(interpreter.runtime.wait(d));
    }
    interpreter.setProperty(scope, 'wait', interpreter.createNativeFunction(wrapper));

    // Add API function for other customize blocks defined in blocks_*.js
    var keepedBlocks = MBlockly.BlockKeeper.getBlocks();
    var that = this;
    for(var blockName in keepedBlocks) {
      var block = keepedBlocks[blockName];
      (function(block){
        // 注册block块的代码
        var wrapper = function(){
          // 实现的是runtime调用block块中定义的方法, interpreter中会有方法来触发这些方法
          return interpreter.createPrimitive(block.handler.apply(interpreter.runtime, arguments));
        }
        interpreter.setProperty(scope, block.funcName, interpreter.createNativeFunction(wrapper));
      })(block);
    }
  }
}

exports default Runtime;