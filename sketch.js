let table; // 用于存储CSV数据的变量
let typeData = []; // 存储Type列的数组
let typeID = []; // 存储Type列的数组
let dayData = []; // 存储Day列的数组
let timeData = []; // 存储Time列的数组
let kalData = []; // 存储Kal列的数组
let likeData = []; // 存储Kal列的数组
let maxKal; // 存储Kal数据的最大值

let currentIndex = 0; // 当前数据索引
let animationSpeed = 2; // 动画速度

let bubbleTime = [];
let bubbleKal = [];
let bubbleLike = [];
let imageAll = [];
function preload() {
  // 使用p5.js的loadTable()函数加载CSV文件
  table = loadTable("kalData.csv", "csv", "header");
  imageAll.push(loadImage("image/badminton.png"));
  imageAll.push(loadImage("image/bicycle.png"));
  imageAll.push(loadImage("image/hiking.png"));
  imageAll.push(loadImage("image/run.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB,360,100,100,100);
  // 循环遍历CSV文件的每一行，并将四个列的数据存储到数组
  for (let row of table.rows) {
    typeData.push(row.get("Type"));
    if (row.get("Type") === "Badminton") {
      typeID.push(0);
    } else if (row.get("Type") === "Bicycle") {
      typeID.push(1);
    } else if (row.get("Type") === "Hiking") {
      typeID.push(2);
    } else if (row.get("Type") === "Run") {
      typeID.push(3);
    }
    dayData.push(row.get("Day"));
    timeData.push(row.get("Time"));
    kalData.push(Number(row.get("Kal"))); // 将Kal数据转换为数字类型
    likeData.push(Number(row.get("Wechat_likes"))); // 将Kal数据转
  }

  // 打印数组数据到控制台
  console.log("Type ID:", typeID);
  console.log("Type Data:", typeData);
  console.log("Day Data:", dayData);
  console.log("Time Data:", timeData);
  console.log("Kal Data:", kalData);
  console.log("like Data:", likeData);
  for (let i = 0; i < imageAll.length; i++) {
    imageAll[i].resize(50,50);
  }

  let maxTime = max(timeData);
  let minTime = min(timeData);
  for (let i = 0; i < typeData.length; i++) {
    bubbleTime.push(new Bubble(minTime,maxTime , timeData[i], typeID[i],2));
  }
  
  
  let maxKal = max(kalData);
  let minKal = min(kalData);
  for (let i = 0; i < typeData.length; i++) {
    bubbleKal.push(new Bubble(minKal,maxKal , kalData[i], typeID[i],0));
    print(minKal,maxKal , kalData[i], typeID[i]);
  }
  
  let maxLike = max(likeData);
  let minLike = min(likeData);
  for (let i = 0; i < typeData.length; i++) {
    bubbleLike.push(new Bubble(minLike,maxLike , likeData[i], typeID[i],1));
    print(minLike,maxLike , likeData[i], typeID[i]);
  }
  // 设置动画速度
  frameRate(10);
  textAlign(CENTER,CENTER);
}
let showIndex = 0;
function draw() {
  background(255);
  noStroke();
  fill(0);
  textSize(20);
  text("click to change sort index",width/2,100);
  fill(255,100,100);
  rectMode(CENTER);
  rect(width-120,100,220,50,10);
  if (showIndex == 0) {
    fill(10,100,100);
    textSize(20);
    text("sort by Kal",width-120,100);
    for (let i = 0; i < bubbleKal.length; i++) {
      bubbleKal[i].move();
      bubbleKal[i].draw();
    }
  } else if(showIndex==1){
    fill(10,100,100);
    textSize(20);
    text("sort by wechat_likes",width-120,100);
    for (let i = 0; i < bubbleLike.length; i++) {
      bubbleLike[i].move();
      bubbleLike[i].draw();
    }
  }else if(showIndex==2){
    fill(10,100,100);
    textSize(20);
    text("sort by time consume",width-120,100);
    for (let i = 0; i < bubbleTime.length; i++) {
      bubbleTime[i].move();
      bubbleTime[i].draw();
    }
  }
}
function mouseReleased(){
  showIndex+=1;
  if(showIndex>2){
    showIndex=0;
  }
}
class Bubble {
  constructor(minId, maxId, data, imageId,showID) {
    this.showID = showID;
    this.maxId = maxId;
    this.minId = minId;
    this.data = data;
    this.imageId = imageId;
    this.size = map(data, this.minId, this.maxId, 100, 200);
    this.x=random(this.size,width-this.size);
    this.y=random(this.size,height-this.size);
    this.velX=random(3,6);
    this.velY=random(3,6);
    if(random(1)<0.5){
      this.velX=-this.velX;
    }
    if(random(1)<0.5){
      this.velY=-this.velY;
    }
    this.col=color(map(data, this.minId, this.maxId, 10, 100),100,100,40);
    print(this.size);
  }
  draw() {
    fill(this.col);
    ellipse(this.x,this.y,this.size,this.size);
    imageMode(CENTER);
    image(imageAll[this.imageId],this.x,this.y);
    fill(0);
    textSize(20);
    if(this.showID==0){
      text(this.data+"kal",this.x,this.y-this.size/4);
    }else if(this.showID==1){
      text("❤️"+this.data,this.x,this.y-this.size/4);
    }else{
      text("⏰"+this.data+"h",this.x,this.y-this.size/4);
    }
  }
  move() {
    this.x+=this.velX;
    this.y+=this.velY;
    if(this.x<this.size/2 || this.x>width-this.size/2){
      this.velX=-this.velX;
    }
    if(this.y<this.size/2 || this.y>height-this.size/2){
      this.velY=-this.velY;
    }
  }
}
