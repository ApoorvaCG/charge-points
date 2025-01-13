import { useReducer } from "react";

export const useChargePoints = () => {
  const initialState = {
    numChargepoints: 20,
    arrivalMultiplier: 100, // Default 100% multiplier
    energyConsumption: 18, // kWh per EV
    chargingPower: 11, // kW per chargepoint
    totalEnergyCharged: 0,
    maxPowerDemand: 0,
    actualPowerDemand: 0,
    concurrencyFactor: 0,
    chargingEvents: {
      day: 0,
      week: 0,
      month: 0,
      year: 0,
    },
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_INPUTS": {
        const {
          numChargepoints,
          arrivalMultiplier,
          energyConsumption,
          chargingPower,
        } = action.payload;

        // Perform calculations
        const totalEnergyCharged = numChargepoints * 1000; // Example calculation
        const maxPowerDemand = numChargepoints * chargingPower;
        const actualPowerDemand = maxPowerDemand * 0.4; // Example concurrency factor
        const concurrencyFactor =
          maxPowerDemand > 0
            ? ((actualPowerDemand / maxPowerDemand) * 100).toFixed(2)
            : 0;
        const chargingEvents = {
          day: Math.round(numChargepoints * 2),
          week: Math.round(numChargepoints * 14),
          month: Math.round(numChargepoints * 60),
          year: Math.round(numChargepoints * 730),
        };

        return {
          ...state,
          numChargepoints,
          arrivalMultiplier,
          energyConsumption,
          chargingPower,
          totalEnergyCharged,
          maxPowerDemand,
          actualPowerDemand,
          concurrencyFactor,
          chargingEvents,
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateInputs = (formValues) => {
    dispatch({ type: "UPDATE_INPUTS", payload: formValues});
  };

  return { state, updateInputs, initialState };
};
