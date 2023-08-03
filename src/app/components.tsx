"use client";

import { useRouter } from "next/navigation";
import { Roboto_Mono } from "next/font/google";
import { Dialog, Transition } from "@headlessui/react";
import { useEffect, useState, Fragment, FormEvent } from "react";
import CopyIcon from "./icons/copy";
import RefreshIcon from "./icons/refresh";

const roboto_mono = Roboto_Mono({ weight: "400", subsets: ["latin-ext"] });

enum CHARS {
	LOWER_CASE = "abcdefghijklmnopqrstuvwxyz",
	UPPER_CASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	NUMBERS = "0123456789",
	SPECIALS = "~/?;:'\\\"}{][=-+_",
	NUMERIC_SPECIALS = "!@#$%^&*()",
}
interface PWDOptions {
	lower: boolean;
	upper: boolean;
	numbers: boolean;
	specials: boolean;
	num_specials: boolean;
	length: number;
	repeat: boolean;
	own: boolean;
	own_text: string;
}

function generate(options: PWDOptions) {
	let chars = "";
	let password = "";

	let arrayToFill = new Uint8Array(options.length);
	let rndValuesArray = new Float32Array(options.length);

	if (options.own) chars = options.own_text;
	else {
		if (options.lower) chars += CHARS.LOWER_CASE;
		if (options.upper) chars += CHARS.UPPER_CASE;
		if (options.numbers) chars += CHARS.NUMBERS;
		if (options.specials) chars += CHARS.SPECIALS;
		if (options.num_specials) chars += CHARS.NUMERIC_SPECIALS;
	}

	if (new Set(chars).size < 2) return null;

	crypto.getRandomValues(arrayToFill);
	arrayToFill.map((num) => (num < 0xff ? num : 0xfe));
	for (let i in arrayToFill) rndValuesArray[i] = arrayToFill[i] / 0xff;
	rndValuesArray = rndValuesArray.map((num) => Math.round(num * (chars.length - 1)));

	for (let i = 0; i < options.length; i++) password += chars[rndValuesArray[i]];

	return password;
}

export function FormElement({ children }: { children: React.ReactNode }) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const [passwordOptions, setPasswordOptions] = useState({
		lower: true,
		upper: false,
		numbers: true,
		specials: false,
		num_specials: true,
		length: 10,
		repeat: true,
		own: false,
		own_text: "",
	});

	const updatePassword = (event: FormEvent | null) => {
		// @ts-ignore
		if (event) setPasswordOptions({ ...passwordOptions, [event.target.name]: event.target.name == "own_text" ? event.target.value : event.target.value != "on" ? Number(event.target.value) : !passwordOptions[event.target.name] });
	};
	let password = generate(passwordOptions);

	return (
		<>
			<div className="relative mt-2 rounded-md shadow-sm">
				<div className={`${roboto_mono.className} block w-full truncate rounded-md py-1.5 pl-2 pr-20 ring-1 ring-inset ring-accent-4`}>{isClient ? password ?? " " : " "}</div>
				<div className="absolute inset-y-0 right-0 flex items-center">
					<CopyButton pwd={password} />
					<RegenerateButton />
				</div>
			</div>
			<form onChange={updatePassword}>
				<div>
					<label htmlFor="length">Password length: {passwordOptions.length}</label>
					<input type="range" id="length" name="length" min={8} max={40} step={1} defaultValue={passwordOptions.length} className="mb-5 w-full" />
				</div>
				{children}
				{password ? "" : <p className="mt-4">{passwordOptions.own ? "Add at least two different own characters!" : "Select at least one option to create a password!"}</p>}
			</form>
		</>
	);
}

export function CopyButton({ pwd }: { pwd: string | null }) {
	const [isOpen, setIsOpen] = useState(false);

	const copyText = (entryText: string) => {
		navigator.clipboard.writeText(entryText);
		setIsOpen(true);
		setTimeout(() => setIsOpen(false), 1000);
	};

	return (
		<button className="h-full rounded-l-md border-y-2 border-l-2 border-r-[1px] border-solid border-content bg-accent-1 px-2 py-0" onClick={() => copyText(pwd ?? "")}>
			<CopyIcon />
			<CopyAlert isOpen={isOpen} closeModal={() => setIsOpen(false)} />
		</button>
	);
}

export function RegenerateButton() {
	const router = useRouter();
	const handleRefresh = () => {
		router.refresh();
	};

	return (
		<button className="h-full rounded-r-md border-y-2 border-l-[1px] border-r-2 border-solid border-content bg-accent-1 px-2 py-0" onClick={handleRefresh}>
			<RefreshIcon />
		</button>
	);
}

function CopyAlert({ isOpen, closeModal }: { isOpen: boolean; closeModal: () => void }) {
	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative -z-10" onClose={closeModal}>
					<div className="fixed inset-0 ">
						<div className=" absolute bottom-0 left-0 p-4 text-center">
							<Transition.Child as={Fragment} enter="ease-out duration-500" enterFrom="opacity-0 scale-80" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-80">
								<Dialog.Panel className="overflow-y-none relative flex transform items-center gap-x-2 rounded-2xl bg-green-800/50 p-3 text-left shadow-sm transition-all">
									<div className="text-green-400">Copied to the clipboard</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
