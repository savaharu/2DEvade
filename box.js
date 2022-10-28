// 死んだか
let die_1 = false;
let die_2 = false;

//  箱の最大速度
let BOX_SPEED = 5;
const MAX_SPEED = BOX_SPEED*2;

//  プレイヤーの速度
let BOX_SPEED_1 = BOX_SPEED;
let BOX_SPEED_2 = BOX_SPEED;

//  箱の色
let player_1_color = 'white';
let player_2_color = 'blue';

//□のクラス
class Box {
    constructor(player, x, y, w, h) {
        this.player = player;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    
    //  更新処理
    update() {
        /*
        // マウス追従
        document.onmousemove = (e) => {
            let mouseX = e.pageX;
            let mouseY = e.pageY;
            
            this.x = mouseX - this.w/2;
            this.y = mouseY - this.h/2;
        };
        */
        //  キーボードで移動
        //  1Pの操作
        if(this.player == 1 && !die_1) {
            if(keyb.Up) this.y -= BOX_SPEED_1;
            if(keyb.Down) this.y += BOX_SPEED_1;
            if(keyb.Left) this.x -= BOX_SPEED_1;
            if(keyb.Right) this.x += BOX_SPEED_1;
        }
        
        //  2Pの操作
        else if(this.player == 2 && !die_2) {
            if(keyb.w) this.y -= BOX_SPEED_2;
            if(keyb.s) this.y += BOX_SPEED_2;
            if(keyb.a) this.x -= BOX_SPEED_2;
            if(keyb.d) this.x += BOX_SPEED_2;
        }
        
        if(this.player == 1) {
            if(this.BOX_SPEED != MAX_SPEED) {
                if(frameCount > 5000) {
                    BOX_SPEED_1 += (MAX_SPEED - BOX_SPEED_1)/64;
                }
                else {
                    BOX_SPEED_1 += (MAX_SPEED - BOX_SPEED_1)/128;
                }
            }
        }
        else if(this.player == 2) {
            if(BOX_SPEED_2 != MAX_SPEED) {
                if(frameCount > 5000) {
                    BOX_SPEED_2 += (MAX_SPEED - BOX_SPEED_2)/64;
                }
                else {
                    BOX_SPEED_2 += (MAX_SPEED - BOX_SPEED_2)/128;
                }
        }
        }
    }
    
    //  描画処理
    draw() {
        if(this.player == 1) {
            vcon.fillStyle = player_1_color;
            vcon.fillRect(this.x, this.y, 50, 50);
        }
        else if(this.player == 2) {
            vcon.fillStyle = player_2_color;
            vcon.fillRect(this.x, this.y, 50, 50);
        }
    }
}