var cloud_group, trex_morto, cactis_grupo_da_bagunça, trex, trex_running, trex_die, edges, oic, nuvem, nuvemzinha, cactus, cactis1, cactis2, cactis3, cactis4, cactis5, cactis6, score = 0, End = 0, Start = 1, gameStats = "Play"/*Mais algumas variaveis*/, GmOvImg, RstImg, JumpSound, CheckPointSound, bleehSound;
var groundImage;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  nuvemzinha = loadImage("cloud.png");
  cactis1 = loadImage("obstacle1.png");
  cactis2 = loadImage("obstacle2.png");
  cactis3 = loadImage("obstacle3.png");
  cactis4 = loadImage("obstacle4.png");//testa.
  cactis5 = loadImage("obstacle5.png");
  cactis6 = loadImage("obstacle6.png");
  trex_die = loadAnimation("trex_collided.png");
  GmOvImg = loadImage("gameOver.png");
  RstImg = loadImage("restart.png");
  JumpSound = loadSound("jump.mp3");
  CheckPointSound = loadSound("checkPoint.mp3");
  blehSound = loadSound("die.mp3"); //estou perdida no seu código Heitor. Estou literalmente muito perdida. Meu deus, estou muito perdida. Eu estou perdida. Eu tô falando sério e vc está levando na brincadeira.
}
function setup(){
  createCanvas(600,200);
  edges = createEdgeSprites();
  trex = createSprite(50, 160, 5, 12.5);/*dá enter*/
  trex.scale = 0.6;/*dá enter e coloca lá*/
  trex.x = 50;
  trex.addAnimation("oi", trex_running);/*cria o ground*/
  trex.addAnimation("collide", trex_die)
  ground = createSprite(200, 180, 1000, 20);
  ground.addAnimation("io", groundImage);/*olha como a gente colocou a imagem do trex*/
  ground.x = ground.width/2;/*ai vai ser laaaaaaaaaaaa na linha 16*/
  oic = createSprite(200, 190, 400, 10);
  oic.visible = false;
  GmOverImg = createSprite(300, 100);
  GmOverImg.scale = 0.5;
  GmOverImg.addImage(GmOvImg);
  ResetImg = createSprite(300, 140);
  ResetImg.scale = 0.5;
  ResetImg.addImage(RstImg);
  trex_morto = createSprite(50, 160, 5, 12.5);/*dá enter*/
  trex_morto.scale = 0.6;/*dá enter e coloca lá*/
  trex_morto.x = 50;
  trex_morto.addAnimation("oh no", trex_die);/*cria o ground*/
  trex_morto.visible = false;
  trex.setCollider("circle", 0, 0, 40);//Ai tem muito trex, ai senhor do céu, tem muitos!!!!!!
  trex.debug = true;
  score = 0;
  gameStats = "PLAY";
  cloud_group = createGroup();
  cactis_grupo_da_bagunça = createGroup();
}
function draw(){//desce um pouquinho mais lá na função draw
  background("white");
  drawSprites();//para de comentar o código, se não vc vai ficar perdidaço.
  if(gameStats === "PLAY"){
    GmOverImg.visible = false;
    ResetImg.visible = false;
    if(keyDown("space") && trex.y >=150){
    trex.velocityY = -11;
    JumpSound.play();
  }
  if(ground.x < 0){
    ground.x = ground.width/2;/*ai vamos sempre ter solo*/
  }
  fill("black");
  stroke("black");
  text("Score:  " + score, 10, 10);
  score = score + Math.round(frameCount/100); /*tem que ser na função draw para acontecer o tempo todo*/
  hola_mi_amiga();
  hola_mi_amigo();
  console.log(frameCount);
  trex.velocityY = trex.velocityY + 0.7;
  trex.collide(edges);
  trex.collide(oic);
  score = score + Math.round(getFrameRate()/100);/*tem que ser na função draw para acontecer o tempo todo*/
  ground.velocityX = -(4+3*score/1000);/*na função draw para ser constante*/
  if(cactis_grupo_da_bagunça.isTouching(trex)){//deixa eu só me localizar aqui:(
    gameStats = "Fim";
    blehSound.play();
  }
  }
  else if(gameStats === "Fim"){//agora, lá no...
    trex.changeImage("collide", trex_die);
    GmOverImg.visible = true;
    ResetImg.visible = true;
    cloud_group.setVelocityXEach(0);
    cactis_grupo_da_bagunça.setVelocityXEach(0);
    trex.velocityY = 0;
    ground.velocityX = 0;
    if(mousePressedOver(ResetImg)){
    reset();
  }
  }
}/*dá enter e cria a função*/
function hola_mi_amiga(){
  if(frameCount%60 === 0){
    nuvem = createSprite(600, 100, 40, 10);
    nuvem.velocity.x = -10;
    nuvem.addAnimation("ip", nuvemzinha)/*funciona animation tambem*/
    nuvem.scale = 0.8;/*pode colocar o scale 0.4*/
    nuvem.y = Math.round(random(20, 60));
    nuvem.lifetime = 70;
    cloud_group.add(nuvem);
  }
}
function hola_mi_amigo(){
  if(frameCount%65 === 0){
    rondom = Math.round(random(1, 6));
    cactus = createSprite(600, 160, 7, 12.5);
    cactus.velocityX = -10;
    cactus.scale = 0.7;
    switch(rondom){
      case 1: cactus.addImage(cactis1);
      break
      case 2: cactus.addImage(cactis2);
      break
      case 3: cactus.addImage(cactis3);
      break
      case 4: cactus.addImage(cactis4);
      break
      case 5: cactus.addImage(cactis5);
      break
      case 6: cactus.addImage(cactis6);
      break
      default: break
    }
    cactus.lifetime = 70;
    cactis_grupo_da_bagunça.add(cactus);
  }
}
function reset(){
  gameStats = "PLAY";
  score = 0;
  trex.changeAnimation("oi", trex_running);
  cactis_grupo_da_bagunça.destroyEach();
  cloud_group.destroyEach();
}