class Character {
    #experience = 0;

    constructor(name, health, strength) {
        this.name = name;
        this.health = health;
        this.strength = strength;
    }

    describe() {
        return `Character ${this.name}:\nHealth: ${health}\nStrength: ${strength}`;
    }

    getExperience() {
        return this.#experience;
    }

    setExperience(amount) {
        if (amount >= this.#experience) {
            this.#experience = amount;
        }
    }
}

class Warrior extends Character {
    constructor(name, health, strength, weapon) {
        super(name, health, strength);
        this.weapon = weapon;
    }
    describe() {
        let original = super();
        original += `\nWeapon: ${weapon}`;
    }
}

class Mage extends Character {
    constructor(name, health, strength, spell) {
        super(name, health, strength);
        this.spell = spell;
    }
    describe() {
        let original = super();
        original += `\nSpell: ${spell}`;
    }
}