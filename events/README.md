## EVENTS
Thanks to [discord-logs](https://github.com/Androz2091/discord-logs) you can easily handle many events then discord.js provides.
[Click here](https://discord-logs.js.org/) to see the list of all the handled events!

### How to create a new event handler?
Create a file with the events name: `eventName.js`
```node
module.exports = {
    name: 'eventName',
    // Client is always the last parameter
    async execute(eventsParameter, client) {
        client.logger.info(eventsParameter)
    }
};
```
