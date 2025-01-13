import React, { forwardRef } from 'react'

const CustomInput = forwardRef(
  (
    {
      type = 'text',
      label,
      name,
      value,
      onChange,
      placeholder,
      error,
      required = false,
      disabled = false,
      className = '',
      min,
      max,
      minLength,
      maxLength,
      pattern,
      helperText,
      icon: Icon,
      ...props
    },
    ref,
  ) => {
    // Base input classes
    const baseInputClasses =
      'w-full px-3 py-2 border rounded-[55px] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 h-[48px] shadow-md bg-white'

    // Generate input classes based on state
    const inputClasses = `
    ${baseInputClasses}
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
    ${Icon ? 'pl-10' : ''}
    ${className}
  `.trim()

    // Generate label classes
    const labelClasses = `
    block text-sm font-medium mb-1
    ${error ? 'text-red-500' : 'text-gray-700'}
    ${disabled ? 'text-gray-400' : ''}
  `.trim()

    return (
      <div className="relative ">
        {label && (
          <label htmlFor={name} className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          min={min}
          max={max}
          minLength={minLength}
          maxLength={maxLength}
          pattern={pattern}
          className={inputClasses}
          aria-describedby={`${name}-error`}
          {...props}
        />

        {/* Error message */}
        {error && (
          <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}

        {/* Helper text */}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    )
  },
)

CustomInput.displayName = 'CustomInput'

export default CustomInput
