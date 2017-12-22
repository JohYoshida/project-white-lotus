console.log ("starting");
var Jimp = require("jimp");

// open a file called "lenna.png"
let img1 = './parts/RKRH.png';
let img2 = './parts/RKB.png';
let img3 = './parts/RKLH.png';
let img4 = './parts/RKH.png'
let arr = [img1,img2,img3,img4];
const uuidv1 = require('uuid/v1');
function composeSS(x,y){
  return new Promise((resolve,reject)=>{
  Jimp.read(x).then(function (im1) {
        console.log("In SS");
        Jimp.read(y).then(function(im2){
          im1.composite(im2,0,0);
          resolve(im1);
        });
    }).catch(function (err) {
        console.error(err);
        reject(err);
    });
  });
}
function composeIS(img,str){
  return new Promise((resolve,reject)=>{
    console.log("In SS");
    Jimp.read(str).then(function(im2){
      img.composite(im2,0,0);
      resolve(img);
    }).catch(function (err) {
        console.error(err);
        reject(err);
    });
  });
}
function mash(arr,index,img){
  return new Promise((resolve,reject)=>{
    if(index>=arr.length){
      resolve(img);
    }else{
      composeIS(img,arr[index]).then(function(r1){
        mash(arr,index+1,r1).then(function(r2){
          resolve(r2);
        });
      });
    }
  });
}

const monsterMash= (arr)=>{
  return new Promise((resolve,reject)=>{
    if(arr.length===1){
      Jimp.read(arr[0]).then(function(r1){
         let x = uuidv1();
          r2.write("${x}.png");
          resolve("${x}.png");
      });
    }else{
      composeSS(arr[0],arr[1]).then(function(r1){
        mash(arr,2,r1).then(function(r2){
          let x = uuidv1();
          r2.write("${x}.png");
          resolve("${x}.png");
        });
      });
    }
  });
}
module.exports={monsterMash};