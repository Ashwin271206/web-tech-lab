# Job Application Portal — Form Validation with JavaScript

A two-step job application portal built with **HTML**, **CSS**, and vanilla **JavaScript**. The user first registers, and only after a valid registration can they access and submit the job application form. Every field is validated on the client side with live, inline error messages.

## Features

- **Step 1 — Registration Form** — full name, email, phone number, password, and confirm password.
- **Step 2 — Job Application Form** — position, job level, years of experience, skills, project description, and resume upload.
- **Step 3 — Success Screen** — confirmation message shown after a valid submission.
- **Live Validation** — fields are re-checked on every keystroke; invalid fields are highlighted in red with a message below them.
- **Show / Hide Password** — toggle to reveal the password and confirm-password fields.
- **Back Navigation** — return from the application form to the registration step.

## Validation Rules

| Field               | Rule                                                                    |
|---------------------|--------------------------------------------------------------------------|
| Full Name           | Required; alphabets and spaces only                                      |
| Email               | Required; must be a valid email format                                   |
| Phone Number        | Required; exactly 10 digits (non-digits are stripped automatically)      |
| Password            | Min 8 characters with uppercase, lowercase, number & special character   |
| Confirm Password    | Must match the password                                                  |
| Position / Job Level| A value must be selected from the dropdown                               |
| Experience          | Number between 0 and 30                                                  |
| Skills              | Cannot be empty                                                          |
| Project Description | At least 50 characters (live character count shown)                      |
| Resume              | Required; only `.pdf` or `.docx` files                                   |

## Tech Stack

| Layer     | Technology                                          |
|-----------|------------------------------------------------------|
| Markup    | HTML5 (forms, inputs, select, file upload)           |
| Styling   | CSS3 (embedded `<style>`)                            |
| Scripting | Vanilla JavaScript (DOM events, RegEx validation)    |

## Project Structure

```
Lab 2 - Job Application Form/
└── index.html      # Markup, styles, and validation script in a single file
```

## How to Run

No installation or build step is required.

1. Open the `Lab 2 - Job Application Form` folder.
2. Double-click `index.html` to open it in any modern browser.
3. Fill in the registration form to unlock the job application form.
