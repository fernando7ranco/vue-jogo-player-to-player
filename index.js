
var app = new Vue({
    el: '#app',
    data: {
        jogoRodando: false,
        porcentagem: {
            player1: 100,
            player2: 100
        },
        critico:{
            player1: false,
            player2: false
        },
        alerta:{
            player1: false,
            player2: false
        },
        perdeu: false,
        ganhou: false,
        jogadas: []
    },
    methods:{
        startJogo(){
            this.porcentagem.player1 = 100;
            this.porcentagem.player2 = 100;
            this.jogoRodando = true;
            this.perdeu = false;
            this.ganhou = false;
            this.jogadas = [];
        },
        atacar(){
            this.porcentagem.player1 -= getRandomInt(1,10);
            this.porcentagem.player2 -= getRandomInt(1,10);
        },
        curar(){
            if(getRandomInt(1,10) % 2 == 0){
                let pontos1 = this.porcentagem.player1 + getRandomInt(1,10);
                this.porcentagem.player1 = pontos1 <= 100 ? pontos1 : 100;
            } else
                this.porcentagem.player1 -= getRandomInt(1,10);

            let pontos2 = this.porcentagem.player2 + getRandomInt(1,10);
            this.porcentagem.player2 = pontos2 <= 100 ? pontos2 : 100;
        },
        atacarEspecial(){
            this.porcentagem.player1 -= getRandomInt(10,20);
            this.porcentagem.player2 -= getRandomInt(10,20);
        },
        finalizarJogo(){
            this.startJogo();
            this.jogoRodando = false;
        }
    },
    watch:{
        'porcentagem.player1'(p1, p2){
            if(p1 > 100) return;
            if(p1<=0) {
                this.perdeu = true;
                this.jogoRodando = false;
                this.porcentagem.player1 = 0;
            }
            if(p1 > p2)
                this.jogadas.unshift('player1 ganhou '+ (p1 - p2));
            else
                this.jogadas.unshift('Player2 atigiu o player1 com '+ (p2 - p1));
            this.critico.player1 = p1 < 20;
            this.alerta.player1 = p1>=20 && p1 <40;
        },
        'porcentagem.player2'(p1, p2){
            if(p1 > 100) return;
            if(p1<=0){
                this.ganhou = true;
                this.jogoRodando = false;
                this.porcentagem.player2 = 0;
            }
            if(p1 > p2)
                this.jogadas.unshift('player2 ganhou '+ (p1 - p2));
            else
                this.jogadas.unshift('Player1 atigiu o player2 com '+ (p2 - p1));
            this.critico.player2 = p1 < 20;
            this.alerta.player2 = p1>=20 && p1 <40;
        }
        
    }
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}