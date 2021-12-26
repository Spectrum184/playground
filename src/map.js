class HashMap {
    #hashMap
    constructor() {
        this.#hashMap = []
    }

    /**
      * hash string to hash value
      * @var string stringKey
      * @returns hash
      */
    #hashKey(stringKey) {
        let hash = 0;

        for (let i = 0; i < stringKey.length; i++) {
            const charCode = stringKey.charCodeAt(i);

            hash = ((hash << 5) - hash) + charCode;

            hash |= 0;
        }

        return hash
    }

    /**
      * set new item into array hash map
      * @var string key
      * @var any value
      * @returns void
      */
    set(key, value) {
        let id = this.#hashKey(key);

        if (!this.#hashMap[id]) {
            this.#hashMap[id] = [];
        }

        this.#hashMap[id].push([key, value]);
    }

    /**
      * get value by key, return undefined if don't have value
      * @var string key
      * @returns value
      */
    get(key) {
        let id = this.#hashKey(key);

        if (!this.#hashMap[id]) {
            return undefined;
        }

        for (const keyVal of this.#hashMap[id]) {
            if (keyVal[0] === key) {
                return keyVal[1];
            }
        }
    }
}

const hashMap = new HashMap()

hashMap.set("Thanh", { a: 'ok' })

const value = hashMap.get("Thanh")
const value1 = hashMap.get("Th")

console.log(value, value1)