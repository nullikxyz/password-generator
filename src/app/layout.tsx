import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Password Generator App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.className} mx-auto flex h-screen w-screen flex-col bg-bgk text-content overflow-x-hidden`}>
				<main>{children}</main>
			</body>
		</html>
	);
}
