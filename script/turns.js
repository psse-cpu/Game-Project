function skillSelector(character){
    if(character === "player"){
        document.getElementById("battleButtons").innerHTML = ""
        document.getElementById("battleButtons").innerHTML += `
        <button onclick="skillTypeChecker('enemy', 'skill1')" id="skill1Button">${attackingCharacter.skill1.name}</button>`

        document.getElementById("battleButtons").innerHTML += `
        <button onclick="skillTypeChecker('enemy', 'skill2')" id="skill2Button">${attackingCharacter.skill2.name}</button>`
    } else if(character === "enemy"){
        randomNumber = Math.ceil(Math.random() * 100)
        if(randomNumber  <= 75){
            skillTypeChecker('player', 'skill1')
        } else {
            skillTypeChecker('player', 'skill2')
        }
    }
}
function targetSelector(character){
    document.getElementById("battleButtons").innerHTML = ""
    if(character === "enemy"){
        buttonSound.play()
        if(isDead[3] === false){
            document.getElementById("battleButtons").innerHTML = `
            <button onclick="changeTargetCharacter(enemy1)">Enemy 1 Target</button>`
        } if(isDead[4] === false){
            document.getElementById("battleButtons").innerHTML += `
            <button onclick="changeTargetCharacter(enemy2)">Enemy 2 Target</button>`
        } if(isDead[5] === false){
            document.getElementById("battleButtons").innerHTML += `
            <button onclick="changeTargetCharacter(enemy3)">Enemy 3 Target</button>`
        }
    } else if (character === "player"){
        let i = 0
        randomNumber = undefined
        while(randomNumber !== i){
            i = 0
            for(i = 0; i < 3; i++){
                randomNumber  = Math.floor(Math.random() * 3)
                if(randomNumber === i){
                    if(isDead[i] === false){
                        changeTargetCharacter(characters[i])
                        break
                    }
                }
            }
        }
    }
}
function skillTypeChecker(character, skill){
    if(skill === "skill1"){
        currentSkill = "skill1"
    } else if(skill === "skill2"){
        currentSkill = "skill2"
    }
    if(attackingCharacter[currentSkill]["type"] === "Attack"){
        targetSelector(character)
    } else {
        characterHitChecker()
    }
}

let damage
function checkAccuracy(){
    randomNumber = Math.ceil(Math.random() * 100)
    if (randomNumber <= attackingCharacter[currentSkill]["accuracy"]){
        hitSound.play()
        targetCharacterHit()
    }else{
        missSound.play()
        messageLogs.innerHTML = "Attack Missed"
        setTimeout(() => {
            //statUpdate()
            deadChecker()
        }, 2000);
    }
    setTimeout(() => {
        for(let i = 0; i < 6; i++){
            isTargetHit[i] = false
        }
    
        for(let i = 0; i < 6; i++){
            if(targetCharacter === characters[i]){
                idleFunctions[i]()
                break
            }
        }
        for(let i = 0; i < 6; i++){
            if(attackingCharacter === characters[i]){
                idleFunctions[i]()
                break
            }
        }
    }, 1000);
}
    
function damageCalculation(){
    damage = Math.ceil(attackingCharacter[currentSkill]["damage"] * (attackingCharacter.currentAttack / targetCharacter.currentDefense))
    targetCharacter.currentHealth -= damage
    messageLogs.innerHTML = `${targetCharacter.name} received ${damage} damage`

    for(let i = 0; i < 6; i++){
        if(targetCharacter === characters[i]){
            index = i
            break
        }
    }
    if (targetCharacter.currentHealth <= 0){
        isDead[index] = true
        messageLogs.innerHTML = `${targetCharacter.name} died.`
    }
    //statUpdate()
    healthBar()
    setTimeout(() => {
        deadChecker()
    }, 2000);
}

let enhancerIndex
let enhancerMaxIndex
function checkEnchancing(){
    if(attackingCharacter[currentSkill]["type"] === "Enhancer"){
        for(let i = 0; i < 6; i++){
            if(isEnchancing[i] === true){
                if(attackingCharacter[currentSkill]["boosting"] === "Attack"){
                    attackBoost = Math.ceil(attackingCharacter.currentAttack * (attackingCharacter[currentSkill]["value"] / 100))
                    if(attackingCharacter.currentAttack + attackBoost > attackingCharacter.maxAttack){
                        attackingCharacter.currentAttack = attackingCharacter.maxAttack
                        messageLogs.innerHTML = `Attack maxed`
                    } else {
                        attackingCharacter.currentAttack += attackBoost
                        messageLogs.innerHTML = `Attack increased`
                    }
                }if(attackingCharacter[currentSkill]["boosting"] === "Defense"){
                    defenseBoost = Math.ceil(attackingCharacter.currentDefense * (attackingCharacter[currentSkill]["value"] / 100))
                    if(attackingCharacter.currentDefense + defenseBoost > attackingCharacter.maxDefense){
                        attackingCharacter.currentDefense = attackingCharacter.maxDefense
                        messageLogs.innerHTML = `Defense maxed`
                    } else {
                        attackingCharacter.currentDefense += defenseBoost
                        messageLogs.innerHTML = `Defense increased`
                    }
                }if(attackingCharacter[currentSkill]["boosting"] === "Health"){
                    healthBoost = Math.ceil(attackingCharacter.health * (attackingCharacter[currentSkill]["value"] / 100))
                    if(attackingCharacter.currentHealth + healthBoost > attackingCharacter.health){
                        attackingCharacter.currentHealth = attackingCharacter.health
                        messageLogs.innerHTML = `Health Full`
                    } else {
                        attackingCharacter.currentHealth += healthBoost
                        messageLogs.innerHTML = `Health increased`
                    }
                    healthSound.play()
                }
                isEnchancing[i] = false
            }
        }
    } else if(attackingCharacter[currentSkill]["type"] === "Party Enhancer"){
        if(attackingCharacter === player1 || attackingCharacter === player2 || attackingCharacter === player3){
            enhancerIndex = 0
            enhancerMaxIndex = 3
        }else if(attackingCharacter === enemy1 || attackingCharacter === enemy2 || attackingCharacter === enemy3){
            enhancerIndex = 3
            enhancerMaxIndex = 6
        }
        for(let i = enhancerIndex; i < enhancerMaxIndex; i++){
            if(attackingCharacter[currentSkill]["boosting"] === "Attack" || attackingCharacter[currentSkill]["boosting"] === "Attack and Defense"){
                attackBoost = Math.ceil(characters[i]["currentAttack"] * (attackingCharacter[currentSkill]["value"] / 100))
                if(characters[i]["currentAttack"] + attackBoost > characters[i]["maxAttack"]){
                    characters[i]["currentAttack"] = characters[i]["maxAttack"]
                    setTimeout(() => {
                        messageLogs.innerHTML = `Attack maxed`
                    }, 1000);
                } else {
                    characters[i]["currentAttack"] += attackBoost
                    setTimeout(() => {
                        messageLogs.innerHTML = `Attack increased`
                    }, 1000);
                }
            }
            if(attackingCharacter[currentSkill]["boosting"] === "Defense" || attackingCharacter[currentSkill]["boosting"] === "Attack and Defense"){
                defenseBoost = Math.ceil(characters[i]["currentDefense"] * (attackingCharacter[currentSkill]["value"] / 100))
                if(characters[i]["currentDefense"] + defenseBoost > characters[i]["maxDefense"]){
                    characters[i]["currentDefense"] = characters[i]["maxDefense"]
                    setTimeout(() => {
                        messageLogs.innerHTML = `Defense maxed`
                    }, 1000);
                } else {
                    characters[i]["currentDefense"] += defenseBoost
                    setTimeout(() => {
                        messageLogs.innerHTML = `Defense increased`
                    }, 1000);
                }
            }
            if(attackingCharacter[currentSkill]["boosting"] === "Health"){
                healthBoost = Math.ceil(characters[i]["health"] * (attackingCharacter[currentSkill]["value"] / 100))
                if(characters[i]["currentHealth"] + healthBoost > characters[i]["health"]){
                    characters[i]["currentHealth"] = characters[i]["health"]
                    setTimeout(() => {
                        messageLogs.innerHTML = `Health full`
                    }, 1000);
                } else {
                    characters[i]["currentHealth"] += healthBoost
                    setTimeout(() => {
                        messageLogs.innerHTML = `Health increased`
                    }, 1000);
                }
                healthSound.play()
            }
        }
    }
    healthBar()
    setTimeout(() => {
        deadChecker()
    }, 2000);
}

function skillSounds() {
    if(attackingCharacter[currentSkill]["name"] === "Slash" || 
       attackingCharacter[currentSkill]["name"] === "Slice" || 
       attackingCharacter[currentSkill]["name"] === "Chop" ||
       attackingCharacter[currentSkill]["name"] === "Pierce"){
        let skillSound = new Audio();
        skillSound.src = "sound effects/Slash.ogg"
        skillSound.play()
    }
    if(attackingCharacter[currentSkill]["name"] === "Touch Me Not" || 
       attackingCharacter[currentSkill]["name"] === "Unfair Judgement"){
        let skillSound = new Audio();
        skillSound.src = "sound effects/Touch Me Not.ogg"
        skillSound.play()
    }
    if(attackingCharacter[currentSkill]["name"] === "Precision Fire" ||
       attackingCharacter[currentSkill]["name"] === "Brutality"){
        let skillSound = new Audio();
        skillSound.src = "sound effects/Precision Fire.ogg"
        skillSound.play()
    } else if(attackingCharacter[currentSkill]["name"] === "Unleash Fire"){
        let skillSound = new Audio();
        skillSound.src = "sound effects/Unleash Fire.ogg"
        skillSound.play()
    }
    if(attackingCharacter[currentSkill]["name"] === "Ritual Curse"){
        let skillSound = new Audio();
        skillSound.src = "sound effects/Ritual Curse.ogg"
        skillSound.play()
    }
    if(attackingCharacter[currentSkill]["name"] === "Wing Slash"){
        let skillSound = new Audio();
        skillSound.src = "sound effects/Wing Slash.ogg"
        skillSound.play()
    } 
    if(attackingCharacter[currentSkill]["name"] === "Siren's Rage"){
        let skillSound = new Audio();
        skillSound.src = "sound effects/Siren's Rage.ogg"
        skillSound.play()
    } else if(attackingCharacter[currentSkill]["name"] === "Wrath of the Ocean"){
        let skillSound = new Audio();
        skillSound.src = "sound effects/Wrath of the Ocean.ogg"
        skillSound.play()
    }
    if(attackingCharacter[currentSkill]["name"] === "Slap"){
        let skillSound = new Audio();
        skillSound.src = "sound effects/Slap.ogg"
        skillSound.play()
    }
    if(attackingCharacter[currentSkill]["name"] === "Peck"){
        let skillSound = new Audio();
        skillSound.src = "sound effects/Peck.ogg"
        skillSound.play()
    } else if(attackingCharacter[currentSkill]["name"] === "Wild Charge"){
        let skillSound = new Audio();
        skillSound.src = "sound effects/Wild Charge.ogg"
        skillSound.play()
    }
}
