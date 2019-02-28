'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const outputDirectory = config.build.assetsRoot
const backupDirectory = outputDirectory+'-backup'
const deltaDirectory = outputDirectory+'-delta'
const compressing = require('compressing')
const md5File = require('md5-file')
//const fs = require('fs')
const fs = require('fs-extra')

async function copyFiles (src, dest, cb) {
  try {
    if(fs.existsSync(dest)) {
      fs.removeSync(dest)
    }

    await fs.copy(src, dest)
    //console.log(chalk.yellow('开始压缩...\n'));
    cb && cb(src)
    //console.log(chalk.green('开始打包...\n'));
    //build();
  } catch (err) {
    console.error(err)
  }
}


if(fs.existsSync(outputDirectory)) {
  console.log(chalk.yellow('开始上一版本打包文件...\n'));
  copyFiles(outputDirectory, backupDirectory, build);
  
} else {
  console.log(chalk.red('不存在已经打包的文件...\n'));
  console.log(chalk.green('开始打包...\n'));
  build();
  //compare();
}

//打包
function build() {
  const spinner = ora('building for production...')
  spinner.start()
  rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err
    webpack(webpackConfig, (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n')
  
      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }
  
      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
      console.log(chalk.yellow('打包完成！\n'))
      console.log(chalk.red('增量打包处理中，请稍等...\n'))
      
      copyFiles(outputDirectory, deltaDirectory, compare);
    })
  })
}
//获取时间字符串
function getTimeString(){
  let now = new Date(),
      year = now.getFullYear(),
      month = now.getMonth()+1,
      day = now.getDate(),
      hour = now.getHours(),
      minute = now.getMinutes(),
      second = now.getSeconds(),
      milliseconds = now.getMilliseconds();
  //补零
  function fillZero(num) {
    return num < 10 ? '0' + num : num;
  }

  return year+ '-' +fillZero(month) + '-' + fillZero(day) + '-'+fillZero(hour) + fillZero(minute) + fillZero(second);
}

//压缩文件
function dir2zip(src) {
  let dest = src + '-backup-' + getTimeString() + '.zip';
  const zipStream = new compressing.zip.Stream();
  zipStream.addEntry(src);
  console.log(chalk.yellow('开始压缩...\n'))
  zipStream.on('error', err=>{
    console.log('压缩失败！')
    console.log(err)
  })
  .pipe(fs.createWriteStream(dest))
  .on('error', err=> {
    console.log('压缩失败2！')
    console.log(err)
  }).on('finish', ()=>{
    console.log(chalk.white('压缩文件成功！\n'));
    console.log(chalk.white('========================================================================\n'));
    console.log(chalk.green('压缩文件：' + dest + '\n'));
    console.log(chalk.white('========================================================================\n'));
    //build();
    
  });
}

//对比文件
function compareFile(fileOne, fileTwo) {
  const hashOne = md5File.sync(fileOne),
        hashTwo = md5File.sync(fileTwo);
  if(hashOne == hashTwo) {
    fs.unlink(fileOne, function(err) {
      if(err) {
        console.log(chalk.red('删除文件失败：' + hashOne + '\n'));
        console.log(err);
      } 
    })
  }
}
//对比文件夹内容
function compareDir(deltaDir, backupDir) {
  if(isDir(deltaDir)) {
    const files = fs.readdirSync(deltaDir)
    files.forEach(function(filename) {
      if(fs.existsSync(path.join(backupDir, filename))) {
        compareDir(path.join(deltaDir, filename), path.join(backupDir, filename))
      }
      
    })
    
  } else {
    compareFile(deltaDir, backupDir)
  }
}
//判断是不是文件夹
function isDir(path){
  return fs.existsSync(path) && fs.statSync(path).isDirectory();
}
//判断是不是文件
function isFile(path){
  return fs.existsSync(path) && fs.statSync(path).isFile();
}
//比较文件夹和备份当前最新版本
function compare() {
  console.log(chalk.yellow('开始文件对比...\n'))
  compareDir(deltaDirectory, backupDirectory)
  console.log(chalk.yellow('对比完成!\n'))
  console.log(chalk.yellow('正在备份当前完整版本!\n'))
  dir2zip(outputDirectory)
}