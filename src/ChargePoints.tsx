import React from "react";
import "./App.css";
import OutputView from "./OutputView.tsx";
import { useChargePoints } from "./useChargePoints.ts";

const ChargePoints = () => {
  const { state, updateInputs } = useChargePoints();

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
              value={state.numChargepoints}
              min="1"
              max="100"
              onChange={(e) =>
                updateInputs("numChargepoints", Number(e.target.value))
              }
            />
          </label>

          <label>
            Arrival Probability Multiplier (%):
            <input
              type="range"
              min="20"
              max="200"
              value={state.arrivalMultiplier}
              onChange={(e) =>
                updateInputs("arrivalMultiplier", Number(e.target.value))
              }
            />
            <span>{state.arrivalMultiplier}%</span>
          </label>

          <label>
            Energy Consumption per EV (kWh):
            <input
              type="number"
              value={state.energyConsumption}
              onChange={(e) =>
                updateInputs("energyConsumption", Number(e.target.value))
              }
            />
          </label>

          <label>
            Charging Power per Chargepoint (kW):
            <input
              type="number"
              value={state.chargingPower}
              onChange={(e) =>
                updateInputs("chargingPower", Number(e.target.value))
              }
            />
          </label>
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
