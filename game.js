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

game = new Phaser.Game(960, 640, Phaser.AUTO, 'game', {preload: preload, create: create, update: update, render: render});

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
      , sky
      , collisionTiles = [ 1, 3, 4, 9, 10, 11, 12, 17, 18, 19, 20, 25, 26, 33, 34, 41, 42, 65, 66, 89, 90 ];

    game.stage.backgroundColor = '#7fa299';

    game.add.tileSprite(0, 2975, 960, 908, 'mangrove_rear');
    game.add.tileSprite(0, 2975, 960, 908, 'mangrove_mid');
    game.add.tileSprite(0, 2975, 960, 908, 'mangrove_front');

    game.physics.startSystem(phys);

    map = game.add.tilemap('map');
    map.addTilesetImage('jungle1', 'mininicular');
    map.addTilesetImage('jungle2','mininicular2');

    layer = map.createLayer('mid');
    layer2 = map.createLayer('fore');

    map.setCollision(collisionTiles, true, layer2);

    //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
    //  This call returns an array of body objects which you can perform addition actions on if
    //  required. There is also a parameter to control optimising the map build.
    game.physics.p2.convertTilemap(map, layer2);

    layer2.resizeWorld();

    game.physics.p2.gravity.y = 500;

    // layer2.debug = true;
    
    player.create();

    scoreText = game.add.text(0, 0, 'score: 0', {font: '12px arial', fill: '#000'});
    scoreText.fixedToCamera = true;
    scoreText.cameraOffset.setTo(16, 16);

    game.stage.smoothed = false;
}

function update () {
    // game.physics.arcade.collide(player.sprite, layer2);

    player.update();
}

function render () {
    // game.debug.body(player.sprite);
    // game.debug.bodyInfo(player.sprite, 0, 200);
    // game.debug.spriteBounds(player.sprite);
    // game.debug.quadTree(game.physics.arcade.quadTree);
    // game.debug.cameraInfo(game.camera, 0, 20);
}
