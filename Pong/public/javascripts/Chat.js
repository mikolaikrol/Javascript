export default class Chat {
    constructor(game){
        this.game = game;
        this.ul = document.getElementById("messages");
        this.input = document.getElementById("m");
        this.form = document.getElementById("form");
        this.form.addEventListener("submit", (ev) => this.sendMessage(ev));
        this.game.socket.on("message", str => this.addMessage(str, false));
    }

    sendMessage(e){
        e.preventDefault();
        this.game.socket.emit("message", this.input.value);
        this.addMessage(this.input.value, true);
        this.input.value = "";
    }

    addMessage(str, bool){
        let li = document.createElement("li");
        bool ? (li.classList.add("me"), li.textContent = "me : " + str) : li.textContent = "opponent : " + str;
        this.ul.appendChild(li);
    }
}