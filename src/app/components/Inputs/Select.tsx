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
			<label className="block text-sm font-medium leading-6 text-gray-900">
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
						menuPortal: (base) => ({
							...base,
							zIndex: 9999,
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
