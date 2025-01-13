import React, { useState } from "react";
import "./App.css";
import OutputView from "./OutputView.tsx";
import { useChargePoints } from "./useChargePoints.ts";

const ChargePoints = () => {
  const { state, updateInputs, initialState } = useChargePoints();
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    numChargepoints: initialState.numChargepoints,
    arrivalMultiplier: initialState.arrivalMultiplier,
    energyConsumption: initialState.energyConsumption,
    chargingPower: initialState.chargingPower,
  });

  const validateInputs = () => {
    let errors = {};
    const { numChargepoints, arrivalMultiplier, energyConsumption, chargingPower } = formValues;

if (numChargepoints < 1 || numChargepoints > 100) {
      errors = {...errors, numChargepoints: "Number of chargepoints must be between 1 and 100."};
    }

    if (arrivalMultiplier < 20 || arrivalMultiplier > 200) {
      errors = {...errors, arrivalMultiplier: "Arrival probability multiplier must be between 20% and 200%."};
    }

    if (energyConsumption <= 0) {
      errors = {...errors, energyConsumption: "Energy consumption must be greater than 0."};
    }

    if (chargingPower <= 0) {
      errors = {...errors, chargingPower: "Charging power must be greater than 0."};
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      updateInputs( formValues );
    }
  };

  const handleInputChange = (field, value) => {    
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <>
      <h1>Charging Station Dashboard</h1>

      <div className="app-container">
        {/* Input Parameters */}
        <div className="container input-section">
          <h2>Provide your inputs</h2>

          <label>
            Number of Chargepoints:
            <input
              type="number"
              value={formValues.numChargepoints}
              // min="1"
              // max="100"
              onChange={(e) =>
                handleInputChange("numChargepoints", Number(e.target.value))
              }
            />
          </label>
          {errors.numChargepoints && (
            <span style={{ color: "red" }}>{errors.numChargepoints}</span>
          )}

          <label>
            Arrival Probability Multiplier (%):
            <input
              type="range"
              min="20"
              max="200"
              value={formValues.arrivalMultiplier}
              onChange={(e) =>
                handleInputChange("arrivalMultiplier", Number(e.target.value))
              }
            />
            <span>{formValues.arrivalMultiplier}%</span>
            {errors.arrivalMultiplier && (
              <span style={{ color: "red" }}>{errors.arrivalMultiplier}</span>
            )}
          </label>

          <label>
            Energy Consumption per EV (kWh):
            <input
              type="number"
              value={formValues.energyConsumption}
              onChange={(e) =>
                handleInputChange("energyConsumption", Number(e.target.value))
              }
            />
            {errors.energyConsumption && (
              <span style={{ color: "red" }}>{errors.energyConsumption}</span>
            )}
          </label>

          <label>
            Charging Power per Chargepoint (kW):
            <input
              type="number"
              value={state.chargingPower}
              onChange={(e) =>
                handleInputChange("chargingPower", Number(e.target.value))
              }
            />
            {errors.chargingPower && (
              <span style={{ color: "red" }}>{errors.chargingPower}</span>
            )}
          </label>
        </div>
            <div style={{display:'flex', alignItems:'center'}} >
        <button className="simulate-btn" disabled={!errors} onClick={handleSubmit}>
        Simulate
      </button>
      </div>
        {/* Output Visualization */}
        <OutputView
          totalEnergyCharged={state.totalEnergyCharged}
          maxPowerDemand={state.maxPowerDemand}
          actualPowerDemand={state.actualPowerDemand}
          concurrencyFactor={state.concurrencyFactor}
          day={state.chargingEvents.day}
          week={state.chargingEvents.week}
          month={state.chargingEvents.month}
          year={state.chargingEvents.year}
        />
      </div>
    </>
  );
};

export default ChargePoints;
