/**
 * Sébastien Bart
 * Mikolaï Krol
 * Groupe 6
 */

const LEFT = Symbol('LEFT');
const RIGHT = Symbol('RIGHT');
const UP = Symbol('UP');
const DOWN = Symbol('DOWN');
const NONE = Symbol('NONE');

export default class MoveState {
  static get LEFT() { return LEFT; }
  static get RIGHT() { return RIGHT; }
  static get UP() { return UP; }
  static get DOWN() {return DOWN; }
  static get NONE() {return NONE; }
}