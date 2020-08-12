class Food {
    constructor(){
       this.foodStock=0,
       this.lastFed;
       this.milkbottleimage=loadImage("Milk.png")
    }
   

   display(){
     var x= 80, y=50;
     imageMode(CENTER);
     //image(this.milkbottleimage,720,220,50,50);
     if(foodS!==0){
      for( var i=0;i<foodS; i++){
      if (i%10==0){
      x=80;
      y=y+50;
       }
      image(this.milkbottleimage,x,y,50,50);
       x=x+30;
        }
       }
     }

     updateFoodStock(x){
      if(x<=0){
        x=0;
      }
      else{
        x=x-1;
      }
      
      database.ref('/').update({
        foodStock:x
      })
   
    }
  
    getFedTime(x){
      fedTime=database.ref('FeedTime');
      fedTime.on("value",function (data){
        lastFed=data.val();
      })
      }

    getFoodStock(){
      database.ref('foodStock').on("value",function(data){
        foodS=data.val();
      })
      }
      bedroom(){
        imageMode(CENTER);
        background(bedroomimg,200,300);
      }
      garden(){
        imageMode(CENTER);
        background(gardenimg,200,300);
      }
      washroom(){
        imageMode(CENTER);
        background(washroomimg,200,300);
      }

   // (foodStock){
   //   this.foodStock = foodStock;
    //}
  //  getFedTime(lastFed){
  //    this.lastFed = lastFed
    //}
}