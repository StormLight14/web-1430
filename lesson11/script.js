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
        let original = super.describe();
        original += `\nWeapon: ${weapon}`;
        return original;
    }
}

class Mage extends Character {
    constructor(name, health, strength, spell) {
        super(name, health, strength);
        this.spell = spell;
    }
    describe() {
        let original = super.describe();
        original += `\nSpell: ${spell}`;
        return original;
    }
}

Character.prototype.takeDamage = function(damage) {
    this.health -= damage;
    if (this.health < 0) {
        this.health = 0;
    }
}

Character.prototype.heal = function (amount) {
    this.health += amount;
}

let characterType = 'Mage';
let character = new Mage("None", 0, 0, "None");
const warriorForm = document.getElementById('warrior-form');
const mageForm = document.getElementById('mage-form');
const damageButton = document.getElementById('damage-button');
const healButton = document.getElementById('heal-button');

function updateLabels() {
    document.getElementById('name').innerText = `Name: ${character.name}`;
    document.getElementById('type').innerText = `Type: ${characterType}`;
    document.getElementById('health').innerText = `Health: ${character.health}`;
    document.getElementById('strength').innerText = `Strength: ${character.strength}`;
    const weaponLabel = document.getElementById('weapon');
    const spellLabel = document.getElementById('spell');
    if (characterType === 'Mage') {
        spellLabel.innerText = `Spell: ${character.spell}`;
        weaponLabel.classList.add('none');
        spellLabel.classList.remove('none');
    } else {
        weaponLabel.innerText = `Weapon: ${character.weapon}`;
        weaponLabel.classList.remove('none');
        spellLabel.classList.add('none');
    }
}

warriorForm.onsubmit = (event) => {
    event.preventDefault();

    const formData = {
        name: document.getElementById('warrior-name').value,
        health: document.getElementById('warrior-health').value,
        strength: document.getElementById('warrior-strength').value,
        weapon: document.getElementById('warrior-weapon').value
    };

    character = new Warrior(formData.name, formData.health, formData.strength, formData.weapon);
    characterType = 'Warrior';
    updateLabels();
}

mageForm.onsubmit = (event) => {
    event.preventDefault();

    const formData = {
        name: document.getElementById('mage-name').value,
        health: document.getElementById('mage-health').value,
        strength: document.getElementById('mage-strength').value,
        spell: document.getElementById('mage-spell').value
    };

    character = new Mage(formData.name, formData.health, formData.strength, formData.spell);
    characterType = 'Mage';
    updateLabels();
}

damageButton.onclick = () => {
    const damageAmount = parseInt(document.getElementById('damage-amount').value);
    character.takeDamage(damageAmount);
    updateLabels();
}

healButton.onclick = () => {
    const healAmount = parseInt(document.getElementById('heal-amount').value);
    character.heal(healAmount);
    updateLabels();
}