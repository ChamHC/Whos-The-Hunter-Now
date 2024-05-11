export class Tools {
    constructor(scene, player, tool){
        this.scene = scene;
        this.player = player;
        this.tool = tool;
        this.isCompleted = false;

        this.create();
    }

    create(){   

    }

    update(){

    }
}

export class DadBelt extends Tools {
    constructor(scene, player, tool){
        super(scene, player, tool);
    }

    create(){
        console.log("Dad Belt created");
    }

    update(){
        console.log("Dad Belt Update")


        this.isCompleted = true;
    }
}

export class DashyFeather extends Tools {
    constructor(scene, player, tool){
        super(scene, player, tool);
    }

    create(){
        console.log("Dashy Feather created");
    }

    update(){
        console.log("Dashy Feather Update")

        this.isCompleted = true;
    }
}

export class SlimyBoot extends Tools {
    constructor(scene, player, tool){
        super(scene, player, tool);
    }

    create(){
        console.log("Slimy Boot created");
    }

    update(){
        console.log("Slimy Boot Update")

        this.isCompleted = true;
    }
}

export class SuspiciousMushroom extends Tools {
    constructor(scene, player, tool){
        super(scene, player, tool);
    }

    create(){
        console.log("Suspicious Mushroom created");
    }

    update(){
        console.log("Suspicious Mushroom Update")

        this.isCompleted = true;
    }
}

export class WoodenBuckler extends Tools {
    constructor(scene, player, tool){
        super(scene, player, tool);
    }

    create(){
        console.log("Wooden Buckler created");
    }

    update(){
        console.log("Wooden Buckler Update")

        this.isCompleted = true;
    }
}

export class WornHat extends Tools {
    constructor(scene, player, tool){
        super(scene, player, tool);
    }

    create(){
        console.log("Worn Hat created");
    }

    update(){
        console.log("Worn Hat Update")

        this.isCompleted = true;
    }
}