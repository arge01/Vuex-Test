import {
  createStore
} from 'vuex'

import axios from 'axios'

export default createStore({
  state: {
    units: [],
    selectedUnits: [],
    filterUnits: [],
    filterName: null,

  },
  getters: {
    filteredUnits: (state) => {
      if (state.selectedUnits.length !== 0) {
        // There's selected units, return filtered
        return state.selectedUnits;
      } else {
        return
      }
    },
    isSelectedUnit: (state) => (unit) => {
      return state.selectedUnits.some((r) => r.age === unit.age);
    },
    filterUnitsData: (state) => {
      state.filterUnits = state.units;
      return state.filterUnits;
    },
  },
  mutations: {
    //first set units
    SET_UNITS: (state, units) => {
      state.units = units;
      state.filterUnits = units;
    },
    addUnitSelection(state, unit) {
      state.selectedUnits.push(unit);
    },
    removeUnitSelection(state, unit) {
      state.selectedUnits = state.selectedUnits.filter(
        (r) => r.age !== unit.age
      );
    },
    filterUpdateUnit(state, filter) {
      if ( filter ) {
        state.filterUnits = state.units.filter((f) => f.age === filter);
        state.filterName = filter;
      } else {
        state.filterUnits = state.units;
        state.filterName = null;
      }
    }
  },
  actions: {
    getUnits({
      commit
    }) {
      axios.get('data.json')
        .then(response => {
          commit('SET_UNITS', response.data.units);
        })
    },


  },
  modules: {}
});