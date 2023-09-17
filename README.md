# Password generator by nulikxyz

The Password Generator is a web application built with Next.js, TypeScript, and Tailwind CSS that allows users to generate secure passwords based on their preferences. The user can customize the password length and choose from a variety of character types, including lowercase letters, uppercase letters, digits, and special characters. Additionally, the application provides the option for users to input their own set of characters for more personalized passwords.

## Live demo

Live demo available on: https://nullik.xyz/projects/password-generator
## Requirements

- Node.js (version 12 or later recommended)

## Installation

1. Clone the repository.
```bash
git clone https://github.com/nullikxyz/password-generator
```
2. Install the dependencies with npm:
```bash
npm install
```

## Usage
### Production mode
```bash
npm run build
npm run start
```
### Development mode
```bash
npm run dev
```

## Features

- **Length Selection**: Generate strong passwords with customizable length.
- **Character Selection**: Choose from various character types such as lowercase letters, uppercase letters, digits, and special characters.
- **User Input**: Enter specific characters preferred by the user for password generation.
- **Copy to Clipboard**: Easily copy the generated password directly to the clipboard for immediate use.
- **Responsive Design**: The application is designed to work flawlessly across different devices and screen sizes.

## Testing

The project has been tested on Node.js v18.12.1, but it should work on versions 12 or later.

## Other

### Icons
Icons from: [lucide.dev](https://lucide.dev/)

### Colors
The colors used in the project can be customized by editing the [globals.css](src/app/globals.css) file. Inside this file, you'll find a section that defines the color variables:

```css
@layer base {
  :root {
    --color-bgk: 240deg 10% 4%;     /* zinc 950 */
    --color-accent1: 240deg 6% 10%; /* zinc 900 */
    --color-accent2: 240deg 5% 26%; /* zinc 700 */
    --color-accent3: 0deg 0% 98%;   /* zinc 50 */
    --color-accent4: 240deg 5% 65%; /* zinc 400 */
    --color-content: 240deg 6% 90%; /* zinc 200 */
  }
}
```
The default colors are taken from the Tailwind CSS color palette, using their zinc shades. You can modify these variables to create your desired color scheme. For more information on customizing colors in Tailwind CSS, refer to the [official documentation](https://tailwindcss.com/docs/customizing-colors).
