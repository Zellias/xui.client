# xui.client Library
![Alt Text](https://mrwgifs.com/wp-content/uploads/2013/09/The-Lizard-Needs-To-Internet-On-That-Dial-Up-Connection.gif)

This is a Node.js client library for interacting with XUI-PANEL.

[Join Discord Server](https://discord.gg/zellias)

> **Installation**

You can install this library using npm:
```bash
npm install xui.client
```

> **Usage**

Here's how you can use this library in your Node.js application:

```js
const { XuiPanelClient,BitConverter } = require('xui.client');

async function main() {
    const xui = new XuiPanelClient();

        await xui.login('link', 'username','password');
        const listData = await xui.list();
        
        // Datas you can get
        console.log(console.log(listData.obj[0].clientStats))
        console.log(console.log(listData.obj[0].down))
        console.log(console.log(listData.obj[0].enable))
        console.log(console.log(listData.obj[0].expiryTime))
        console.log(console.log(listData.obj[0].id))
        console.log(console.log(listData.obj[0].listen))
        console.log(console.log(listData.obj[0].port))
        console.log(console.log(listData.obj[0].protocol))
        console.log(console.log(listData.obj[0].remark))
        console.log(console.log(listData.obj[0].settings))
        console.log(console.log(listData.obj[0].sniffing))
        console.log(console.log(listData.obj[0].tag))
        console.log(console.log(listData.obj[0].total))
        console.log(console.log(listData.obj[0].up))

        xui.addClient(1, "te2st@example.com", "client2-uuid").then((response) => {
            console.log(response);
        });
}

main();
```
## **API Documentation**
![API DOCUMENT GIF](https://i0.wp.com/leslielaskinreese.com/wp-content/uploads/2014/05/bb-31.gif?resize=499%2C274)

### `XuiPanelClient`


**`constructor()`**

Creates a new XUI-PANEL client.

**`login(url, username, password)`**
Logs in to a specified XUI-PANEL URL using the provided username and password.

`url` (string): The URL where the login should be performed.
`username` (string): The username for authentication.
`password` (string): The password for authentication.
Returns a Promise that resolves with the Axios response containing cookies when the login is successful or rejects on failure.

**`list()`**
Fetches a list from the XUI-PANEL using the current session cookies.

Returns a Promise that resolves with the list data or rejects on failure.

### `BitConverter`
Utility class for bit conversions.

**`bitsToKilobytes(bits)`**
Converts bits to kilobytes.

`bits` (number): The number of bits to convert.
Returns the equivalent value in kilobytes.

**`bitsToMegabytes(bits)`**
Converts bits to megabytes.

`bits` (number): The number of bits to convert.
Returns the equivalent value in megabytes.

**`bitsToGigabytes(bits)`**
Converts bits to gigabytes.

`bits` (number): The number of bits to convert.
Returns the equivalent value in gigabytes.

**`addClient(inboundId, email, uuid, enable = true, flow = "", limitIp = 0, totalGb = 0, expireTime = 0, telegramId = "", subscriptionId = "")`**
Adds a new client to an existing inbound in the XUI-PANEL.

Parameters:
- `inboundId` (number): The ID of the inbound where the client will be added.
- `email` (string): The email address of the client.
- `uuid` (string): The UUID (Universally Unique Identifier) of the client.
- `enable` (boolean, optional): Whether the client is enabled. Default is true.
- `flow` (string, optional): The flow associated with the client. Default is an empty string.
- `limitIp` (number, optional): The IP limit for the client. Default is 0 (no limit).
- `totalGb` (number, optional): The total data transfer limit for the client in gigabytes. Default is 0 (no limit).
- `expireTime` (number, optional): The client's expiration time in timestamp (epoch) format. Default is 0 (no expiration).
- `telegramId` (string, optional): The Telegram ID of the client. Default is an empty string.
- `subscriptionId` (string, optional): The subscription ID of the client. Default is an empty string.

Returns a Promise that resolves with a boolean indicating the success of adding the client or rejects on failure.
