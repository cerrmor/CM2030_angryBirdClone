class Game
{
    gameOver()
    {
        fill(255);
        textSize(80);
        textAlign(CENTER);
        text("GAME OVER", width/2, height/2);
        noLoop();
    }

    win()
    {
        fill(255);
        textSize(80);
        textAlign(CENTER);
        text("Congratulations!!!!", width/2, height/2);
        text("You have Won", width/2, height/2+85);
        noLoop();
    }
}