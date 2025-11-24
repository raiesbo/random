async function connectToServer() {
    const ws = new WebSocket('ws://localhost:3000/');

    return new Promise((resolve) => {
        const timer = setInterval(() => {
            if (ws.readyState !== 1) return
            clearInterval(timer)
            resolve(ws);
        }, 10);
    });
}

const getOrCreateCursorFor = (message) => {
    const sender = message.sender;
    const existing = document.querySelector(`[data-sender='${sender}']`);
    if (existing) return existing;

    const template = document.getElementById('cursor')
    const cursor = template.content.firstElementChild.cloneNode(true)
    const svgPath = cursor.getElementsByTagName('path')[0]

    cursor.setAttribute('data-sender', sender)
    svgPath.setAttribute('fill', `hsl(${message.color}, 50%, 50%)`)
    document.body.appendChild(cursor)

    return cursor
}

(async function () {
    const ws = await connectToServer();

    document.body.onmousemove = (evt) => {
        const messageBody = {x: evt.clientX, y: evt.clientY}
        ws.send(JSON.stringify(messageBody))
    }

    ws.onmessage = (wsMessage) => {
        const messageBody = JSON.parse(wsMessage.data)
        const cursor = getOrCreateCursorFor(messageBody)
        cursor.style.transform = `translate(${messageBody.x}px, ${messageBody.y}px)`
    }

    ws.onerror = (error) => {
        console.log("WebSocket failure", error)
    }

    ws.onclose = (event) => {
        console.log("Connection closed", event)
    }
}())

