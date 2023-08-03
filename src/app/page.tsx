import { FormElement } from "./components";
import { Roboto_Mono } from "next/font/google";
import InfoIcon from "./icons/info";

const roboto_mono = Roboto_Mono({ weight: "400", subsets: ["latin-ext"] });

export default function PasswordGenerator() {
	return (
		<div className="mx-4 mt-24 flex min-h-full items-center justify-center p-4 text-center">
			<div className="relative flex max-h-[90vh] w-[75vw] transform flex-col gap-5 overflow-hidden rounded-2xl bg-accent-1 p-6 text-left shadow-sm transition-all">
				<FormElement>
					<div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
						<CheckBox name={"Letters"} value={"lower"} tooltip={"abcdefghijklmnopqrstuvwxyz"} checked={true} />
						<CheckBox name={"Upper case letters"} value={"upper"} tooltip={"ABCDEFGHIJKLMNOPQRSTUVWXYZ"} checked={false} />
						<CheckBox name={"Numbers"} value={"numbers"} tooltip={"0123456789"} checked={true} />
						<CheckBox name={"Special characters"} value={"specials"} tooltip={"~/?;:'\\\"}{][=-+_"} checked={false} />
						<CheckBox name={"Numeric special characters"} value={"num_specials"} tooltip={"!@#$%^&*()"} checked={true} />
						<CheckBox name={"Own characters"} value={"own"} checked={false} />
					</div>
				</FormElement>
			</div>
		</div>
	);
}
function CheckBox({ name, value, tooltip, checked }: { name: string; value: string; tooltip?: string; checked: boolean }) {
	return (
		<div className="relative flex gap-x-3">
			<div className="flex h-6 items-center">
				<input id={value} name={value} type="checkbox" defaultChecked={checked} className="h-4 w-4 rounded " />
			</div>
			<label htmlFor={value} className="flex gap-x-2 text-content">
				{name}
			</label>
			{tooltip ? (
				<div className="group hover:cursor-pointer">
					<InfoIcon width="10" height="10" />
					<span className={`${roboto_mono.className} absolute w-auto p-2 -ml-4 -mt-12 rounded-md shadow-md text-content bg-accent-2 text-xs font-bold transition-all duration-150 scale-0 origin-left group-hover:scale-100`}>{tooltip.split("").join(" ")}</span>
				</div>
			) : (
				<input id={value} name={value + "_text"} type="text" minLength={2} maxLength={128} className={`${roboto_mono.className} bg-accent-2 text-sm rounded px-1`} />
			)}
		</div>
	);
}
