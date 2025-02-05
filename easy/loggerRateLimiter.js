/*
Создайте систему логирования, которая получает поток сообщений вместе с их временными метками.
Каждое уникальное сообщение должно печататься не чаще, чем раз в 10 секунд
(то есть, сообщение, напечатанное во временной метке t, предотвратит печать других идентичных сообщений до временной метки t + 10).
Все сообщения будут приходить в хронологическом порядке. Несколько сообщений могут поступить в одно и то же время.

Реализуйте класс Logger:
Logger() Инициализирует объект логгера.
bool shouldPrintMessage(int timestamp, string message)
Возвращает true, если сообщение должно быть напечатано в данной временной метке, в противном случае возвращает false
*/

/*
Input
[[], [1, "foo"], [2, "bar"], [3, "foo"], [8, "bar"], [10, "foo"], [11, "foo"]]
Output
[null, true, true, false, false, false, true]
*/
const MESSAGES = [[1, " "], [1, "foo"], [2, "bar"], [3, "foo"], [8, "bar"], [10, "foo"], [11, "foo"]];

class Logger {
    constructor() {
        this.messages = new Map();
    }

    shouldPrintMessage(timestamp, message) {
        if (!message || !timestamp) {
            return null;
        }
        if (!this.messages.has(message) || timestamp - this.messages.get(message) >= 10) {
            this.messages.set(message, timestamp);
            return true;
        }
        return false;
    }
}

const logger = new Logger();

const result = MESSAGES.map(item => logger.shouldPrintMessage(item[0], item[1]));
console.log(result);