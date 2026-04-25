---
title: 'Optimizing FTP Uploads'
---

During Q3 2023, I was tasked with hardening the file transfer functionality across the GRC API modules (CRM, Lapak, and General).

The system was previously relying on a batch upload mechanism which was prone to partial failures and network timeouts. I refactored the upload functionality to process single files sequentially using **.NET Core** and **C#**, while simultaneously implementing an `FTPFileExists` verification layer.

By applying defensive programming techniques and ensuring correct HTTP Status Codes (such as Bad Request for missing files), the reliability of our document management API improved dramatically, creating a robust, enterprise-grade file pipeline.
