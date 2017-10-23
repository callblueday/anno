import BlockBuilder from './block-builder';

export default class ControlBlocks {
  constructor() {
    this.crateBlocks();
  }

  crateBlocks() {
    Blockly.Blocks['wait'] = {
      init: function() {

        this.jsonInit({
          "message0": '等待 %1 秒',
          "args0": [{
            "type": "input_value",
            "name": "DELAY",
            "check": "Number"
          }],
          "previousStatement": true,
          "nextStatement": true,
          "colour": Blockly.Blocks.loops.HUE,
          "tooltip": '',
          "helpUrl": ''
        });
      }
    };

    Blockly.JavaScript['wait'] = function(block) {
      var code;
      var delay = Blockly.JavaScript.valueToCode(block, 'DELAY', Blockly.JavaScript.ORDER_COMMA);
      // TODO: Assemble JavaScript into code variable.
      if (typeof(delay) == 'string') {
        // as it is varaible
        code = 'wait(' + delay + ');\n';
      } else {
        code = 'wait(' + Math.floor(delay) + ');\n';
      }
      return code;
    };

    /**
     * repeat forever
     */
    Blockly.Blocks['controls_repeat_forever'] = {
      /**
       * Block for repeat n times (internal number).
       * @this Blockly.Block
       */
      init: function() {
        this.setColour(Blockly.Blocks.loops.HUE);
        this.appendStatementInput('DO')
          .appendField('重复执行');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
      }
    };

    Blockly.JavaScript['controls_repeat_forever'] = function(block) {
      // Repeat n times (internal number).
      var branch = Blockly.JavaScript.statementToCode(block, 'DO');
      branch = Blockly.JavaScript.addLoopTrap(branch, block.id);
      var code = 'while (true) {\n' +
        branch + '}\n';
      return code;
    };
  }

}
