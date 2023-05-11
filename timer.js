class Timer
{
    constructor()
    {
        this.time;
    }

    drawTime()
    {
        fill(255);
        textSize(20);
        textAlign(CENTER);

        text('Timer: ' + this.updateTime(),width/16,height/16);
    }

    updateTime()
    {
        //calculates the amount of time in seconds since
        //the program started running  
        this.time = floor(millis()/1000);
        //subtracts the seconds from 60 to create a countdown
        this.time = 60 - this.time
        //returns the count down as an int
        return this.time
    }

}