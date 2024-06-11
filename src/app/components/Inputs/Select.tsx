"use client";

import ReactSelect from "react-select";

type SelectProps = {
	label: string;
	onChange: (value: Record<string, any>) => void;
	options: Record<string, any>[];
	value?: Record<string, any>;
	disabled?: boolean;
};

export function Select({
	label,
	onChange,
	options,
	value,
	disabled = false,
}: SelectProps) {
	return (
		<div className="z-[100]">
			<label className="block text-sm font-light leading-6 text-slate-50">
				{label}
			</label>

			<div className="mt-2">
				<ReactSelect
					isDisabled={disabled}
					value={value}
					onChange={onChange}
					options={options}
					menuPortalTarget={document.body}
					isMulti
					styles={{
						menuPortal: (baseStyles) => ({
							...baseStyles,
							zIndex: 9999,
						}),
						control: (baseStyles, state) => ({
							...baseStyles,
							background: "#000",
							boxShadow: "none",
							border: state.isFocused
								? "1px solid #a3e635"
								: "1px solid #1e293b",
						}),
						multiValue: (baseStyles) => ({
							...baseStyles,
							background: "#a3e635",
						}),
					}}
					classNames={{
						control: () => "text-sm",
					}}
				/>
			</div>
		</div>
	);
}
