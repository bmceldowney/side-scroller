var game
  , player
  , stars
  , score = 0
  , scoreText
  , map
  , tiles
  , tiles2
  , layer
  , layer2;

game = new Phaser.Game(960, 640, Phaser.WEBGL, 'game', {preload: preload, create: create, update: update, render: render}); // Phaser.AUTO Phaser.CANVAS

function preload() {
    game.load.tilemap('map', 'assets/jungle.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('mininicular', 'assets/mininicular.png');
    game.load.image('mininicular2', 'assets/mininicular2.png');
    game.load.image('mangrove_rear', 'assets/mangrove_rear.png');
    game.load.image('mangrove_mid', 'assets/mangrove_mid.png');
    game.load.image('mangrove_front', 'assets/mangrove_front.png');

    player = new Player(game);
    player.preload();
}

function create () {
    var phys = Phaser.Physics.P2JS
      , groundBodies
      , groundMaterial;

    game.stage.backgroundColor = '#7fa299';

    game.add.tileSprite(0, 2975, 960, 908, 'mangrove_rear');
    game.add.tileSprite(0, 2975, 960, 908, 'mangrove_mid');
    game.add.tileSprite(0, 2975, 960, 908, 'mangrove_front');

    game.physics.startSystem(phys);
    game.physics.p2.gravity.y = 800;

    map = game.add.tilemap('map');
    map.addTilesetImage('jungle1', 'mininicular');
    map.addTilesetImage('jungle2','mininicular2');
    groundBodies = game.physics.p2.convertCollisionObjects(map, 'ground');
    groundMaterial = new Phaser.Physics.P2.Material('ground');
    groundBodies.forEach(function (item) {
        item.setMaterial(groundMaterial);
    });

    layer = map.createLayer('mid');
    layer2 = map.createLayer('fore');
    player.create();
    layer3 = map.createLayer('foliage');

    layer2.resizeWorld();

    scoreText = game.add.text(0, 0, 'score: 0', {font: '12px arial', fill: '#000'});
    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(16, 16);

    game.stage.smoothed = false;
}

function update () {
    player.update();
}

function render () {
  player.render();
    // game.debug.body(player.sprite);
    // game.debug.bodyInfo(player.sprite, 0, 200);
    // game.debug.spriteBounds(player.sprite);
    // game.debug.quadTree(game.physics.arcade.quadTree);
    // game.debug.cameraInfo(game.camera, 0, 20);
}
