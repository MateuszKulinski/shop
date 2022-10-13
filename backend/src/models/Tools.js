class Tools {
    generatePassword = () => {
        let length = 8,
            charset =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    };
    getRandomEntitlements = () => {
        const randomCount = Math.floor(Math.random() * 100);
        if (randomCount < 80) {
            return 1;
        } else if (randomCount < 92) {
            return 2;
        } else {
            return 3;
        }
    };

    getRandom = (max) => {
        const randomCount = Math.floor(Math.random() * max);
        if (randomCount < 65) {
            return 1;
        } else if (randomCount < 95) {
            return 2;
        } else {
            return 3;
        }
    };

    getId = (max) => {
        return Math.floor(Math.random() * (max - 1)) + 1;
    };

    makeIndex = (max) => {
        let result = "";
        let characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < max; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length)
            );
        }
        return result;
    };
}

module.exports = new Tools();
