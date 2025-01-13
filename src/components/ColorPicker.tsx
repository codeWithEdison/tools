import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => (
  <div className="flex items-center gap-2">
    <label className="text-sm font-medium">{label}</label>
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-8 h-8 rounded cursor-pointer"
    />
  </div>
);

export default ColorPicker;