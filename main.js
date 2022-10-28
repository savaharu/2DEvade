//  キャンバスの取得
let can = document.getElementById('can');
let con = can.getContext('2d');

//  仮想画面の作成
let vcan = document.createElement('canvas');
let vcon = vcan.getContext('2d');

//  画面サイズ
const SCREEN_SIZE_W = 1500;
const SCREEN_SIZE_H = 700;

//  キャンバス情報
can.width = SCREEN_SIZE_W;
can.height = SCREEN_SIZE_H;

//  仮想画面情報
vcan.width = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

//  フレーム
let frameCount = 0;

//  player座標
let box_x_1 = SCREEN_SIZE_W/2;
let box_y_1 = SCREEN_SIZE_H/2;

let box_x_2 = SCREEN_SIZE_W/2;
let box_y_2 = SCREEN_SIZE_H/3;

//  キーボード
let keyb = {};

//  ゲームモードが正しいか
let isIncorrectGamemode = true;

//  ゲームモード
let gamemode;

//  結果判定用連想配列
let result = {};

//  プレイヤー1
let player_1;

//  プレイヤー2
let player_2;

//  プレイヤー生成
function gamemodeCheck(gamemode) {
    //  player誕生
    if(gamemode == 1) {
        player_1 = new Box(gamemode, box_x_1, box_y_1, 50, 50);
    }
    else if(gamemode == 2) {
        player_2 = new Box(gamemode, box_x_2, box_y_2, 50, 50);
    }
    else if(gamemode == 3) {
        player_1 = new Box(gamemode-2, box_x_1, box_y_1, 50, 50);
        player_2 = new Box(gamemode-1, box_x_2, box_y_2, 50, 50);
    }
    else if(gamemode == 4) {
        //  pvp
        player_1 = new Box(gamemode-3, box_x_1, box_y_1, 50, 50);
        player_2 = new Enemy(200, 50);
    }
}

//  敵誕生
let num = 2;
let enemy = [];

if(num < 1 || gamemode != 4) {
    enemy.push(new Enemy(200, 50));
}
else if(num == 2 || gamemode != 4) {
    enemy.push(new Enemy(200, 50));
    enemy.push(new Enemy(200, 50));
}

//  更新処理
function update() {
    if(gamemode == 1) {
        player_1.update();
    }
    else if(gamemode == 2) {
        player_2.update();
    }
    else if(gamemode == 3 || gamemode == 4) {
        player_1.update();
        player_2.update();
    }
    
    if(gamemode != 4) {
        enemy[0].update();
    }
}

//  描画処理
function draw() {
    //  背景を設定
    vcon.fillStyle = '#000000';
    vcon.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);
    
    //  デバッグ情報
    vcon.fillStyle = 'white';
    vcon.font = '40px Impact';
    vcon.fillText('FRAME:'+frameCount, 1100, 50);
    
    
    //  player描画
    if(gamemode == 1) {
        player_1.draw();
    }
    else if(gamemode == 2) {
        player_2.draw();
    }
    else if(gamemode == 3 || gamemode == 4) {
        player_1.draw();
        player_2.draw();
    }
    
    //  敵描画
    if(gamemode != 4) {
        enemy[0].draw();
    }
    
    //  仮想画面を実画面へ転送
    con.drawImage(vcan, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);
}

//  メインループ開始
window.onload = () => {
    gamemode = window.prompt('ゲームモード選択:');
    while(isIncorrectGamemode) {
        if(gamemode < 0 || gamemode == '' || gamemode > 4) {
            gamemode = window.prompt('正しいゲームモードを選択してください');
        }
        else {
            isIncorrectGamemode = false;
        }
    }
    gamemodeCheck(gamemode);
    
        
    window.alert('十字キーで操作できます。なるべく長く生きれるようにガンバ！');
    mainLoop();
}

function mainLoop() {
    //  フレーム
    frameCount++;
    
    //  更新処理
    update();
    
    
    if(result.win) {
        window.alert('YOU WIN! PRESS ENTER TO START!');
        window.location.replace('start.html', 'play.html');
    }
    else if(result.lose) {
        window.alert('YOU LOSE... PRESS ENTER TO START.');
        window.location.replace('start.html', 'play.html');
    }
    else {
        draw();
        requestAnimationFrame(mainLoop);
    }
}

//  キーボード操作
document.onkeydown = (e) => {
    //  プレイヤー1の処理
    if(gamemode == 1) {
        if(e.key == 'ArrowUp') keyb.Up = true;
        if(e.key == 'ArrowDown') keyb.Down = true;
        if(e.key == 'ArrowLeft') keyb.Left = true;
        if(e.key == 'ArrowRight') keyb.Right = true;
    }
    else if(gamemode == 2) {
        if(e.key == 'w') keyb.w = true;
        if(e.key == 's') keyb.s = true;
        if(e.key == 'a') keyb.a = true;
        if(e.key == 'd') keyb.d = true;
    }
    else if(gamemode == 3 || gamemode == 4) {
        if(e.key == 'ArrowUp') keyb.Up = true;
        if(e.key == 'ArrowDown') keyb.Down = true;
        if(e.key == 'ArrowLeft') keyb.Left = true;
        if(e.key == 'ArrowRight') keyb.Right = true;
        
        if(e.key == 'w') keyb.w = true;
        if(e.key == 's') keyb.s = true;
        if(e.key == 'a') keyb.a = true;
        if(e.key == 'd') keyb.d = true;
        
        if(e.key == 'Shift') keyb.Space = true;
    }
    
}
document.onkeyup = (e) => {
    //  プレイヤー1の処理
    if(gamemode == 1) {
        if(e.key == 'ArrowUp') keyb.Up = false;
        if(e.key == 'ArrowDown') keyb.Down = false;
        if(e.key == 'ArrowLeft') keyb.Left = false;
        if(e.key == 'ArrowRight') keyb.Right = false;
    }
    //  プレイヤー2の処理
    if(gamemode == 2) {
        if(e.key == 'w') keyb.w = false;
        if(e.key == 's') keyb.s = false;
        if(e.key == 'a') keyb.a = false;
        if(e.key == 'd') keyb.d = false;
    }
    else if(gamemode == 3 || gamemode == 4) {
        if(e.key == 'ArrowUp') keyb.Up = false;
        if(e.key == 'ArrowDown') keyb.Down = false;
        if(e.key == 'ArrowLeft') keyb.Left = false;
        if(e.key == 'ArrowRight') keyb.Right = false;
        
        if(e.key == 'w') keyb.w = false;
        if(e.key == 's') keyb.s = false;
        if(e.key == 'a') keyb.a = false;
        if(e.key == 'd') keyb.d = false;
        
        if(e.key == 'Shift') keyb.Space = false;
    }
}