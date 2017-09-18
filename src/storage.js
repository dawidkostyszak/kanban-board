const storage = {};

export const save = (key, value) => { storage[key] = value; };
export const load = (key) => storage[key];
export const remove = (key) => delete storage[key];

export default {
    save,
    load,
    remove,
};
