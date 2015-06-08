
TestCase("LakeInvaders Game", {   
    setUp: function () {  
    	
    	world = new World("Entenreich", 5000, 5000);
    	terrain = new Terrain("Entenalpen");
    	player = new Player("Peter Bobachter");
    	mob = new Mob("Golem 1");
    	staff = new Weapon("Dragonsoath", "Staff", 2);
    	mage = new Job("Mage", "Fire", "Magic", 5, 3, "Cloth", "Staff");
    	enemy = new Player("Bad Boy");
    	enemy.jobUp(mage);
    	knight = new Job("Knight", "Strike", "Meele", 6, 1, "Plate", "Sword");
    	coat = new Armor();
    	dim = new Dim(1,1,10,10);
    }, 
    tearDown: function () {
        delete player;
        delete mob;
        delete world;
        delete terrain;
        delete zauberstab;
        delete mage;
        delete enemy;
        delete knight;
        delete coat;
    },
    "test does world exist": function () {	
    	assertTrue(world instanceof World);
    },
    "test worlds dimensions are set": function() {
    	assertTrue(world.width > 0 && world.height > 0);
    },
    "test is worlds pvp enabled": function () {
    	assertTrue(world.pvp);
    },
    "test is worlds pve enabled": function () {
    	assertTrue(world.pve);
    },
    "test does world.addPlayer exist": function () {
    	assertTrue(world.addPlayer != undefined);
    	// we need to add a player to da world
    },
    /* **************** Player tests ********************* */
    "test does player exist": function () {
    	assertTrue(player instanceof Player);
    },
    "test does players coord's are in the world": function () {
    	assertTrue(player.x < world.width);
    	assertTrue(player.y < world.height);
    	assertTrue(player.x > 0);
    	assertTrue(player.y > 0);
    },
    "test does player have job": function () {
    	assertTrue(player.job != undefined);
    },
    "test does player have hitpoints": function () {
    	assertTrue(player.health != undefined);
    },
    "test does player isAlive exists": function () {
    	assertTrue(player.isAlive != undefined);
    },
    "test is player alive": function () {
    	assertTrue(player.isAlive); 
    	// health > 0 better or not? don't know
    	// this way might be easier to test in branchings ...
    },
    "test does player.kill() exists": function () {
    	assertTrue(player.kill != undefined);
    },
    "test does player die": function () {
    	player.kill();
    	
    	assertFalse(player.isAlive);
    	assertTrue(player.health == 0);
    },
    "test does player.takeDmg(anJobObj) exists": function () {
    	assertTrue(player.takeDmg != undefined);
    },
    "test does player take damage": function () {
    	player.takeDmg(enemy);
    	
    	assertNotEquals(30, player.health);
    },
    "test does player take low damage and is still alive": function () {
    	player.takeDmg(enemy);
    	
    	assertTrue(player.isAlive);
    },
    "test does player take heavy damage and die": function () {
    	player.health = 1;
    	player.takeDmg(enemy);
    	
    	assertFalse(player.isAlive);
    },
    "test does player.revive() exists": function () {
    	assertTrue(player.revive != undefined);
    },
    "test does player revive": function () {
    	player.kill();
    	player.revive();
    	
    	assertTrue(player.isAlive);
    	assertTrue(player.health > 0);
    },
    "test does player jobUp exists": function() {
    	assertTrue(player.jobUp != undefined);
    },
    "test does player get apprenticed": function() {
    	player.jobUp(mage);
    	
    	assertTrue(player.job != undefined);
    },
    "test does player is Mage": function() {
    	player.jobUp(mage);
    	
    	assertEquals("Mage", player.job.name);
    	assertTrue(player.job instanceof Job);
    },
    "test does player.job.armorType exists": function() {
    	player.jobUp(mage);
    	
    	assertTrue(player.job.armorType != undefined);
    },
    "test does player wear cloths": function() {
    	player.jobUp(mage);
    	
    	assertEquals("Cloth", player.job.armorType);
    },
    "test does player have attack": function() {
    	player.jobUp(mage);
    	
    	assertTrue(player.job.atk != undefined);
    },
    "test can player cast Fire": function() {
    	player.jobUp(mage);
    	
    	assertEquals(player.job.atk.name, "Fire");
    },
    "test does player.job.weaponType exists": function() {
    	player.jobUp(mage);
    	
    	assertTrue(player.job.weaponType != undefined);
    },
    "test does player wield a Staff": function () {
    	player.jobUp(mage);
    	
    	assertEquals("Staff", player.job.weaponType);
    },
    "test does player.equipWeapon() exists": function() {
    	assertTrue(player.equipWeapon != undefined);
    },
    "test does player.damage exists": function () {
    	assertTrue(player.damage != undefined);
    },
    "test does player.defense exists": function () {
    	assertTrue(player.defense != undefined);
    },
    "test does player deals no damage withput anything": function() {
    	assertEquals(0, player.damage);
    },
    "test does player have increased damage after jobUp": function() {
    	player.jobUp(mage);
    	
    	assertTrue(player.damage > 0);
    },
    "test does player have increased damage after equip a Weapon": function() {
    	player.jobUp(mage);
    	player.equipWeapon(staff);
    	
    	assertTrue(player.damage > 0);
    },
    "test does validWeapon func exist": function() {
    	assertTrue(player.isWeaponValid != undefined);
    },
    "test does player are allowed to equip a Weapon": function() {
    	assertFalse(player.isWeaponValid(staff));
    },
    "test does player are allowed to equip a Weapon after jobUp": function () {
    	player.jobUp(mage);
    	
    	assertTrue(player.isWeaponValid(staff));
    },
    "test does a Knight is able to equip a Staff": function () {
    	player.jobUp(knight);
    	
    	assertFalse(player.isWeaponValid(staff));
    },
    "test does player.dropWeapon exists": function () {
    	assertTrue(player.dropWeapon != undefined);
    },
    "test does player after drop his Weapon deals 0 damage": function () {
    	player.jobUp(mage);
    	player.equipWeapon(staff);
    	player.dropWeapon();
    	
    	assertEquals(mage.atk.dmg, player.damage);
    },
    "test does player dropWeapon after change Job": function () {
    	player.jobUp(mage);
    	player.equipWeapon(staff);
    	player.jobUp(knight);
    	
    	assertEquals("none", player.weapon.type);
    },
    "test does player.move exist": function () {
    	assertTrue(player.move != undefined);
    },
    "test player move up": function () {
    	var oldPlayerPosY = player.y;
    	
    	player.move("up");
    	
    	assertFalse(player.y == oldPlayerPosY);
    },
    "test player move 1 unit up": function () {
    	var oldPlayerPosY = player.y;
    	
    	player.move("up");
    	
    	assertTrue(player.y == oldPlayerPosY-1);
    },
    "test player move down": function () {
    	var oldPlayerPosY = player.y;
    	
    	player.move("down");
    	
    	assertFalse(player.y == oldPlayerPosY);
    },
    "test player move 1 unit down": function () {
    	var oldPlayerPosY = player.y;
    	
    	player.move("down");
    	
    	assertTrue(player.y == oldPlayerPosY+1);
    },
    "test player move left": function () {
    	var oldPlayerPosX = player.x;
    	
    	player.move("left");
    	
    	assertFalse(player.x == oldPlayerPosX);
    },
    "test player move right": function () {
    	var oldPlayerPosX = player.x;
    	
    	player.move("right");
    	
    	assertFalse(player.x == oldPlayerPosX);
    },
    "test player move 1 unit left": function () {
    	var oldPlayerPosX = player.x;
    	
    	player.move("left");
    	
    	assertTrue(player.x == oldPlayerPosX-1);
    },
    "test player move 1 unit right": function () {
    	var oldPlayerPosX = player.x;
    	
    	player.move("right");
    	
    	assertTrue(player.x == oldPlayerPosX+1);
    },
    "test player getPoint exist": function () {
    	assertTrue(player.getPoint != undefined);
    },
    "test player getPoint x,y exists": function () {
    	assertTrue(player.getPoint().x != undefined);
    	assertTrue(player.getPoint().y != undefined);
    },
    "test player getPoint x,y isNaN": function () {
    	assertFalse(isNaN(player.getPoint().x));
    	assertFalse(isNaN(player.getPoint().y));
    },
    "test does player.moveTo exists": function () {
    	assertTrue(player.moveTo != undefined);
    },
    "test does player moveTo point": function () {
    	player.moveTo(122, 345);
    	
    	assertTrue(player.x == 122);
    	assertTrue(player.y == 345);
    },
    "test does player have width and height": function () {
    	assertTrue(player.height != undefined);
    	assertTrue(player.width != undefined);
    },
    "test does player.getDim() exists": function () {
    	assertTrue(player.getDim != undefined);
    },
    "test does player.getDim returns x,y,width and height of a player": function () {
    	assertFalse(isNaN(player.getDim().x));
    	assertFalse(isNaN(player.getDim().y));
    	assertFalse(isNaN(player.getDim().w));
    	assertFalse(isNaN(player.getDim().h));
    },
    "test does player.getDim returns the right stretching": function () {
    	player.height = 50;
    	
    	assertEquals(player.getDim().h, 50);
    },
    "test does player.getDim equals the players position and width": function () {
    	assertEquals(player.x, player.getDim().x);
    	assertEquals(player.y, player.getDim().y);
    	assertEquals(player.height, player.getDim().h - player.x + 1);
    	assertEquals(player.width, player.getDim().w - player.y + 1);
    },
    "test does player.isHit() exist": function () {
    	assertTrue(player.isHit != undefined);
    },
    "test does player get Hit": function () {
    	assertTrue(player.isHit(4,6));
    	assertTrue(player.isHit(1,1));
    	assertTrue(player.isHit(1,10));
    	assertTrue(player.isHit(10,1));
    	assertTrue(player.isHit(10,10));
    },
    "test does player get Hit not": function () {
    	assertFalse(player.isHit(0,0));
    	assertFalse(player.isHit(1,0));
    	assertFalse(player.isHit(0,1));
    	assertFalse(player.isHit(11,11));
    	assertFalse(player.isHit(10,11));
    	assertFalse(player.isHit(11,10));
    },
    /* ******************* JOBS ********************* */
	"test does mage(Job) exists": function () {
	    assertTrue(mage instanceof Job);
	},
	"test does knight(Job) exists": function () {
	    assertTrue(knight instanceof Job);
	},
	"test dies job have name": function () {
	    assertTrue(mage.name != undefined);
	},
	"test does Job is Mage": function () {
		assertEquals(mage.name, "Mage");
	},
	"test does mage have atk": function () {
	    assertTrue(mage.atk != undefined);	
	},	
	"test does atk have dmg": function () {
    	assertTrue(mage.atk.dmg != undefined);
	},
	"test does atk have name": function () {
    	assertTrue(mage.atk.name != undefined);
	},
	"test does atk have type": function () {
		assertTrue(mage.atk.type != undefined);
	},
	"test does atk have range": function () {
		assertTrue(mage.atk.range != undefined);
	},
	"test does atk deal dmg": function () {
    	assertTrue(mage.atk.dmg > 0);
	},
	"test does mage.armorType exists": function () {
		assertTrue(mage.armorType != undefined);
	},
	"test does mage.weaponType exists": function () {
		assertTrue(mage.weaponType != undefined);
	},
	/* ****************** Weapons ********************** */
    "test does weapon exist": function () {
    	assertTrue(staff instanceof Weapon);
    },
    "test does weapon have name": function () {
    	assertTrue(staff.name != undefined);
    },
    "test does weapon have type": function () {
    	assertTrue(staff.type != undefined);
    },
    "test does weapon have dmg": function () {
    	assertTrue(staff.dmg != undefined);
    },
    "test does weapon have unique": function () {
    	assertTrue(staff.isUnique != undefined);
    },
	/* ****************** Armor ********************** */
    "test does armor exist": function () {
    	assertTrue(coat instanceof Armor);
    },
    /* **************************************** */
    "test does terrain exist": function () {
    	assertTrue(terrain instanceof Terrain);
    },
    "test does mob exist": function () {
    	assertTrue(mob instanceof Mob);
    },
    /* ********** Point and Dimensions tests ***** */
    "test does dimensions exist": function () {
    	assertTrue(dim instanceof Dim);
    },
    "test does dimensions have coordinates and stretching": function () {
    	assertTrue(dim.x != undefined);
    	assertTrue(dim.y != undefined);
    	assertTrue(dim.w != undefined);
    	assertTrue(dim.h != undefined);
    },
    "test does dimensions checkDimensions exist": function () {
    	assertTrue(dim.check != undefined);
    },
    "test does dimensions check set the Dimensions to a Default value if not valid": function () {
    	dim = new Dim(-1, -1, 10, 10);
    	
    	assertTrue(dim.x > 0);
    	assertTrue(dim.y > 0);
    },
    "test does missile exist": function () {
    	// 08. June 2015, 11:18 
    	fireball = new Missile();
    	
    	assertTrue(fireball instanceof Missile);
    },
    "test does missile have dmg": function () {
    	// 08. June 2015, 11:24
    	fireball = new Missile("player1",6); //player1 added 11:28
    	
    	assertTrue(fireball.dmg != undefined);
    },
    "test dies missile have owner (and dmg)": function () {
    	// 08. June 2015, 11:26
    	fireball = new Missile("player1", 6);
    	
    	assertTrue(fireball.owner != undefined);
    },
    "test does missile have dmgType": function() {
    	// 08. June 11:29
    	fireball = new Missile("player1", 6, "magic");
    	
    	assertTrue(fireball.dmgType != undefined);
    },
    "test does missile have name": function() {
    	// 08. June 11:33
    	fireball = new Missile("player1", 6, "magic", "greater Fireball");
    	
    	assertTrue(fireball.name != undefined);
    },
    "test does world can hold the missiles": function() {
    	// 08. June 11:49
    	assertTrue(world.missiles != undefined);
    },
    "test can world add missiles": function() {
    	// 08. June 11:52
    	assertTrue(world.addMissile != undefined);
    },
    "test is missile added?": function() {
    	// 08. June 11:54
    	theName = "berserkAxe"; // 12:02
    	bAxe = new Missile("player2", 42, "physic", theName);
    	world.addMissile(bAxe);
    	
    	assertEquals(world.missiles.length, 1);
    	assertEquals(world.missiles[0].name, theName) // 12:02
    },
    "test does missile have a deathTimer (not eternely flying over the map)": function () {
    	// 08. June, 12:08
    	firebomb = new Missile("player3", 10, "magic", "Supernova", 10);
    	
    	assertTrue(firebomb.ttl != undefined);
    },
    "test does missile habe dimensions": function () {
    	// 08. June, 12:13
    	coldDim = new Dim(1,1,10,10);
    	frostwave = new Missile("player4", 4, "magic", "Frostwave", 3, coldDim);
    	
    	assertTrue(frostwave.dim != undefined);
    	/*	Anmerkung:
    	 *  Dimensionen einer Attacke könnten interessant werden frage der implementierung?
    	 *  position x und y müssen hier vom Spieler und der Streckung der Attack berechnet werden
    	 *  desweiteren soll sie sich ja auch bewegen ... evtl. schon wieder zu komplex?
    	 */
    }
});