function statBoostPicker(stat){
    enhanceSound.play()
    document.getElementById("battleButtons").innerHTML = ""
    if(stat === "attack"){
        player1.attack += 1
        player2.attack += 1
        player3.attack += 1
        player1.maxAttack += 1
        player2.maxAttack += 1
        player3.maxAttack += 1
    } else if(stat === "defense"){
        player1.defense += 1
        player2.defense += 1
        player3.defense += 1
        player1.maxDefense += 1
        player2.maxDefense += 1
        player3.maxDefense += 1
    } else if(stat === "health"){
        player1.health += 1
        player2.health += 1
        player3.health += 1
    }
    resetRound(nextRound, nextLevel)
}

function resetRound(round, level){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    canvas.style.backgroundSize = "100% 100%"
    if(level === 1){
        canvas.style.backgroundImage = "url(images/backgrounds/forest.png)"
        if(round === 1){
            enemy1 = duwende1
            enemy2 = duwende2
            enemy3 = duwende3
            nextRound = 2
            nextLevel = 1
            characterSelectMusic.pause()
            characterSelectMusic.currentTime = 0
            battleMusic1.play()
            setTimeout(() => {
                intro()
            }, 1000);
        } else if(round === 2){
            enemy1 = kapre
            enemy2 = duwende1
            enemy3 = duwende2
            nextRound = 1
            nextLevel = 2
            battleMusic1.currentTime = 0
        }
    } else if(level === 2){
        canvas.style.backgroundImage = "url(images/backgrounds/spanish.png)"
        if(round === 1){
            enemy1 = spanishSoldier1
            enemy2 = spanishSoldier2
            enemy3 = spanishSoldier3
            nextRound = 2
            nextLevel = 2
            battleMusic1.pause()
            battleMusic1.currentTime = 0
            battleMusic2.play()
        } else if(round === 2){
            enemy1 = duwende1
            enemy2 = spanishSoldier1
            enemy3 = spanishSoldier2
            nextRound = 3
            nextLevel = 2
            battleMusic2.play()
        } else if(round === 3){
            enemy1 = magellan
            enemy2 = spanishSoldier1
            enemy3 = spanishSoldier2
            nextRound = 1
            nextLevel = 3
            battleMusic2.pause()
            battleMusic2.currentTime = 0
            miniBossMusic.play()
            setTimeout(() => {
                intro()
            }, 1000);
        }
    } else if(level === 3){
        canvas.style.backgroundImage = "url(images/backgrounds/streets.png)"
        if(round === 1){
            enemy1 = spanishSoldier1
            enemy2 = duwende1
            enemy3 = duwende2
            nextRound = 2
            nextLevel = 3
            miniBossMusic.pause()
            miniBossMusic.currentTime = 0
            battleMusic2.play()
        } else if(round === 2){
            enemy1 = corruptPolice1
            enemy2 = spanishSoldier1
            enemy3 = duwende1
            nextRound = 3
            nextLevel = 3
            battleMusic2.play()
        } else if(round === 3){
            enemy1 = corruptPolice3
            enemy2 = spanishSoldier1
            enemy3 = spanishSoldier2
            nextRound = 4
            nextLevel = 3
            battleMusic2.play()
        } else if(round === 4){
            enemy1 = corruptPolice1
            enemy2 = corruptPolice2
            enemy3 = kapre
            nextRound = 5
            nextLevel = 3
            battleMusic2.play()
        } else if(round === 5){
            enemy1 = corruptPolitician
            enemy2 = corruptPolice1
            enemy3 = kapre
            nextLevel = 0
            battleMusic2.pause()
            battleMusic2.currentTime = 0
            finalBossMusic.play()
            setTimeout(() => {
                intro()
            }, 1000);
        }
    }
    enemy1IdleSpritesheet.src = enemy1.idle.spritesheetSrc
    enemy2IdleSpritesheet.src = enemy2.idle.spritesheetSrc
    enemy3IdleSpritesheet.src = enemy3.idle.spritesheetSrc
    enemy1EnhanceSpritesheet.src = enemy1.enhance.spritesheetSrc
    enemy2EnhanceSpritesheet.src = enemy2.enhance.spritesheetSrc
    enemy3EnhanceSpritesheet.src = enemy3.enhance.spritesheetSrc

    player1.currentHealth = player1.health
    player1.currentAttack = player1.attack
    player1.currentDefense = player1.defense

    player2.currentHealth = player2.health
    player2.currentAttack = player2.attack
    player2.currentDefense = player2.defense

    player3.currentHealth = player3.health
    player3.currentAttack = player3.attack
    player3.currentDefense = player3.defense
    
    for(let i = level; i < 4; i++){
        enemy1.health += ((i-1) * 5)
        enemy1.attack += ((i-1) * 5)
        enemy1.defense += ((i-1) * 5)
        enemy1.maxAttack += ((i-1) * 5)
        enemy1.maxDefense += ((i-1) * 5)

        enemy2.health += ((i-1) * 5)
        enemy2.attack += ((i-1) * 5)
        enemy2.defense += ((i-1) * 5)
        enemy2.maxAttack += ((i-1) * 5)
        enemy2.maxDefense += ((i-1) * 5)

        enemy3.health += ((i-1) * 5)
        enemy3.attack += ((i-1) * 5)
        enemy3.defense += ((i-1) * 5)
        enemy3.maxAttack += ((i-1) * 5)
        enemy3.maxDefense += ((i-1) * 5)
        break
    }

    enemy1.currentHealth = enemy1.health
    enemy1.currentAttack = enemy1.attack
    enemy1.currentDefense = enemy1.defense

    enemy2.currentHealth = enemy2.health
    enemy2.currentAttack = enemy2.attack
    enemy2.currentDefense = enemy2.defense

    enemy3.currentHealth = enemy3.health
    enemy3.currentAttack = enemy3.attack
    enemy3.currentDefense = enemy3.defense

    setTimeout(() => {
        startBattle()
    }, 500);
}
let introCounter = 0
let introLoop
let playerIntro = new Image();
let bubble = new Image();
function intro() {
    if(nextLevel === 1 && nextRound === 2){
        bubble.src = "images/Portraits/textBubble1.png"
        ctx.drawImage(bubble, 0, 0, gridLength * 5, gridLength * 1.5)
        ctx.textAlign = "center"
        ctx.font = `20px Verdana`
        if(introCounter < 600){
            if(introCounter <= 200){
                playerIntro.src = `images/Portraits/${player1.name}_nobg.png`
                ctx.fillText(player1.speech, gridLength * 2.5, gridLength / 2)
            } else if(introCounter <= 400){
                playerIntro.src = `images/Portraits/${player2.name}_nobg.png`
                ctx.fillText(player2.speech, gridLength * 2.5, gridLength / 2)
            } else if(introCounter <= 600){
                playerIntro.src = `images/Portraits/${player3.name}_nobg.png`
                ctx.fillText(player3.speech, gridLength * 2.5, gridLength / 2)
            }
            ctx.clearRect(gridLength * 2.5, gridLength * 1.5, gridLength * 2.5, gridLength * 2.5)
            ctx.drawImage(playerIntro, gridLength * 2.5, gridLength * 1.5, gridLength * 2.5, gridLength * 2.5)
            introCounter++
            introLoop = requestAnimationFrame(intro)
        } else {
            ctx.clearRect(0, 0, gridLength * 5, gridLength * 4)
            healthBar()
            introCounter = 0
            cancelAnimationFrame(introLoop)
        }
    }  else {
        bubble.src = "images/Portraits/textBubble2.png"
        ctx.drawImage(bubble, 0, 0, gridLength * 5, gridLength * 1.5)
        ctx.textAlign = "center"
        ctx.fillStyle = "black"
        ctx.font = `20px Verdana`
        if(introCounter < 200){
            playerIntro.src = `images/Portraits/${enemy1.name}_nobg.png`
            ctx.fillText(enemy1.speech, gridLength * 2.5, gridLength / 2)
            ctx.clearRect(0, gridLength * 1.5, gridLength * 2.5, gridLength * 2.5)
            ctx.drawImage(playerIntro, 0, gridLength * 1.5, gridLength * 2.5, gridLength * 2.5)
            introCounter++
            introLoop = requestAnimationFrame(intro)
        } else {
            ctx.clearRect(0, 0, gridLength * 5, gridLength * 4)
            healthBar()
            introCounter = 0
            cancelAnimationFrame(introLoop)
        }
    }
}
