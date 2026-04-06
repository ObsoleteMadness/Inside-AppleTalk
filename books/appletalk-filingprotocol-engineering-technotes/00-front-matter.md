---
title: "AFP Technical Notes"
source: "022_AppleTalkFilingProtocolEngineeringTechnicalNotes"
source_url: ""
pages: "1–8"
converted: "2026-04-04"
engine: "gemini-flash"
nav_order: 3
layout: default
has_children: true
parent: Books
---
# Front Matter

| Field | Value |
|-------|-------|
| **Source** | 022_AppleTalkFilingProtocolEngineeringTechnicalNotes |
| **Chapter** | 0 |
| **Pages** | 1–8 |
| **Converted** | 2026-04-04 |
| **Engine** | gemini-flash |

---

# AppleTalk Filing Protocol Engineering Technical Notes

030-M098
Australasian Apple Programmers and Developers Association

Apple Computer Inc.

Protocol Version 1.1
February 17, 1987

This protocol is proprietary and based on AFP Version 1.0 which was developed in joint work by Apple Computer Inc. and Centram Systems West.

## Table of Contents

### 1 Chapter 1: AppleTalk Filing Protocol Design Description

1 The Basic File Access Model
3 Goals of AFP
3 AFP in the AppleTalk Architecture
5 Notation

### 6 Chapter 2: AppleTalk Filing Protocol System Description

6 AFP File System Structure
6 File Servers
8 Volumes
8 The Volume Catalog: Directories, Files, and Forks
10 CNode Names: Long and Short Names
11 Directory IDs
11 Volume Signatures
12 Directory and File Parameters
14 Date-Time Values
14 Pathnames
15 Access Paths and Open File Forks
15 Complete Specification of a Catalog Node (CNode)

### 17 Chapter 3: The AFP Login Procedure

17 AFP Versions
17 User Authentication Methods
18  Discovering a File Server:
18  Obtaining File Server Information:
18  The Login Step:

## 19  Chapter 4: Access Control Mechanisms in AFP

19  User Authentication at Server Login
19  Volume Passwords
19  Directory-Level Access Controls

## 23  Chapter 5: A Discussion of AFP Calls

23  Server-Level Calls
24  Volume-Level Calls
24  Directory-Level Calls
25  File-Level Calls
25  Combined Directory-File-Level Calls
26  Fork-Level Calls

## 27  Chapter 6: A Design for the Finder's Desktop Management in a Network Environment

## 31  Chapter 7: Specification of AFP Calls

| | |
|:---|:---|
| 32 | FPAddAPPL |
| 33 | FPAddComment |
| 34 | FPAddIcon |
| 36 | FPByteRangeLock |
| 38 | FPCloseDir |
| 39 | FPCloseDT |
| 40 | FPCloseFork |
| 41 | FPCloseVol |
| 42 | FPCopyFile |
| 44 | FPCreateDir |
| 45 | FPCreateFile |
| 47 | FPDelete |
| 48 | FPEnumerate |
| 51 | FPFlush |
| 52 | FPFlushFork |
| 53 | FPGetAPPL |
| 54 | FPGet Comment |
| 55 | FPGetFileDirParms |
| 58 | FPGetForkParms |
| 59 | FPGetIcon |
| 60 | FPGetIconInfo |
| 61 | FPGetSrvrInfo |
| 63 | FPGetSrvrParms |
| 64 | FPGetVolParms |
| 65 | FPLogin |
| 67 | FPLoginCont |
| 68 | FPLogout |
| 69 | FPMapID |
| 70 | FPMapName |
| 71 | FPMove |
| 73 | FPOpenDir |
| 74 | FPOpenDT |
| 75 | FPOpenFork |
| 77 | FPOpenVol |
| 79 | FPRead |
| 81 | FPRemoveAPPL |
| 82 | FPRemoveComment |
| 83 | FPRename |
| 85 | FPSetDirParms |
| 88 | FPSetFileParms |
| 90 | FPSetFileDirParms |
| 93 | FPSetForkParms |
| 94 | FPSetVolParms |
| 95 | FPWrite |

# 97 Chapter 8: AFP's Use of ASP

# 99 Appendix A: User Authentication Methods

| | |
|:---|:---|
| 99 | No User Authentication |
| 99 | User Authentication With Cleartext Password Transmission |
| 99 | User Authentication Based on Random Number Exchange |

---

101  **Appendix B: Long/Short Name Management Algorithms**

103  **Appendix C: File Sharing Modes**

105  **Appendix D: Values of Command and Error Codes**

107  Error Codes

108  **Appendix E: List of Abbreviations**
