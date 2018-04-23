(function () {
	'uso estrito';
	function Game(){

	}
		var TILE_SIZE = 130;
		var cards = [];
		var images = [];
		var firstClick, secondClick;
		var noMatch, clickTime;
		var score = 100;
		var totalMatches = 0;

	Game.prototype = {
		preload: function(){
			this.load.image('back', 'assets/back.png');
			this.load.image('0', 'assets/10.png');
			this.load.image('1', 'assets/1.png');
			this.load.image('2', 'assets/2.png');
			this.load.image('3', 'assets/3.png');
			this.load.image('4', 'assets/4.png');
			this.load.image('5', 'assets/5.png');
			this.load.image('6', 'assets/6.png');
			this.load.image('7', 'assets/7.png');
			this.load.image('8', 'assets/8.png');
			this.load.image('9', 'assets/9.png');
		},

		create: function(){
			for (var i = 0; i <10; i++){
				images.push(this.game.add.sprite(0,0,''+i));
				images.push(this.game.add.sprite(0,0,''+i));
			}

			this.shuffle(images);

			for (var i = 0; i<4; i++){
				for (var j = 0; j<5; j++){
					var idx = i*5+j;
					cards[idx] = this.game.add.sprite(j*TILE_SIZE, i*TILE_SIZE, 'back');
					cards[idx].index = idx;
					images[idx].x = j*TILE_SIZE;
					images[idx].y = i*TILE_SIZE;
					images[idx].visible = false;

					cards[idx].inputEnabled = true;
					cards[idx].events.onInputDown.add(this.doClick);
					cards[idx].events.onInputOver.add(function(sprite){
						sprite.alpha = 0.5;
					});
					cards[idx].events.onInputOut.add(function(sprite){
						sprite.alpha = 1.0;
					});
				}
			}
			
		},
		
		shuffle: function(o) {
			for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
				return o;
			
		},

		doClick: function(sprite){
			if (firstClick == null) {
				firstClick = sprite.index;
			}
			else if (secondClick == null){
				 secondClick = sprite.index;
				if(images[firstClick].key == images[secondClick].key){
					score +=50;
					totalMatches++;
					firstClick = null;
					secondClick = null;
				}
				else{
					score -= 5;
					noMatch = true;
				}
			}
			else{
				return;
			}
			clickTime = sprite.game.time.totalElapsedSeconds();
			sprite.visible = false;
			images[sprite.index].visible = true;
		},

		update: function(){
			 if (noMatch) {
			    if (this.game.time.totalElapsedSeconds() - clickTime > 0.5) {       
			       cards[firstClick].visible = true;
			       cards[secondClick].visible = true;
			       images[firstClick].visible = false;
			       images[secondClick].visible = false;
			       firstClick = null; secondClick = null;
			       noMatch = false;
			    }
  			}
  			else if(totalMatches === 10){
  				alert('Você Ganhou!!!!!!');
        		location.reload();
  				}
			else if(score <= 0){
			alert('Você Perdeu!    =(    Tente De novo');
			location.reload();
			}	
		},

		render: function(){
			this.game.debug.text('Score: ' + score, 660, 20);
		}

	};

	var game = new Phaser.Game(800, 520, Phaser.Auto, 'jogo-memoria');//Cria um objeto Phaser Game com 800 de largura por 520 de altura. Seleciona o renderizador automaticamente. Adiciona a div jogo-memoria no arquivo html
	game.state.add('game', Game);//adiciona as funções do jogo
	game.state.start('game');//inicia as funções do jogo

}());