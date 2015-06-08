"use strict";

function World(name, width, height) {
	if (!(this instanceof World)) {
		return new World (name, width, height) ;
	}
	
	this.players = new Array();
	this.missiles = new Array(); // 08.06, 11:52
	
	this.name = name;
	this.width = width;
	this.height = height;
	
	this.pvp = true;
	this.pve = true;
	
	this.addPlayer = function (player) {
		this.players.push(player);
	};
	
	this.addMissile = function (missile) {
		this.missiles.push(missile)
	}
}

/* This function creating a Missile
 * the Missile have some attributes to identify the dmgType, amount,owner and the name of it
 */
function Missile(owner, dmg, dmgType, name, ttl, dim){	// 11:21, 08. June
	if (!(this instanceof Missile)) {
		return new Missile (owner, dmg, dmgType, name) ;
	}
	
	this.dmg = dmg;	// 11:24, 08. June
	this.owner = owner; // 11:27, 08. June
	this.dmgType = dmgType; // 11:31, 08.June
	this.name = name; // 11:34, 08. June
	this.ttl = ttl; // 12:10, 08. June
	this.dim = dim; // 12:18, 08. June
	
	/* Anmerkung: hier eventuell noch ein paar funktionen zwecks 
	 * verbindung von dim und ttl ?
	 * ausbreitung bzw. movement der attacke muss korreliert mit der ttl sein
	 * ttl. muss existieren damit die attacke nicht endlos über die map fliegt
	 * 
	 * ...
	 * 
	 * irgend eine abbruchfunktion bzw destroy() function sollte es auch geben,
	 * damit bei collision die attacke sofort determiniert werden kann ...
	 */
}

function Dim(x, y, w, h){
	if (!(this instanceof Dim)) {
		return new Dim (x, y, w, h) ;
	}
	
	this.check = function (n) {
		if (n < 1) {
			return 1;
		}
		
		return n;
	}
	
	this.x = this.check(x);
	this.y = this.check(y);
	this.w = w;
	this.h = h;
}

function Armor() {
	if (!(this instanceof Armor)) {
		return new Armor () ;
	}
}

function Terrain(name) {
	if (!(this instanceof Terrain)) {
		return new Terrain (name) ;
	}
}

// Player repräsentiert den zu spielenden Char
function Player(name) {
	if (!(this instanceof Player)) {
		return new Player (name) ;
	}
	
	this.x = 1;	
	this.y = 1;
	this.width = 10;	// width gibt die streckung des characters zusammen mit height an
	this.height = 10;   // so kann ein normaler char beispielsweise 10px^2 groß sein oder ein fetter 20px^2
	
	this.health = 30;	
	this.job = "novice"; // am anfang hat man keinen Job, ich stell mir das so vor, dass eine Instanz des Players
						 // nach dem Enter a Name feld existiert und man dann einen Job wählen kann
	this.isAlive = true; // gibt an ob der spiele am leben ist
	this.weapon = new Weapon("none", "none", 0);	// ein Slot für eine Waffe
	this.damage = 0;
	this.defense = 0;
	
	this.getPoint = function () {	// gibt den Punkt wieder, an dem der Spieler anfängt
		var point = {
				x: this.x,
				y: this.y
		}
		
		return point;
	}
	this.getDim = function () {		// gibt ein objekt zurück mit den Dimensionsdaten des Spielers
		var dim = {
			x: this.x,
			y: this.y,
			w: this.x + this.width - 1,
			h: this.y + this.height - 1
		}
		
		return dim;
	};
	this.isHit = function (collisionX, collisionY) {	// gibt true zurück wenn der Spieler getroffen wurde
		if(collisionX >= this.getDim().x && collisionX <= this.getDim().w
				&& 
				collisionY >= this.getDim().y && collisionY <= this.getDim().h) 
		{
			return true;
		}
		
		return false;
	};
	this.move = function(direction) {	// bewegt den spieler in eine richtung, der übergebende string handelt in welche
		
		switch(direction)
		{
			case "up":
				this.y--;
				break;
			case "down":
				this.y++;
				break;
			case "left":
				this.x--;
				break;
			case "right":
				this.x++;
				break;
			default:
				return;
		}
	};
	this.moveTo = function(targetX, targetY) {	// bewegt den spieler zu einen Punkt, ist eher ein Teleport
		this.x = targetX;
		this.y = targetY;
	};
	this.equipWeapon = function (weapon) {	// legt eine Waffe an
		if(this.isWeaponValid(weapon))	// überprüft ob der Job die Waffe überhaupt ausrüsten darf
		{
			this.dropWeapon();	// dropt alte Waffe falls vorhanden
			
			this.weapon = weapon;	// setzt waffe
			this.damage += weapon.dmg;	// addiert Waffendamage auf!
		}
	};
	this.dropWeapon = function () {	// legt eine Waffe ab
		this.damage -= this.weapon.dmg;	// entfernt Waffenschaden
		this.weapon = new Weapon("none", "none", 0); // none Weapon!
	};
	this.jobUp = function (sampleJob) {		// setzt Job
		this.job = new Job(
				sampleJob.name, 
				sampleJob.atk.name, 
				sampleJob.atk.type, 
				sampleJob.atk.range, 
				sampleJob.atk.dmg, 
				sampleJob.armorType,
				sampleJob.weaponType
			);
		
		this.damage += this.job.atk.dmg;
		
		if(this.weapon != this.job.weaponType) {	// bei einen Jobwechsel wird überprüft, ob die Waffe valid ist
			this.dropWeapon();
		}
	};
	this.takeDmg = function (enemy) {	// bekommt Schaden, gegner wird übergeben ...
		this.health = this.health-enemy.job.atk.dmg; // ich merk grad hab hier noch nen Fehler drin 
													// mach ich noch raus xD will gleich erstmal unity weitermachen
		if(this.health <= 0)
		{
			this.kill();	// wenn leben auf oder unter 0 sinkt ... STIRB!
		}
	};
	this.isWeaponValid = function (checkWeapon) { // überprüft ob die waffe Valid is
		if(this.job != "novice")
		{
			if(checkWeapon.type == this.job.weaponType)
			{
				return true;
			}
		}
		
		return false;
	};
	this.kill = function () {	// ... töööten
		this.health = 0;
		this.isAlive = false;
	};
	this.revive = function () {	// ... belebt den Spieler wieder
		if(!this.isAlive) {
			this.health = 15;
			this.isAlive = true;
		}
	};
}

// Erzeugt einen neuen Job. So können ganz einfach viele neue Jobs angelegt werden
// keine grenzen für die Fantasy 
function Job(name, atkName, type, range, dmg, armorType, weaponType) { 
	if (!(this instanceof Job)) {
		return new Job (ame, atkName, type, range, dmg, armorType, weaponType) ;
	}
	this.name = name;
	this.armorType = armorType;
	this.weaponType = weaponType;
	
	this.atk = {	// hier hab ich an ne Fähigkeit gedacht ... meine namensgebung ist vielleicht scheiße
		name: atkName, 
		type: type,
		range: range,
		dmg: dmg
	}
}

function Mob(name) {
	if (!(this instanceof Mob)) {
		return new Mob (name) ;
	}
}

function Weapon(name, type, dmg) { // erzeugt eine waffe :)
	if (!(this instanceof Weapon)) {
		return new Weapon (name, type, dmg) ;
	}
	
	this.name = name;
	this.type = type;
	this.dmg = dmg;
	this.isUnique = false;
}

