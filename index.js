const axios = require('axios');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');
/**
 * Represents a client for interacting with XUI-PANEL.
 * @class
 */
class XuiPanelClient {
    /**
     * Creates a new XUI-PANEL client.
     */
    constructor() {
        /**
         * The session cookies.
         * @type {string}
         */
        this.cookies = ''; // Initialize cookies to store session information

        /**
         * The URL of the XUI-PANEL client.
         * @type {string}
         */
        this.url = ''; // URL of the XUI-PANEL client
    }

    // Define a module-level variable to describe the structure of the response
    /**
     * The structure of the XUI-PANEL list response.
     * @typedef {Object} XuiPanelListResponse
     * @property {boolean} success - Indicates whether the request was successful.
     * @property {string} msg - A message related to the request result.
     * @property {Array<Obj>} obj - An array of objects containing list data.
     */

    /**
     * Represents an object in the list response.
     * @typedef {Object} Obj
     * @property {number} id - The ID of the object.
     * @property {number} up - The upload property description.
     * @property {number} down - The download property description.
     * @property {number} total - The total property description.
     * @property {string} remark - The remark property description.
     * @property {boolean} enable - The enable property description.
     * @property {number} expiryTime - The expiryTime property description.
     * @property {Array<ClientStats>} clientStats - An array of client stats.
     * @property {string} listen - The listen property description.
     * @property {number} port - The port number.
     * @property {string} protocol - The protocol property description.
     * @property {string} settings - The settings property description.
     * @property {string} tag - The tag property description.
     * @property {string} sniffing - The sniffing property description.
     */

    /**
     * Represents client statistics.
     * @typedef {Object} ClientStats
     * @property {number} id - The ID of the client stats.
     * @property {number} inboundId - The ID of the inbound.
     * @property {boolean} enable - The enable property description.
     * @property {string} email - The email address.
     * @property {number} up - The upload property description.
     * @property {number} down - The download property description.
     * @property {number} expiryTime - The expiryTime property description.
     * @property {number} total - The total property description.
     */

    /**
     * Logs in to a specified XUI-PANEL URL using the provided username and password.
     *
     * @param {string} url - The URL where the login should be performed.
     * @param {string} username - The username for authentication.
     * @param {string} password - The password for authentication.
     * @returns {Promise<XuiPanelListResponse>} A promise that resolves with the Axios response containing cookies when the login is successful or rejects on failure.
     */
    async login(url, username, password) {
        try {
            const response = await axios.post(`${url}/login`, { username, password }, { withCredentials: true });

            if (response.data.success) {
                this.url = url;
                this.cookies = response.headers['set-cookie'][0]; // Store cookies for session

                /**
                 * The response data from the login.
                 * @type {Object}
                 * @property {boolean} success - Indicates whether the login was successful.
                 * @property {string} message - A message related to the login result.
                 */
                return response.data; // Return the Axios response data
            } else {
                throw new Error("Login failed: The server responded with an error.");
            }
        } catch (error) {
            throw error; // Rethrow any errors that occurred during the login
        }
    }

    /**
     * Fetches a list from the XUI-PANEL using the current session cookies.
     * @returns {Promise<XuiPanelListResponse>} A promise that resolves with the list data or rejects on failure.
     */
    async list() {
        try {
            const response = await axios.post(`${this.url}/panel/inbound/list`, null, {
                headers: {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "en-US,en;q=0.9,fa;q=0.8",
                    "content-type": "application/json;charset=UTF-8", // Fix content-type
                    "x-requested-with": "XMLHttpRequest",
                    "cookie": this.cookies,
                    "Referer": `${this.url}/panel/inbounds`, // Use template literals
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                },
            });

            /**
             * The response data from the list request.
             * @type {Array<Obj>}
             */
            return response.data; // Return the list data
        } catch (error) {
            throw error; // Rethrow any errors that occurred during the request
        }
    }


    /**
 * Adds a new client to an existing inbound in the XUI-PANEL.
 *
 * @param {number} inboundId - The ID of the inbound where the client will be added.
 * @param {string} email - The email address of the client.
 * @param {string} uuid - The UUID (Universally Unique Identifier) of the client.
 * @param {boolean} enable - (Optional) Whether the client is enabled. Default is true.
 * @param {string} flow - (Optional) The flow associated with the client. Default is an empty string.
 * @param {number} limitIp - (Optional) The IP limit for the client. Default is 0 (no limit).
 * @param {number} totalGb - (Optional) The total data transfer limit for the client in gigabytes. Default is 0 (no limit).
 * @param {number} expireTime - (Optional) The expiration time for the client in timestamp (epoch) format. Default is 0 (no expiration).
 * @param {string} telegramId - (Optional) The Telegram ID of the client. Default is an empty string.
 * @param {string} subscriptionId - (Optional) The subscription ID of the client. Default is an empty string.
 * @returns {Promise<boolean>} A promise that resolves with a boolean indicating the success of adding the client or rejects on failure.
 */
async addClient(
    inboundId,
    email,
    uuid,
    enable = true,
    flow = "",
    limitIp = 0,
    totalGb = 0,
    expireTime = 0,
    telegramId = "",
    subscriptionId = ""
) {
    try {
        // Construct the client settings object
        const settings = {
            clients: [
                {
                    id: uuid,
                    email,
                    enable,
                    flow,
                    limitIp,
                    totalGB: totalGb,
                    expiryTime: expireTime,
                    tgId: telegramId,
                    subId: subscriptionId,
                },
            ],
            decryption: "none",
            fallbacks: [],
        };

        // Create parameters for the HTTP request
        const params = {
            id: inboundId,
            settings: JSON.stringify(settings),
        };

        // Make an HTTP POST request to add the client
        const response = await axios.post(`${this.url}/panel/inbound/addClient`, params, {
            headers: {
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'en-US,en;q=0.9,fa;q=0.8',
                'content-type': 'application/json;charset=UTF-8',
                'x-requested-with': 'XMLHttpRequest',
                'cookie': this.cookies,
                'Referer': `${this.url}/panel/inbounds`,
                'Referrer-Policy': 'strict-origin-when-cross-origin',
            },
        });

        if (response.data.success) {
            // Log the response and return true to indicate success
            console.log(response);
            return true;
        } else {
            // Throw an error if the server responded with an error
            throw new Error("Add client failed: The server responded with an error.");
        }
    } catch (error) {
        // Rethrow any errors that occurred during the process
        throw error;
    }
}



}

/**
 * Utility class for bit conversions.
 * @class
 */
class BitConverter {
    /**
     * Convert bits to kilobytes.
     * @param {number} bits - The number of bits to convert.
     * @returns {number} The equivalent value in kilobytes.
     */
    static bitsToKilobytes(bits) {
        return bits / 8 / 1024;
    }

    /**
     * Convert bits to megabytes.
     * @param {number} bits - The number of bits to convert.
     * @returns {number} The equivalent value in megabytes.
     */
    static bitsToMegabytes(bits) {
        return bits / 8 / 1024 / 1024;
    }

    /**
     * Convert bits to gigabytes.
     * @param {number} bits - The number of bits to convert.
     * @returns {number} The equivalent value in gigabytes.
     */
    static bitsToGigabytes(bits) {
        return bits / 8 / 1024 / 1024 / 1024;
    }
}
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

module.exports = { XuiPanelClient,BitConverter };
