import React, { useState, useEffect } from "react";
import {
  workTypeConfig,
  urgencyConfig,
  generateDataset,
  trainModel,
  predict,
} from "../../utils/ml.js";

function WorkTypeGrid({ selected, onChange }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 w-full">
      {workTypeConfig.map((opt) => {
        const active = selected === opt.value;
        return (
          <button
            type="button"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={[
              "flex flex-col items-center gap-2 py-4 px-2 rounded-xl border-[1.5px] w-full",
              "transition-all duration-[180ms] font-sans cursor-pointer",
              active
                ? "bg-blue-600 border-blue-600 shadow-md -translate-y-px"
                : "bg-white border-transparent hover:bg-blue-50 hover:border-blue-200 hover:-translate-y-0.5 hover:shadow-sm",
            ].join(" ")}
          >
            <span className="text-2xl leading-none">{opt.icon}</span>
            <span
              className={`text-[13px] font-semibold text-center leading-tight ${active ? "text-white" : "text-gray-600"}`}
            >
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SliderRow({ label, value, display, min, max, step, ticks, onChange }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2.5">
        <span className="text-[15px] font-bold text-gray-600">
          {label}
        </span>
        <span className="text-base font-bold text-gray-900 font-mono">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-blue-600"
      />
      <div className="flex justify-between mt-1.5">
        {ticks.map((t) => (
          <span key={t} className="text-[11px] text-gray-400">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function UrgencyGrid({ selected, onChange }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
      {urgencyConfig.map((opt) => {
        const active = selected === opt.value;
        return (
          <button
            type="button"
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={[
              "p-3 rounded-[10px] border-[1.5px] text-left",
              "transition-all duration-[180ms] font-sans cursor-pointer",
              active
                ? "bg-blue-600 border-blue-600 shadow-md -translate-y-px"
                : "bg-white border-transparent hover:bg-blue-50 hover:border-blue-200 hover:-translate-y-0.5 hover:shadow-sm",
            ].join(" ")}
          >
            <span
              className={`block text-[12px] font-semibold mb-0.5 ${active ? "text-white" : "text-gray-900"}`}
            >
              {opt.label}
            </span>
            <span
              className={`block text-[10px] leading-snug ${active ? "text-blue-100" : "text-gray-500"}`}
            >
              {opt.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-gray-200 my-6" />;
}

function SectionLabel({ children }) {
  return (
    <p className="text-[13px] font-bold tracking-[0.1em] uppercase text-gray-600 mb-4">
      {children}
    </p>
  );
}

export default function CalculatorModal({ isOpen, onClose, onAddJob }) {
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [customRequirement, setCustomRequirement] = useState('');
  const [customBudget, setCustomBudget] = useState('');
  const [calcData, setCalcData] = useState({
    workType: "cleaning",
    rating: 4.5,
    experience: 3,
    urgency: "normal",
  });

  useEffect(() => {
    if (isOpen && !model) {
      const init = async () => {
        await new Promise((r) => setTimeout(r, 120));
        const data = generateDataset();
        const trained = trainModel(data);
        setModel(trained);
      };
      init();
    }
  }, [isOpen, model]);

  const setCalc = (key) => (val) => {
    setCalcData((f) => ({ ...f, [key]: val }));
    setPrediction(null);
  };

  const handlePredict = () => {
    if (!model) return;
    const rate = predict(model, calcData);
    setPrediction(rate);
    setCustomBudget(rate.toString());
  };

  const handlePostJob = () => {
    onAddJob({
      serviceType: calcData.workType,
      rating: calcData.rating,
      experience: calcData.experience,
      urgency: calcData.urgency,
      budget: customBudget || prediction,
      requirement: customRequirement,
    });
    // Reset modal state
    setPrediction(null);
    setCustomRequirement('');
    setCustomBudget('');
    setCalcData({
      workType: "cleaning",
      rating: 4.5,
      experience: 3,
      urgency: "normal",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-gray-50 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8 border border-gray-200 animate-fade-in-up">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Post New Job</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {/* Calculator Section */}
          <div className="mb-2">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Household Worker Rate Calculator</h3>
            <p className="text-sm text-gray-500 mb-6">Use our ML calculator to get a suggested hourly budget based on your requirements.</p>
            
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
              <div>
                <SectionLabel><span className="text-gray-900">Service type</span></SectionLabel>
                <WorkTypeGrid selected={calcData.workType} onChange={setCalc("workType")} />
              </div>

              <Divider />

              <div>
                <SectionLabel><span className="text-gray-900">Worker rating</span></SectionLabel>
                <SliderRow
                  label="Customer rating"
                  value={calcData.rating}
                  display={`${parseFloat(calcData.rating).toFixed(1)} / 5.0`}
                  min="3.0"
                  max="5.0"
                  step="0.1"
                  ticks={["3.0", "4.0", "5.0"]}
                  onChange={setCalc("rating")}
                />
              </div>

              <Divider />

              <div>
                <SectionLabel><span className="text-gray-900">Worker Experience</span></SectionLabel>
                <SliderRow
                  label="Years of experience"
                  value={calcData.experience}
                  display={`${calcData.experience} yr${calcData.experience > 1 ? "s" : ""}`}
                  min="1"
                  max="20"
                  step="1"
                  ticks={["1 yr", "10 yrs", "20 yrs"]}
                  onChange={setCalc("experience")}
                />
              </div>

              <Divider />

              <div>
                <SectionLabel><span className="text-gray-900">Booking urgency</span></SectionLabel>
                <UrgencyGrid selected={calcData.urgency} onChange={setCalc("urgency")} />
              </div>
            </div>

            <button
              onClick={handlePredict}
              disabled={!model}
              className={[
                "mt-6 w-full py-[15px] rounded-xl font-sans text-sm font-semibold tracking-[0.01em] text-white",
                "transition-all duration-[180ms]",
                model
                  ? "bg-blue-600 cursor-pointer hover:bg-blue-700 shadow-md"
                  : "bg-gray-300 cursor-not-allowed",
              ].join(" ")}
            >
              <span className="text-lg">{model ? "Estimate hourly rate" : "Initializing ML model..."}</span>
            </button>

            {prediction !== null && (
              <div className="mt-5 px-6 py-5 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-800 font-medium mb-1">Estimated hourly budget</p>
                  <p className="text-[32px] font-bold font-mono text-green-700 leading-none">
                    ₹{prediction} <span className="text-sm font-sans font-normal opacity-80">/ hr</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Post Job Section */}
          {prediction !== null && (
            <div className="pt-6 border-t border-gray-200 mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Detailed Requirements
                </label>
                <textarea
                  value={customRequirement}
                  onChange={(e) => setCustomRequirement(e.target.value)}
                  placeholder="Describe your job details and any specific requirements..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Proposed Budget (₹)
                </label>
                <input
                  type="number"
                  value={customBudget}
                  onChange={(e) => setCustomBudget(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button 
                onClick={handlePostJob}
                disabled={!customRequirement || !customBudget}
                className="w-full py-4 rounded-xl bg-gray-900 text-white font-sans text-[15px] font-bold tracking-wide hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-[180ms]"
              >
                Post Job
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
