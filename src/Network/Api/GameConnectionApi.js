import webSocketService from "../WebSocketService";

//Singleton
export default Object.freeze({
    connect(options) {
        webSocketService.connect(options);
    },

    send(data) {
        webSocketService.send(data);
    },

    close(code, reason) {
        webSocketService.close(code, reason);
    }
})