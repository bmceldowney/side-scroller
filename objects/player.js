var Player;

(function () {
    var isJumpStarted;

    Player = function (game) {
        var sprite
          , isMoving
          , cursors
          , direction
          , velocity
          , utils = Utilities
          , spriteStr = 'dude'
          , isGrounded
          , that = this;
          
        this.preload = function () {
            game.load.spritesheet(spriteStr, 'assets/charzera_0.png', 25, 45);
        };

        this.create = function () {
            this.sprite = sprite = game.add.sprite(500, 3700, spriteStr);

            game.physics.p2.enable(sprite);
            sprite.body.angularDamping = 1;
            sprite.body.collideWorldBounds = true;
            sprite.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
            game.camera.follow(sprite); // , Phaser.Camera.FOLLOW_PLATFORMER

            cursors = {
                up: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
                left: game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: game.input.keyboard.addKey(Phaser.Keyboard.D)
            };

            this.sprite.body.onBeginContact.add(playerCollide, this);
            this.sprite.body.onEndContact.add(playerCollideEnd, this);
        };

        this.update = function () {
            if (isMoving) {
                direction = sprite.body.velocity.x > 0 ? 5 : 0;
            }

            sprite.body.rotation = 0; // always stay upright
            velocity = sprite.body.velocity.x;
            sprite.body.velocity.x = 0;

            if (cursors.left.isDown) { // && !sprite.body.blocked.left
                // sprite.anchor.setTo(1, 0);
                sprite.scale.x = -1;

                sprite.body.velocity.x = -100;
                sprite.animations.play('walk');
                isMoving = true;
            } else if (cursors.right.isDown) { // && !sprite.body.blocked.right
                // sprite.anchor.setTo(0, 0);
                sprite.scale.x = 1;

                sprite.body.velocity.x = 100;
                sprite.animations.play('walk');
                isMoving = true;
            } else {
                if (!isGrounded) {
                    sprite.body.velocity.x = utils.reduceValue(velocity, 0.97, 5);
                } else {
                    sprite.animations.stop();
                    sprite.frame = direction;
                    isMoving = false;
                }
            }

            if (cursors.up.isDown && !isJumpStarted) {
                if (isGrounded) {
                    startJump(sprite);
                }
            }

            if (!cursors.up.isDown) {
                if (isJumpStarted) sprite.body.velocity.y = utils.reduceValue(sprite.body.velocity.y, 0.3333, 1);
                isJumpStarted = false;
            }

            if (!isGrounded) {
                sprite.frame = direction + 1;
            }
        };

        //  body is the Body it collides with
        //  shapeA is the shape in the calling Body involved in the collision
        //  shapeB is the shape in the Body it hit
        //  equation is an array with the contact equation data in it
        function playerCollide (body, shapeA, shapeB, equation) {
            if(!body.sprite) { // need to figure out how to determine if body is the ground
                isGrounded = true;
            }
        }

        function playerCollideEnd (body, shapeA, shapeB, equation) {
            if(!body.sprite) { // need to figure out how to determine if body is the ground
                isGrounded = false;
            }
        }
    };

    function startJump (player) {
        player.body.velocity.y = -300;
        isJumpStarted = true;
    }
})();
