<template>
  <div id="app">
    <el-container>
      <el-header>CN Furikana Web</el-header>
      <el-main>
        <el-row :gutter="10">
          <el-col :span="4">选择标注方式 </el-col>
          <el-col :span="8">
            <el-select v-model="selectedMode" placeholder="请选择">
              <el-option
                v-for="item in displayModes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">请输入要标注的内容</el-col>
          <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="inputContent" clearable>
            </el-input>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">或者</el-col>
          <el-col :span="8">
            <el-upload
              class="upload-demo"
              action="/"
              ref="upload"
              accept=".txt"
              :before-upload="beforeUpload"
              :disabled="this.fileList.length !== 0"
              :default-file-list="this.fileList"
              drag
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将txt文件拖到此处，或<em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传txt文件</div>
            </el-upload>
          </el-col>
        </el-row>
        <el-button type="danger" round v-on:click="clear">清空</el-button>
        <furikana-display :content="content" :displayMode="selectedMode" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import FurikanaDisplay from "./components/FurikanaDisplay.vue";

export default {
  name: "App",
  components: {
    FurikanaDisplay,
  },
  data() {
    return {
      inputContent: "",
      fileContent: "",
      fileList: [],
      displayModes: [
        {
          value: 0,
          label: "标注片假名和箭头音调",
        },
        {
          value: 1,
          label: "标注片假名",
        },
        {
          value: 2,
          label: "标注带音调拼音",
        },
        {
          value: 3,
          label: "标注无音调拼音",
        },
      ],
      selectedMode: 0,
    };
  },
  beforeCreate() {
    // 读取文件
    FileReader.prototype.reading = function({ encode }) {
      let bytes = new Uint8Array(this.result); //无符号整型数组
      let text = new TextDecoder(encode || "UTF-8").decode(bytes);
      return text;
    };
    /* 重写readAsBinaryString函数 */
    FileReader.prototype.readAsBinaryString = function(f) {
      if (!this.onload)
        //如果this未重写onload函数，则创建一个公共处理方式
        this.onload = () => {
          //在this.onload函数中，完成公共处理
          let rs = this.reading();
          console.log(rs);
        };
      this.readAsArrayBuffer(f); //内部会回调this.onload方法
    };
  },
  methods: {
    beforeUpload(file) {
      this.fileList = [file];
      console.log("选择了文件beforeUpload");
      // 读取数据
      this.read(file);
      return false;
    },
    read(f) {
      let rd = new FileReader();
      rd.onload = () => {
        //this.readAsArrayBuffer函数内，会回调this.onload函数。在这里处理结果
        let cont = rd.reading({ encode: "UTF-8" });
        console.log(cont);
        let formerData = this.textData;
        this.fileContent = formerData + "\n" + cont;
      };
      rd.readAsBinaryString(f);
    },
    clear() {
      console.log("cleared");
      this.fileContent = "";
      this.inputContent = "";
    }
  },
  computed: {
    content() {
      if (this.fileContent != null && this.fileConten != "") {
        return this.fileContent;
      }
      if (this.inputContent != null && this.inputConten != "") {
        return this.inputContent;
      }
      return "";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: left;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
}

.el-row el-col {
  vertical-align: middle;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
</style>
