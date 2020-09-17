var dog,happydog,database,food_stalk,foods,dog_base//Create variables here
var food_object,feed_but,add_butvar, food_image;
var g;
function preload()
{
  dog=loadImage("dog.png")
  happydog=loadImage("happy dog.png")
   food_image=loadImage("Milk.png")//load images here
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database()
  dog_base=createSprite(400,400,50,50)
  dog.resize(90,90)
  happydog.resize(90,90)
  function timeIt()
  {
    dog_base.addImage(dog)
    g=1

  }
  setInterval(timeIt,3600*1000)
  
  dog_base.addImage(dog)
  food_stalk=database.ref('Food')
  food_stalk.on("value",readData);
  food_object=new food()
  feed_but=createButton("feed the pet")
  feed_but.position(displayWidth/2-300,displayHeight/2-350)
  add_but=createButton("add food for him")
  add_but.position(displayWidth/2-200,displayHeight/2-350)

  
  
}


function draw() { 
  background("green")
  var x=80,y=100;
   // image(food_image,220,200,20,20)
    
    imageMode(CENTER);
    if(foods!=0){
          for(var i=0;i<=foods;i++){
            if(i%10===0){
              x=80;
              y=y+50;
            }
            image(food_image,x,y,50,50);
            x=x+30;
            console.log("display enterd")
          }
        }



 
  this.feed_but.mousePressed(()=>{
    writeStroke(foods)
    dog_base.addImage(happydog)
  })
  this.add_but.mousePressed(()=>{
    increaseFood()
  })
  

  food_object.display();

  drawSprites();
  textSize(20)
  fill(255)
  text("food remaning: "+foods,100,100)
  //add styles here

}
function readData(data)
{
  foods=data.val()
}
function writeStroke(x)
{
  if (foods<=0)
  {
    x=0
  }
  else 
  x=x-1
  

  database.ref('/').update(
    {
      Food:x

    }
  )
}
function increaseFood()
{
  foods=foods+1
}





