const { TABLE_STATUS } = require("../../../constants");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    const statusArray = [];
    // Deletes ALL existing entries
    await knex(TABLE_STATUS)
        .del()
        .then(() => {
            const first = { id: 1, name: "Nowe", color: "fff" };
            const second = { id: 2, name: "Opłacone", color: "d7ff0d" };
            const third = { id: 3, name: "Spakowane", color: "ffb700" };
            const fourth = { id: 4, name: "Wysłane", color: "0008ff" };
            const fifth = { id: 5, name: "Dostarczone", color: "00ff08" };
            const sixth = { id: 6, name: "Rezygnacja", color: "ff1100" };

            statusArray.push(first);
            statusArray.push(second);
            statusArray.push(third);
            statusArray.push(fourth);
            statusArray.push(fifth);
            statusArray.push(sixth);
        });
    await knex(TABLE_STATUS).insert(statusArray);
};
