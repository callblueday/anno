/**
 * @fileOverview handles data operations.
 */
class Storage {

  constructor() {
    // 用于存储项目数据
    this.storageKey = 'MyProjectData';
    // 用于返回前项目的自动保存
    this.stashedWorkspaceId = "HelloToWork";
    window.storeList = this.storeList = [];

    this.currentProjectId = null;

    // 用于存储用户项目数据
    this.loadProjects();
  }

  fetchData() {
    return this.storeList;
  }

  // 存储当前项目
  saveProject(data) {
    console.log('save successfully')
  }

  // 加载指定项目
  loadProjectById(id) {
    for (var i in this.storeList) {
      var item = this.storeList[i];
      if (item.id == id) {
        this.clearWorkspace();
        var xml = item.xmlData;
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(xml), workspace);
        this.storeList[i].time = new Date().getTime();
        this.save();
      }
    }
  }

  // 将当前工作区保存到栈中
  stashWorksapce(id, projectHasBeenSaved) {
    console.log('stash workspace');
    var data = {};
    var item = this.getProjectById(id) || {};
    data.id = item.id;
    data.name = item.name;
    data.saved = projectHasBeenSaved;
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    data.xmlData = Blockly.Xml.domToText(xml);
    data.time = new Date().getTime();
    var result = JSON.stringify(data);
    window.localStorage[this.stashedWorkspaceId] = result;
  }

  // 将栈中保存的状态恢复到工作区
  resumeWorkspace(callback) {
    // console.log('resume workspace');
    // var dataString = window.localStorage[this.stashedWorkspaceId];
    // if(dataString && JSON.parse(dataString)) {
    //   var data = JSON.parse(dataString);
    //   callback && callback(data);
    // }else{
    //   BlocklyService.renderPresetBlocks(MBlockly.Settings.DEFAULT_PRESET_BLOCK);
    // }
  }

  /**
   * generate an id for current project.
   * @return {[type]} [description]
   */
  generateId(name) {
    var id = name + new Date().getTime();
    return id;
  }

  /**
   * add a project to store.
   */
  add(name, callback) {
    var data = {};
    var id = this.generateId(name);
    console.log('add project: ' + id);

    data.id = id;
    data.name = name;
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    data.xmlData = Blockly.Xml.domToText(xml);
    data.time = new Date().getTime();
    this.storeList.unshift(data);
    this.save();

    this.showTip('success', '保存成功');
    return id;
  }

  /**
   * delete a project.
   */
  delete(id, callback) {
    console.log('delete：' + id);

    var dataArray = this.storeList;
    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i].id == id) {
        if (isNaN(i) || i > this.storeList.length) {
          return false;
        }
        this.storeList.splice(i, 1);
        this.save();
        callback && callback();
        break;
      }
    }
  }

  reName(id, newName) {
    for (var i = 0; i < this.storeList.length; i++) {
      if (this.storeList[i].id == id) {
        if (isNaN(i) || i > this.storeList.length) {
          return false;
        }
        this.storeList[i].name = newName;
        this.save();
        break;
      }
    }
  }

  /**
   * [checkRepeatName description]
   * @param  {string} name [description]p
   * @return {[type]}      [description]
   */
  isProjectNameRepeat(id, name) {
    for (var i = 0; i < this.storeList.length; i++) {
      if (this.storeList[i].name == name && this.storeList[i].id != id) {
        return true;
      }
    }
    return false;
  }

  /**
   * update a project.
   */
  update(id, callback) {
    console.log('update：' + id);

    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlData = Blockly.Xml.domToText(xml);

    for (var i = 0; i < this.storeList.length; i++) {
      if (this.storeList[i].id == id) {
        if (isNaN(i) || i > this.storeList.length) {
          return false;
        }
        this.storeList[i].xmlData = xmlData;
        this.storeList[i].time = new Date().getTime();
        this.save();
        callback && callback();

        break;
      }
    }
  }

  /**
   * duplicate a project.
   */
  duplicate(id) {

  }

  /**
   * get one project by id.
   * @param  {number} id project's id.
   * @return {object}   the query project data.
   */
  getProjectById(id) {
    var data = null;
    for (let item of this.storeList) {
      if (item.id == id) {
        data = item;
        return data;
      }
    }
    return data;
  }

  /**
   * featch all data.
   */
  loadProjects() {
    if (typeof projectFile != 'undefined') {
      this.loadProjectsFromFiles();
    } else {
      this.loadProjectsFromLocalStorage();
    }
  }

  save() {
    if (typeof projectFile != 'undefined') {
      this.saveToFiles();
    } else {
      this.saveToLocalStorage();
    }
  }

  clearWorkspace() {
    Blockly.mainWorkspace.clear();
  }


  /* 存放数据在localstorage */
  saveToLocalStorage() {
    var result = JSON.stringify(this.storeList);
    window.localStorage[this.storageKey] = result;
  }

  loadProjectsFromLocalStorage() {
    var dataString = null;
    try {
      dataString = window.localStorage[this.storageKey];
    } catch (e) {

    }
    if (dataString && JSON.parse(dataString).length) {
      this.storeList = JSON.parse(dataString);
    } else {
      this.storeList = [
        {
          'xmlData': '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="when_start" id="@fiknb:[[;iHSVP%1rqe" x="65" y="23"><next><block type="move_axis" id="|~5!M)(Q=A9r{E8j#^O."><field name="AXIS">A</field><value name="ANGLE"><shadow type="math_number" id="NSVbe#KsK#Z.%H{{ugv#"><field name="NUM">10</field></shadow></value><value name="SPEED"><shadow type="math_number" id="!Lv$@;}/m(MuvWwu+Cgs"><field name="NUM">1000</field></shadow></value></block></next></block></xml>',
          'name': 'project1',
          'time': '1479975175671',
          'id': '6'
        }
      ];
    }
    return this.storeList;
  }

  /* 存放数据在文件系统 */
  saveToFiles() {
    console.log('save files');
    var result = JSON.stringify(this.storeList);
    projectFile.save(result, function(status) {
      console.log('保存成功');
    });
  }

  loadProjectsFromFiles() {
    var that = this;
    projectFile.load(function(status, result) {
      if (result && JSON.parse(result).length) {
        that.storeList = JSON.parse(result);
        console.log('load data from files');
      }
    });
  }

  showTip (msg) {

  }

}

const storage = new Storage();
export default storage;
