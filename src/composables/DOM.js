const select = (p) => document.querySelector(p);
const selectAll = (p) => document.querySelectorAll(p);
const selectFrom = (p, c) => document.querySelector(p + " " + c);
const selectFromAll = (p, c) => document.querySelectorAll(p + " " + c);

export { select, selectAll, selectFrom, selectFromAll };
