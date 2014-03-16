var game
  , platforms
  , player
  , stars
  , score = 0
  , scoreText;

game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');

    player = new Player(game);
    player.preload();
}

function create () {
    var ground
      , ledges = []
      , phys = Phaser.Physics.ARCADE
      , sky;

    sky = game.add.sprite(0, 0, 'sky');
    sky.fixedToCamera = true;

    game.physics.arcade.gravity.y = 500;
    game.world.setBounds(0, 0, 4000, 600);
    game.scale.scaleFactor = {x: 2, y: 2};

    stars = game.add.group();
    platforms = game.add.group();

    ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(20, 2);

    ledges.push(platforms.create(400, 400, 'ground'));
    ledges.push(platforms.create(-150, 250, 'ground'));
    ledges.push(platforms.create(775, 225, 'ground'));

    player.create();

    game.physics.enable([ground].concat(ledges), phys);

    platforms.children.forEach(function (platform) {
        platform.body.immovable = true;
        platform.body.allowGravity = false;
    });

    for (var i = 0; i < 12; i++) {
        var star = stars.create(i * 70, 0, 'star');

        game.physics.enable(star, phys);
        star.body.bounce.y = 0.6 + Math.random() * 0.2;
    }

    scoreText = game.add.text(0, 0, 'score: 0', {font: '32px arial', fill: '#000'});
    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(16, 16);
}

function update () {
    game.physics.arcade.collide(player.sprite, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player.sprite, stars, starGet, null, this);

    player.update();
}

function starGet (player, star) {
    star.kill();

    score += 10;
    scoreText.setText('score: ' + score);
}