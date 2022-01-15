function characterHitChecker(){
    document.getElementById("battleButtons").innerHTML = ""
    messageLogs.innerHTML = `${attackingCharacter.name} used ${attackingCharacter[currentSkill]["name"]}`
    setTimeout(() => {
        if(attackingCharacter === player1){
            cancelAnimationFrame(player1IdleLoop)
        } else if(attackingCharacter === player2){
            cancelAnimationFrame(player2IdleLoop)
        } else if(attackingCharacter === player3){
            cancelAnimationFrame(player3IdleLoop)
        } else if(attackingCharacter === enemy1){
            cancelAnimationFrame(enemy1IdleLoop)
        } else if(attackingCharacter === enemy2){
            cancelAnimationFrame(enemy2IdleLoop)
        } else if(attackingCharacter === enemy3){
            cancelAnimationFrame(enemy3IdleLoop)
        }

        gameFrameAttackingCharacter = 0
        frameAttackingCharacter = 0
        gameFrameTargetCharacter = 0
        frameTargetCharacter = 0
        
        attackingCharacterSkillSpritesheet.src = attackingCharacter[currentSkill]["spritesheetSrc"]
        if(attackingCharacter[currentSkill]["type"] === "Attack"){
            for(let i = 0; i < 6; i++){
                if(targetCharacter === characters[i]){
                    isTargetHit[i] = true
                    skillSounds()
                    break
                }
            }
        } else {
            enhanceSound.play()
        }
        attackingCharacterSkill()
    }, 1000);
}

function changeAttackingCharacter(attacker){
    for(let i= 0; i < 6; i++){
        if(attacker === characters[i]){
            attackingCharacter = characters[i]
            characterPosX = characterPosXArray[i]
            characterPosY = characterPosYArray[i]
            attackingCharacterEnhanceSpritesheet.src = attackingCharacter.enhance.spritesheetSrc
            messageLogs.innerHTML = `${characters[i].name}'s turn`
            break
        }
    }
}
function changeTargetCharacter(target){
    buttonSound.play()
    for(let i = 0; i < 6;i++){
        if(target === characters[i]){
            targetCharacter = characters[i]
            characterHitPosX = characterPosXArray[i]
            characterHitPosY = characterPosYArray[i]
            targetCharacterHitSpritesheet.src = targetCharacter.hit.spritesheetSrc
            characterHitChecker(currentSkill)
            break
        }
    }
}

function player1Idle(){
    if(isTargetHit[0] === false){
        ctx.clearRect(gridLength * 3, gridLength * 2.5, gridLength, gridLength)
        ctx.drawImage(player1IdleSpritesheet, framePlayer1 * spriteWidth, 0, spriteWidth, spriteHeight, gridLength * 3, gridLength * 2.5, gridLength, gridLength)
        if (gameFramePlayer1 % animationSpeed === 0) {
            if (framePlayer1 < player1.idle.frameCount) {
                framePlayer1++
            } else {
                (framePlayer1 = 0)
            }
        }
        gameFramePlayer1++
        player1IdleLoop = requestAnimationFrame(player1Idle)
    }
}
function player2Idle(){
    if(isTargetHit[1] === false){
        ctx.clearRect(gridLength * 4, gridLength * 2, gridLength, gridLength)
        ctx.drawImage(player2IdleSpritesheet, framePlayer2 * spriteWidth, 0, spriteWidth, spriteHeight, gridLength * 4, gridLength * 2, gridLength, gridLength)
        if (gameFramePlayer2 % animationSpeed === 0) {
            if (framePlayer2 < player2.idle.frameCount) {
                framePlayer2++
            } else {
                (framePlayer2 = 0)
            }
        }
        gameFramePlayer2++
        player2IdleLoop = requestAnimationFrame(player2Idle)
    }
}
function player3Idle(){
    if(isTargetHit[2] === false){
        ctx.clearRect(gridLength * 4, gridLength * 3, gridLength, gridLength)
        ctx.drawImage(player3IdleSpritesheet, framePlayer3 * spriteWidth, 0, spriteWidth, spriteHeight, gridLength * 4, gridLength * 3, gridLength, gridLength)
        if (gameFramePlayer3 % animationSpeed === 0) {
            if (framePlayer3 < player3.idle.frameCount) {
                framePlayer3++
            } else {
                (framePlayer3 = 0)
            }
        }
        gameFramePlayer3++
        player3IdleLoop = requestAnimationFrame(player3Idle)
    }
}

let idleFunctions = [player1Idle, player2Idle, player3Idle, enemy1Idle, enemy2Idle, enemy3Idle]

function attackingCharacterSkill(){
    if (attackingCharacter[currentSkill]["type"] === "Attack") {
        if(gameFrameAttackingCharacter !== (attackingCharacter[currentSkill]["frameCount"] * animationSpeed)){
        ctx.clearRect(characterPosX, characterPosY, gridLength, gridLength)
            ctx.drawImage(attackingCharacterSkillSpritesheet, frameAttackingCharacter * spriteWidth, 0, spriteWidth, spriteHeight, characterPosX, characterPosY, gridLength, gridLength)
            if (gameFrameAttackingCharacter % animationSpeed === 0) {
                if (frameAttackingCharacter < attackingCharacter[currentSkill]["frameCount"]) {
                    frameAttackingCharacter++
                } else {
                    (frameAttackingCharacter = 0)
                }
            }
            gameFrameAttackingCharacter++
            requestAnimationFrame(attackingCharacterSkill)
        } else {
            checkAccuracy()
        }
    } else if(attackingCharacter[currentSkill]["type"] === "Enhancer"){
        if(gameFrameAttackingCharacter !== (13 * animationSpeed) - 4 ){
        ctx.clearRect(characterPosX, characterPosY, gridLength, gridLength)
            ctx.drawImage(attackingCharacterEnhanceSpritesheet, frameAttackingCharacter * spriteWidth, 0, spriteWidth, spriteHeight, characterPosX, characterPosY, gridLength, gridLength)
            if (gameFrameAttackingCharacter % animationSpeed === 0) {
                if (frameAttackingCharacter < 12) {
                    frameAttackingCharacter++
                } else {
                    (frameAttackingCharacter = 0)
                }
            }
            gameFrameAttackingCharacter++
            requestAnimationFrame(attackingCharacterSkill)
        } else {
            for(let i = 0; i < 6; i++){
                if(attackingCharacter === characters[i]){
                    for(let j = 0; j < 3; j++){
                        isEnchancing[j] = true
                    }
                    idleFunctions[i]()
                    break
                }
            }
            checkEnchancing(currentSkill)
        }
    } else if(attackingCharacter[currentSkill]["type"] === "Party Enhancer"){
        gameFramePlayer1 = 0
        gameFramePlayer2 = 0
        gameFramePlayer3 = 0
        gameFrameEnemy1 = 0
        gameFrameEnemy2 = 0
        gameFrameEnemy3 = 0
        framePlayer1 = 0
        framePlayer2 = 0
        framePlayer3 = 0
        frameEnemy1 = 0
        frameEnemy2 = 0
        frameEnemy3 = 0
        if(attackingCharacter === player1 || attackingCharacter === player2 || attackingCharacter === player3){
            cancelAnimationFrame(player1IdleLoop)
            cancelAnimationFrame(player2IdleLoop)
            cancelAnimationFrame(player3IdleLoop)
            player1Enhance()
            player2Enhance()
            player3Enhance()
        } else{
            cancelAnimationFrame(enemy1IdleLoop)
            cancelAnimationFrame(enemy2IdleLoop)
            cancelAnimationFrame(enemy3IdleLoop)
            enemy1Enhance()
            enemy2Enhance()
            enemy3Enhance()
        }
        setTimeout(() => {
            checkEnchancing(currentSkill)
        }, 2000);
    }
}

function player1Enhance(){
    if(isDead[0] === false){
        if(gameFramePlayer1 !== (13 * animationSpeed) - 4 ){
            ctx.clearRect(gridLength * 3, gridLength * 2.5, gridLength, gridLength)
                ctx.drawImage(player1EnhanceSpritesheet, framePlayer1 * spriteWidth, 0, spriteWidth, spriteHeight, gridLength * 3, gridLength * 2.5, gridLength, gridLength)
                if (gameFramePlayer1 % animationSpeed === 0) {
                    if (framePlayer1 < 12) {
                        framePlayer1++
                    } else {
                        (framePlayer1 = 0)
                    }
                }
                gameFramePlayer1++
                requestAnimationFrame(player1Enhance)
            } else {
                player1Idle()
            }
    }
}
function player2Enhance(){
    if(isDead[1] === false){
        if(gameFramePlayer2 !== (13 * animationSpeed) - 4 ){
            ctx.clearRect(gridLength * 4, gridLength * 2, gridLength, gridLength)
                ctx.drawImage(player2EnhanceSpritesheet, framePlayer2 * spriteWidth, 0, spriteWidth, spriteHeight, gridLength * 4, gridLength * 2, gridLength, gridLength)
                if (gameFramePlayer2 % animationSpeed === 0) {
                    if (framePlayer2 < 12) {
                        framePlayer2++
                    } else {
                        (framePlayer2 = 0)
                    }
                }
                gameFramePlayer2++
                requestAnimationFrame(player2Enhance)
         } else {
            player2Idle()
         }
    }
}
function player3Enhance(){
    if(isDead[2] === false){
        if(gameFramePlayer3 !== (13 * animationSpeed) - 4 ){
            ctx.clearRect(gridLength * 4, gridLength * 3, gridLength, gridLength)
                ctx.drawImage(player3EnhanceSpritesheet, framePlayer3 * spriteWidth, 0, spriteWidth, spriteHeight, gridLength * 4, gridLength * 3, gridLength, gridLength)
                if (gameFramePlayer3 % animationSpeed === 0) {
                    if (framePlayer3 < 12) {
                        framePlayer3++
                    } else {
                        (framePlayer3 = 0)
                    }
                }
                gameFramePlayer3++
                requestAnimationFrame(player3Enhance)
            } else {
                player3Idle()
            }
        }
}
function enemy1Idle(){
    if(isTargetHit[3] === false){
        ctx.clearRect(gridLength, gridLength * 2.5, gridLength, gridLength)
        ctx.drawImage(enemy1IdleSpritesheet, frameEnemy1 * spriteWidth, 0, spriteWidth, spriteHeight, gridLength, gridLength * 2.5, gridLength, gridLength)
        if (gameFrameEnemy1 % animationSpeed === 0) {
            if (frameEnemy1 < enemy1.idle.frameCount) {
                frameEnemy1++
            } else {
                (frameEnemy1 = 0)
            }
        }
        gameFrameEnemy1++
        enemy1IdleLoop = requestAnimationFrame(enemy1Idle)
    }
}
function enemy2Idle(){
    if(isTargetHit[4] === false){
        ctx.clearRect(0, gridLength * 2, gridLength, gridLength)
        ctx.drawImage(enemy2IdleSpritesheet, frameEnemy2 * spriteWidth, 0, spriteWidth, spriteHeight, 0, gridLength * 2, gridLength, gridLength)
        if (gameFrameEnemy2 % animationSpeed === 0) {
            if (frameEnemy2 < enemy2.idle.frameCount) {
                frameEnemy2++
            } else {
                (frameEnemy2 = 0)
            }
        }
        gameFrameEnemy2++
        enemy2IdleLoop = requestAnimationFrame(enemy2Idle)
    }
}
function enemy3Idle(){
    if(isTargetHit[5] === false){
        ctx.clearRect(0, gridLength * 3, gridLength, gridLength)
        ctx.drawImage(enemy3IdleSpritesheet, frameEnemy3 * spriteWidth, 0, spriteWidth, spriteHeight, 0, gridLength * 3, gridLength, gridLength)
        if (gameFrameEnemy3 % animationSpeed === 0) {
            if (frameEnemy3 < enemy3.idle.frameCount) {
                frameEnemy3++
            } else {
                (frameEnemy3 = 0)
            }
        }
        gameFrameEnemy3++
        enemy3IdleLoop = requestAnimationFrame(enemy3Idle)
    }
}
function enemy1Enhance(){
    if(isDead[3] === false){
        if(gameFrameEnemy1 !== (13 * animationSpeed) - 4 ){
            ctx.clearRect(gridLength, gridLength * 2.5, gridLength, gridLength)
                ctx.drawImage(enemy1EnhanceSpritesheet, frameEnemy1 * spriteWidth, 0, spriteWidth, spriteHeight, gridLength, gridLength * 2.5, gridLength, gridLength)
                if (gameFrameEnemy1 % animationSpeed === 0) {
                    if (frameEnemy1 < 12) {
                        frameEnemy1++
                    } else {
                        (frameEnemy1 = 0)
                    }
                }
                gameFrameEnemy1++
                requestAnimationFrame(enemy1Enhance)
            } else {
                enemy1Idle()
            }
    }
}
function enemy2Enhance(){
    if(isDead[4] === false){
        if(gameFrameEnemy2 !== (13 * animationSpeed) - 4 ){
            ctx.clearRect(0, gridLength * 2, gridLength, gridLength)
                ctx.drawImage(enemy2EnhanceSpritesheet, frameEnemy2 * spriteWidth, 0, spriteWidth, spriteHeight, 0, gridLength * 2, gridLength, gridLength)
                if (gameFrameEnemy2 % animationSpeed === 0) {
                    if (frameEnemy2 < 12) {
                        frameEnemy2++
                    } else {
                        (frameEnemy2 = 0)
                    }
                }
                gameFrameEnemy2++
                requestAnimationFrame(enemy2Enhance)
            } else {
                enemy2Idle()
            }
    }
}
function enemy3Enhance(){
    if(isDead[5] === false){
        if(gameFrameEnemy3 !== (13 * animationSpeed) - 4 ){
            ctx.clearRect(0, gridLength * 3, gridLength, gridLength)
                ctx.drawImage(enemy3EnhanceSpritesheet, frameEnemy3 * spriteWidth, 0, spriteWidth, spriteHeight, 0, gridLength * 3, gridLength, gridLength)
                if (gameFrameEnemy3 % animationSpeed === 0) {
                    if (frameEnemy3 < 12) {
                        frameEnemy3++
                    } else {
                        (frameEnemy3 = 0)
                    }
                }
                gameFrameEnemy3++
                requestAnimationFrame(enemy3Enhance)
            } else {
                enemy3Idle()
            }
    }
}

function healthBar() {
    let healthBarXPos = [gridLength * 3 - 25, gridLength * 3 - 5, gridLength * 3 - 5, 20, 5, 5]
    let healthBarYPos = [gridLength / 2 - 5, 5, gridLength - 15, gridLength / 2 - 5, 5, gridLength - 15]

    for(let i = 0; i < 6; i++){
        let healthPercentage = Math.round(characters[i].currentHealth / characters[i].health * 100);
        if(healthPercentage <= 0){
            ctx.clearRect(healthBarXPos[i], healthBarYPos[i], gridLength * 2, gridLength / 4)
            ctx.fillStyle = "gray"
            ctx.fillRect(healthBarXPos[i], healthBarYPos[i], gridLength * 2, gridLength / 4);
            ctx.strokeRect(healthBarXPos[i], healthBarYPos[i], gridLength * 2, gridLength / 4);
        } else {

        ctx.clearRect(healthBarXPos[i], healthBarYPos[i], gridLength * 2, gridLength / 4)

        ctx.fillStyle = "gray"
        ctx.fillRect(healthBarXPos[i], healthBarYPos[i], gridLength * 2, gridLength / 4);
        ctx.fillStyle = "green"
        ctx.strokeStyle = "white"
        ctx.fillRect(healthBarXPos[i], healthBarYPos[i], gridLength * healthPercentage / 100 * 2, gridLength / 4)
        ctx.strokeRect(healthBarXPos[i], healthBarYPos[i], gridLength * 2, gridLength / 4);
        }
    }
}

function targetCharacterHit(){
    if(gameFrameTargetCharacter !== hitGameFrameLimit){
    ctx.clearRect(characterHitPosX, characterHitPosY, gridLength, gridLength)
        ctx.drawImage(targetCharacterHitSpritesheet, frameTargetCharacter * spriteWidth, 0, spriteWidth, spriteHeight, characterHitPosX, characterHitPosY, gridLength, gridLength)
        if (gameFrameTargetCharacter % animationSpeed === 0) {
            if (frameTargetCharacter < 1) {
                frameTargetCharacter++
            } else {
                (frameTargetCharacter = 0)
            }
        }
        gameFrameTargetCharacter++
        requestAnimationFrame(targetCharacterHit)
    } else {
        damageCalculation()
    }
}

