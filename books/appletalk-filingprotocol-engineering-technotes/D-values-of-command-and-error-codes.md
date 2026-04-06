---
title: "Values of Command and Error Codes"
source: "022_AppleTalkFilingProtocolEngineeringTechnicalNotes"
source_url: ""
pages: "119–121"
converted: "2026-04-04"
engine: "gemini-flash"
nav_order: 24
parent: "AFP Technical Notes"
layout: default
grand_parent: Books
---

# Appendix D Values of Command and Error Codes

## Command Codes

The command codes used in the command packets are listed below. Each command code is a 16 bit integer sent in the packet high byte first. The values are given here in decimal (base 10) form.

| Command | Value |
|---|---|
| ByteRangeLock | 1 |
| CloseVol | 2 |
| CloseDir | 3 |
| CloseFork | 4 |
| CopyFile | 5 |
| CreateDir | 6 |
| CreateFile | 7 |
| Delete | 8 |
| Enumerate | 9 |
| Flush | 10 |
| FlushFork | 11 |
| GetForkParms | 14 |
| GetSrvrInfo | 15 |
| GetSrvrParms | 16 |
| GetVolParms | 17 |
| Login | 18 |
| LoginCont | 19 |
| Logout | 20 |
| MapID | 21 |
| MapName | 22 |
| Move | 23 |
| OpenVol | 24 |
| OpenDir | 25 |
| OpenFork | 26 |
| Read | 27 |
| Rename | 28 |
| SetDirParms | 29 |
| SetFileParms | 30 |
| SetForkParms | 31 |
| SetVolParms | 32 |
| Write | 33 |
| GetFileDirParms | 34 |
| SetFileDirParms | 35 |
| OpenDT | 48 |
| CloseDT | 49 |
| GetIcon | 51 |
| GetIconInfo | 52 |
| AddAPPL | 53 |
| RmvAPPL | 54 |
| GetAPPL | 55 |
| AddComment | 56 |
| RmvComment | 57 |
| GetComment | 58 |
| AddIcon | 192 |


## Error Codes

Each call returns an Error code which is a 4-byte integer. The various error values are listed below together with their mnemonic names (these are the names used in Chapter 7). The values given below are in hexadecimal and decimal (base-10) form.

| Error Mnemonic | Hex Value | Decimal Value |
| :--- | :--- | :--- |
| NoErr | $0 | 0 |
| AccessDenied | $FFFFEC78 | -5000 |
| AuthContinue | $FFFFEC77 | -5001 |
| BadUAM | $FFFFEC76 | -5002 |
| BadVersNum | $FFFFEC75 | -5003 |
| BitmapErr | $FFFFEC74 | -5004 |
| CantMove | $FFFFEC73 | -5005 |
| DenyConflict | $FFFFEC72 | -5006 |
| DirNotEmpty | $FFFFEC71 | -5007 |
| DiskFull | $FFFFEC70 | -5008 |
| EOFErr | $FFFFEC6F | -5009 |
| FileBusy | $FFFFEC6E | -5010 |
| FlatVol | $FFFFEC6D | -5011 |
| ItemNotFound | $FFFFEC6C | -5012 |
| LockErr | $FFFFEC6B | -5013 |
| MiscErr | $FFFFEC6A | -5014 |
| NoMoreLocks | $FFFFEC69 | -5015 |
| NoServer | $FFFFEC68 | -5016 |
| ObjectExists | $FFFFEC67 | -5017 |
| ObjectNotFound | $FFFFEC66 | -5018 |
| ParamErr | $FFFFEC65 | -5019 |
| RangeNotLocked | $FFFFEC64 | -5020 |
| RangeOverlap | $FFFFEC63 | -5021 |
| SessClosed | $FFFFEC62 | -5022 |
| UserNotAuth | $FFFFEC61 | -5023 |
| CallNotSupported | $FFFFEC60 | -5024 |
| ObjectTypeErr | $FFFFEC5F | -5025 |
| TooManyFilesOpen | $FFFFEC5E | -5026 |
| ServerGoingDown | $FFFFEC5D | -5027 |
| CantRename | $FFFFEC5C | -5028 |
| DirNotFound | $FFFFEC5B | -5029 |
| IconTypeError | $FFFFEC5A | -5030 |

---
