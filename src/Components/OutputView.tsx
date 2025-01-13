import React from "react";

type OutputData = {
  totalEnergyCharged: number;
  maxPowerDemand: number;
  actualPowerDemand: number;
  concurrencyFactor: number;
};

type ChargingEvents = {
  day: number;
  week: number;
  month: number;
  year: number;
};

type OutputViewProps = OutputData & ChargingEvents;

const OutputView = (props: OutputViewProps) => {
  return (
    <>
      <div className="container">
        <h2>Results</h2>

        <div className="output-section">
          <div className="output-section-item">
            <b>{props.totalEnergyCharged} kWh</b>Total Energy Charged
          </div>
          <div className="output-section-item">
            <b>{props.maxPowerDemand} kW</b>Maximum Power Demand
          </div>
          <div className="output-section-item">
            <b>{props.actualPowerDemand.toFixed(2)} kW</b>Actual Power Demand
          </div>
          <div className="output-section-item">
            <b>{props.concurrencyFactor}%</b>Concurrency Factor
          </div>
        </div>
        <h3>Charging Events</h3>
        <div className="output-section">
          <div className="output-section-item">
            <b>{props.day}</b>Per Day
          </div>
          <div className="output-section-item">
            <b>{props.week}</b>Per Week
          </div>
          <div className="output-section-item">
            <b>{props.month}</b>Per Month
          </div>
          <div className="output-section-item">
            <b>{props.year}</b>Per Year
          </div>
        </div>
      </div>
    </>
  );
};

export default OutputView;
