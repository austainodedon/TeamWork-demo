"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItems = exports.getItem = exports.deleteItem = exports.updateItem = exports.createItem = void 0;

var _index = _interopRequireDefault(require("../index"));

var _queryUtil = require("../../utils/db_utils/queryUtil");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Add item to a table
const createItem = async (table, data) => {
  const values = Object.values(data);
  const keys = Object.keys(data).map(val => `"${val}"`);
  const columns = (0, _queryUtil.getColumns)(keys);
  const query = {
    text: `INSERT INTO ${table}(
      ${keys.toString()}
    ) VALUES(${columns}) RETURNING *`,
    values
  };

  try {
    const {
      rows
    } = await _index.default.query(query);
    return {
      error: null,
      result: rows[0]
    };
  } catch (error) {
    return {
      error: error.message,
      result: null
    };
  }
}; // UPDATE table_name
// SET column1 = value1, column2 = value2...., columnN = valueN
// WHERE[condition];
// Update a single item


exports.createItem = createItem;

const updateItem = async (table, id, data) => {
  const values = Object.values(data);
  const keys = Object.keys(data).map(val => `"${val}"`);
  const columns = (0, _queryUtil.getColumns)(keys);
  const query = {
    text: `UPDATE ${table} SET (${keys.toString()}) = (${columns}) WHERE id='${id}' RETURNING *`,
    values
  };

  try {
    const {
      rows
    } = await _index.default.query(query);
    return {
      error: null,
      result: rows[0]
    };
  } catch (error) {
    return {
      error: error.message
    };
  }
}; // Delete an item


exports.updateItem = updateItem;

const deleteItem = async (table, id) => {
  const query = {
    text: `DELETE FROM ${table} WHERE id=$1 `,
    values: [id]
  };

  try {
    const {
      rowCount
    } = await _index.default.query(query);
    return {
      error: null,
      result: rowCount
    };
  } catch (error) {
    return {
      error: error.message
    };
  }
}; // Get a single item from db, expect a single key value pair option


exports.deleteItem = deleteItem;

const getItem = async (table, option) => {
  const value = Object.values(option);
  const key = Object.keys(option)[0];
  const query = {
    text: `SELECT * FROM ${table} WHERE ${key}=$1`,
    values: value
  };

  try {
    const {
      rows
    } = await _index.default.query(query);
    return {
      error: null,
      result: rows[0]
    }; //return { error: null, result: formater(table, rows) };
  } catch (error) {
    return {
      error: error.message
    };
  }
}; // Get items froom the database


exports.getItem = getItem;

const getItems = async (table, condition = null) => {
  const value = condition ? Object.values(condition) : null;
  const key = condition ? Object.keys(condition).toString() : null;
  const query = !condition ? {
    text: `SELECT * FROM ${table}`
  } : {
    text: `SELECT * FROM ${table} WHERE "${key}"=$1 `,
    values: value
  };

  try {
    const {
      rows
    } = await _index.default.query(query);
    return {
      error: null,
      result: rows
    };
  } catch (error) {
    return {
      error: error.message
    };
  }
};

exports.getItems = getItems;
//# sourceMappingURL=helper.js.map