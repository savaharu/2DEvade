//  Nextbotの最大数
let nextbot_id = Math.floor(Math.random()*30);

//  敵の追跡スピード
const ENEMY_SPEED = 64;

let speed = ENEMY_SPEED;

//  死亡回数記録（ゲームモード3のみ）
let dieCount_1 = 0;
let dieCount_2 = 0;

//  無敵時間
let nodamage_time_1 = 0;
let nodamage_time_2 = 0;

//  無敵
let nodamage_1 = false;
let nodamage_2 = false;

//  Nextbotの生成
let enemy_img = new Image();
enemy_img.src = 'img/'+nextbot_id+'.png';

/*//  味方蘇生（三回まで）
function help() {
    if(die_1) {
        if(dieCount_1 < 3) {
                if(keyb.Space) {
                    die_1 = false;
                    player_1_color = 'white';
                    dieCount_1++;
                    nodamage_time_1 = 0;
                    setInterval(()=>{
                        if(nodamage_time_1 <= 3) {
                            nodamage_1 = true;
                        }
                        else {
                            nodamage_1 = false;
                        }
                    }, 1000);
                }
        }
    }
    
    else if(die_2) {
        if(dieCount_2 < 3) {
            if(keyb.Space) {
                die_2 = false;
                player_2_color = 'blue';
                dieCount_2++;
                nodamage_time_2 = 0;
                setInterval(()=>{
                        if(nodamage_time_2 <= 3) {
                            nodamage_2 = true;
                        }
                        else {
                            nodamage_2 = false;
                        }
                    }, 1000);
            }
        }
    }
}
*/

//  敵のクラス
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    //  更新処理
    update() {
        //  勝利条件
        if(frameCount >= 10000) {result.win = true;}
        
        //  敵に触れたとき
        if(gamemode == 1) {
            if(this.x < player_1.x && player_1.x < this.x+120 &&
                this.y < player_1.y && player_1.y < this.y+120 && frameCount < 10000 && !nodamage_1) {
                result.lose = true;
            }
        }
        else if(gamemode == 2) {
            if(this.x < player_2.x && player_2.x < this.x+120 &&
               this.y < player_2.y && player_2.y < this.y+120 && frameCount < 10000 && !nodamage_2) {
                result.lose = true;
            }
        }
        else if(gamemode == 3) {
            if(this.x < player_1.x && player_1.x < this.x+120 &&
                this.y < player_1.y && player_1.y < this.y+120 && frameCount < 10000 && !nodamage_1) {
                    player_1_color = 'red';
                    die_1 = true;
            }
        else if(this.x < player_2.x && player_2.x < this.x+120 &&
                   this.y < player_2.y && player_2.y < this.y+120 && frameCount < 10000 && !nodamage_2) {
                    player_2_color = 'red';
                    die_2 = true;
        }
            
            if(die_1 && die_2) result.lose = true;
        }
        else if(gamemode == 4) {
            if(this.x < player_1.x && player_1.x < this.x+120 &&
                this.y < player_1.y && player_1.y < this.y+120 && frameCount < 10000 && !nodamage_1) {
                result.lose = true;
            }
        }
            
        //  追跡処理
        if(gamemode == 1) {
            if(player_1.x != this.x) {
                this.x += (player_1.x - this.x) / speed;
            }
            if(player_1.y != this.y) {
                this.y += (player_1.y - this.y) / speed;
            }
        }
        else if(gamemode == 2) {
            if(player_2.x != this.x) {
                this.x += (player_2.x - this.x) / speed;
            }
            if(player_2.y != this.y) {
                this.y += (player_2.y - this.y) / speed;
            }
        }
        else if(gamemode == 3) {
            if(Math.abs(player_1.x - this.x) > Math.abs(player_2.x - this.x) && !die_1) {
                if(player_1.x != this.x) {
                    this.x += (player_1.x - this.x) / speed;
                }
                if(player_1.y != this.y) {
                    this.y += (player_1.y - this.y) / speed;
                }
            }
            
            if(Math.abs(player_1.x - this.x) < Math.abs(player_2.x - this.x) && !die_2) {
                if(player_2.x != this.x) {
                    this.x += (player_2.x - this.x) / speed;
                }
                if(player_2.y != this.y) {
                    this.y += (player_2.y - this.y) / speed;
                }
            }
        }
        else if(gamemode == 4) {
            if(keyb.w) this.y -= speed/8;
            if(keyb.s) this.y += speed/8;
            if(keyb.a) this.x -= speed/8;
            if(keyb.d) this.x += speed/8;
        }
    }
    
    //  描画処理
    draw() {
        vcon.drawImage(enemy_img, 0, 0, 256, 256, this.x, this.y, 150, 150);
    }
}