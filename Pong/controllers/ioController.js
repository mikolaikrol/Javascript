class IoController {
    constructor(){}

    registerSocket(socket) { 
        let number = socket.client.conn.server.clientsCount;
        socket.emit("become", number, socket.num);

        switch (number) {
            case 1:
                socket.emit("opponent_offline");
                break;
            case 2:
                socket.emit("opponent_online");
                break;
            default:
                break;
        }

        socket.broadcast.emit("reset");

        socket.on("join", (old, n) => {
            socket.leave(old);
            socket.num = n;
            socket.join(n);
        });

        socket.on("disconnect", () => 
            {
                let number = socket.client.conn.server.clientsCount;
                let index = [...Array(number + 1).keys()].filter(x => x >= socket.num);
                index.forEach(n => socket.to((n+1).toString()).emit("become", n));
                socket.to("1").to("2").emit("opponent_offline");
            }
        );

        socket.on("opponent_online", ()=> socket.broadcast.emit("opponent_online"));

        socket.on("ball_launched", (x, y, dx, dy) => socket.broadcast.emit("ball_launched", x, y, dx, dy));
        socket.on("ball_state", (x,y,dx,dy) => socket.broadcast.emit("ball_state", x, y, dx, dy));
        socket.on("rightPaddleUp", () => socket.broadcast.emit("rightPaddleUp")); 
        socket.on("rightPaddleDown", () => socket.broadcast.emit("rightPaddleDown"));   
        socket.on("rightPaddleStop", (y) => socket.broadcast.emit("rightPaddleStop", y)); 

        socket.on("message", str => socket.broadcast.emit("message", str));
    }

}

module.exports = new IoController();