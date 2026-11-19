# The Challenge

Building a "one-stop-shop" for validation requires deep knowledge of various data formats and international standards (like E.164 for phone numbers). The goal was to consolidate these into one fast service.

# Our Approach

Using **Node.js**, I built a modular validation engine. Each data type has its own specialized validator, but they all share a common response structure for ease of use.

### Supported Validations:

- **Email**: Checks format and MX records for deliverability.
- **Phone**: Validates international formats and identifies carrier info where possible.
- **URL**: Verifies structure and performs live ping checks.
- **Credit Cards**: Validates using the Luhn algorithm.

# Final Outcome

The All In One Validator API simplifies the development stack for my users, reducing the number of external dependencies they need to manage and improving their application's data integrity.
