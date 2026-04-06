---
title: "Inside AppleTalk, 2nd Edition"
source: "Inside AppleTalk Second Edition (1990)"
source_url: "https://vintageapple.org/macbooks/pdf/Inside_AppleTalk_Second_Edition_1990.pdf"
pages: "1–61"
converted: "2026-04-05"
engine: "gemini-flash"
nav_order: 1
layout: default
has_children: true
parent: Books
---

# Inside AppleTalk, Second Edition

| Field | Value |
|-------|-------|
| **Source** | [Inside AppleTalk Second Edition (1990)](https://vintageapple.org/macbooks/pdf/Inside_AppleTalk_Second_Edition_1990.pdf) |
| **Chapter** | 0 |
| **Pages** | 1–61 |
| **Converted** | 2026-04-05 |
| **Engine** | gemini-flash |

---

# Inside AppleTalk, Second Edition

by Gursharan S. Sidhu, Richard F. Andrews, Alan B. Oppenheimer
Apple Computer, Inc.

![Illustration showing various AppleTalk networking concepts, hardware icons, and protocol layers.](images/p1-cover-illustration.png)


## The Apple® Communications Library

*The Official Publications from Apple Computer, Inc.*

The Apple Communications Library provides complete information on Apple Computer, Inc.'s approach to networking and communications. The library consists of three related series: Apple Communications Basics, Apple Communications Reference, and Apple Communications Technical. These books offer comprehensive material on a wide variety of topics for a vast range of readers, from basic-level users to network administrators and developers.

The Apple Communications Basics series covers networking fundamentals. Designed for those new to networks, these introductory-level books explain all aspects of networking.

The Apple Communications Reference series provides overviews of networking topics. These books are written for developers, network administrators, or users, and currently include an overview of AppleTalk®, Apple's networking system.

For developers and programmers, technical detail is provided by the Apple Communications Technical series. These books include advanced-level information about the AppleTalk network system's capabilities and specifications necessary to allow implementation of a system by developers. *Inside AppleTalk* is the first in this series.


**Gursharan S. Sidhu**  
Technical Director

**Richard F. Andrews**  
Staff Engineer

**Alan B. Oppenheimer**  
Staff Engineer

Network Systems Development  
Apple Computer, Inc.

**Addison-Wesley Publishing Company**

Reading, Massachusetts Menlo Park, California New York  
Don Mills, Ontario Wokingham, England Amsterdam Bonn  
Sidney Singapore Tokyo Madrid San Juan Paris  
Seoul Milan Mexico City Taipei


**APPLE COMPUTER, INC.**

Copyright © 1990 by Apple Computer, Inc.

All rights reserved. No part of this publication may be reproduced, stored in a retrieval system, or transmitted, in any form or by any means, mechanical, electronic, photocopying, recording, or otherwise, without prior written consent of Apple Computer, Inc. Printed in the United States of America.

Apple Computer, Inc.
20525 Mariani Avenue
Cupertino, CA 95014
(408) 996-1010

Apple, the Apple logo, AppleShare, AppleTalk, Apple IIe, Apple IIGS, EtherTalk, ImageWriter, LaserWriter, Macintosh, ProDOS, and TokenTalk are registered trademarks of Apple Computer, Inc.

Apple Desktop Bus, Finder, LocalTalk, and MultiFinder are trademarks of Apple Computer, Inc.

AlisaShare is a trademark of Alisa Systems.

CL/1 is a trademark of Network Innovations.

DECnet and VAX are trademarks of Digital Equipment Corporation.

IBM and SNA are registered trademarks of International Business Machines Corporation.

InBox is a trademark of Symantec Corporation's Think Technologies.

ITC Garamond and ITC Zapf Dingbats are registered trademarks of International Typeface Corporation.

Kinetics is a trademark of Kinetics, Inc.

LANSTAR and Meridian are registered trademarks of Northern Telecom.

LANSTAR AppleTalk is a joint trademark of Northern Telecom and Apple Computer, Inc.

Linotronic is a registered trademark of Linotype Co.

Microsoft and MS-DOS are registered trademarks of Microsoft Corporation.

Netway is a registered trademark of Tri-Data Systems, Inc.

NFS is a trademark of Sun Microsystems.

PacerShare is a registered trademark of Pacer Software, Inc.

PhoneNET is a registered trademark of Farallon Computing.

PostScript is a registered trademark, and Illustrator is a trademark, of Adobe Systems Incorporated.

UNIX is a registered trademark of AT&T Information Systems.

Varityper is a registered trademark, and VT600 is a trademark, of AM International, Inc.

Zilog is a trademark of Infocom, Inc.

No licenses, express or implied, are granted by reason of this book describing certain processes or techniques that may be the intellectual property of the author or others, including, but not limited to, United States Patents 4,661,902 and 4,689,786 assigned to Apple Computer, Inc.

Simultaneously published in the United States and Canada.

ISBN 0-201-55021-0

4 5 6 7 8 9 10 - DO - 959493
Fourth printing, January 1993


## Contents

Figures and tables / xv
Acknowledgments / xx
Acknowledgments to First Edition / xxiii

### Introduction / I-1

* Network systems / I-4
* Protocols—What are they? / I-4
* AppleTalk / I-4
    * Why did we design it? / I-5
    * Key goals of the AppleTalk architecture / I-6
* The AppleTalk network system / I-8
    * AppleTalk connectivity / I-9
    * AppleTalk end-user services / I-15
* AppleTalk protocol architecture and the ISO-OSI reference model / I-20
* AppleTalk Phase 2 / I-24
* Thoughts of the future / I-25
    * Scope / I-25
    * Reach / I-25
* About Inside AppleTalk / I-26
* Typographic and graphic conventions used in this book / I-27
* Where to go for more information / I-28


## Part I Physical and Data Links

### 1 LocalTalk Link Access Protocol / 1-1

- Link access control / 1-3
- Node addressing / 1-3
    - Node IDs / 1-4
    - Dynamic node ID assignment / 1-4
- Data transmission and reception / 1-6
    - LLAP packet / 1-6
    - LLAP frame / 1-9
- Data packet transmission / 1-10
    - Carrier sensing and synchronization / 1-10
    - Transmission dialogs / 1-11
    - Directed data packet transmission / 1-14
    - Broadcast data packet transmission / 1-15
- Packet reception / 1-15

### 2 AppleTalk Address Resolution Protocol / 2-1

- Protocol families and stacks / 2-3
- Protocol and hardware addresses / 2-3
    - Address resolution / 2-3
- AARP services / 2-5
- AARP operation / 2-6
    - Address mapping / 2-7
    - Dynamic protocol address assignment / 2-8
- Retransmission of AARP packets / 2-9
    - Filtering incoming packets / 2-9
- AMT entry aging / 2-10
- AARP packet formats / 2-11

### 3 EtherTalk and TokenTalk Link Access Protocols / 3-1

- 802.2 / 3-3
- ELAP packet format / 3-5
- TLAP packet format / 3-6
- Address mapping in ELAP and TLAP / 3-7
    - Use of AARP by ELAP and TLAP / 3-8
    - AARP specifics for ELAP and TLAP / 3-9
    - Zone multicast addresses used by ELAP and TLAP / 3-10
- AppleTalk AARP packet formats on Ethernet and token ring / 3-11

## Part II End-to-End Data Flow

### 4 Datagram Delivery Protocol / 4-1

- Internet routers / 4-5
- Sockets and socket identification / 4-5
- Network numbers and a node's AppleTalk address / 4-6
- Special DDP node IDs / 4-6
- AppleTalk node address acquisition / 4-7
    - Node address acquisition on nonextended networks / 4-8
    - Node address acquisition on extended networks / 4-8
- DDP type field / 4-9
- Socket listeners / 4-10
- DDP interface / 4-10
    - Opening a statically assigned socket / 4-11
    - Opening a dynamically assigned socket / 4-12
    - Closing a socket / 4-12
    - Sending a datagram / 4-12
    - Datagram reception by the socket listener / 4-13
- DDP internal algorithm / 4-13
- DDP packet format / 4-13
    - Short and extended headers / 4-14
    - DDP checksum computation / 4-17
    - Hop counts / 4-17

 - DDP routing algorithm / 4-18
 - Optional "best router" forwarding algorithm / 4-20
 - Sockets and use of name binding / 4-21
 - Network number equivalence / 4-21
 
### 5 Routing Table Maintenance Protocol / 5-1

Internet routers / 5-4
- Local routers / 5-4
- Half routers / 5-4
- Backbone routers / 5-4
Router model / 5-6
Internet topologies / 5-7
Routing tables / 5-8
Routing table maintenance / 5-10
- Reducing RTMP packet size / 5-11
- Aging of routing table entries / 5-12
- Validity and send-RTMP timers / 5-13
RTMP Data packet format / 5-13
- Sender's network number / 5-15
- Sender's node ID / 5-15
- Version number indicator / 5-15
- Routing tuples / 5-16
Assignment of network number ranges / 5-16
RTMP and nonrouter nodes / 5-17
- Nodes on nonextended networks / 5-17
- Nodes on extended networks / 5-19
RTMP Route Data Requests / 5-20
RTMP table initialization and maintenance algorithms / 5-21
- Initialization / 5-21
- Maintenance / 5-21
- Tuple matching definitions / 5-25
RTMP routing algorithm / 5-25

### 6 AppleTalk Echo Protocol / 6-1

## Part III Named Entities

### 7 Name Binding Protocol / 7-1

- Network-visible entities / 7-4
- Entity names / 7-4
- Name binding / 7-5
    - Names directory and names tables / 7-6
    - Aliases and enumerators / 7-6
    - Names information socket / 7-7
- Name binding services / 7-7
    - Name registration / 7-7
    - Name deletion / 7-8
    - Name lookup / 7-8
    - Name confirmation / 7-8
- NBP on a single network / 7-9
- NBP on an internet / 7-10
    - Zones / 7-10
    - Name lookup on an internet / 7-10
- NBP interface / 7-11
    - Registering a name / 7-12
    - Removing a name / 7-12
    - Looking up a name / 7-13
    - Confirming a name / 7-13
    - NBP packet formats / 7-14
    - Function / 7-15
    - Tuple count / 7-15
    - NBP ID / 7-15
    - NBP tuple / 7-15

### 8 Zone Information Protocol / 8-1

- ZIP services / 8-4
- Network-to-zone-name mapping / 8-4
    - Zone information table / 8-4
    - Zone information socket: ZIP Queries and Replies / 8-5
    - ZIT maintenance / 8-5

- Zone name listing / 8-7
- Zone name acquisition / 8-9
    - Verifying a saved zone name / 8-9
    - Choosing a new zone name / 8-10
    - Zone multicasting / 8-10
    - Aging the zone name / 8-10
 - Packet formats / 8-11
    - ZIP Query and Reply / 8-11
    - ZIP ATP Requests / 8-13
    - ZIP GetNetInfo Request and Reply / 8-16
 - Zone multicast address computation / 8-18
 - NBP routing in IRs / 8-18
    - Generating FwdReq packets / 8-19
    - Converting FwdReqs to LkUps / 8-19
 - Zones list assignment / 8-20
 - Zones list changing / 8-21
    - Changing zones lists in routers / 8-21
    - Changing zone names in nodes / 8-22
 - Timer values / 8-24

## Part IV Reliable Data Delivery

### 9 AppleTalk Transaction Protocol / 9-1

- Transactions / 9-3
    - At-least-once (ALO) transactions / 9-5
    - Exactly-once (XO) transactions / 9-6
- Multipacket responses / 9-9
- Transaction identifiers / 9-9
-ATP bitmap/sequence number / 9-10

- Responders with limited buffer space / 9-12
- ATP packet format / 9-13
- ATP interface / 9-16
    - Sending a request / 9-17
    - Opening a responding socket / 9-18
    - Closing a responding socket / 9-19
    - Receiving a request / 9-19
    - Sending a response / 9-20
- ATP state model / 9-21
    - ATP requester / 9-22
    - ATP responder / 9-24
- Optional ATP interface calls / 9-26
    - Releasing a RspCB / 9-26
    - Releasing a TCB / 9-26
- Wraparound and generation of TIDs / 9-27

### 10 Printer Access Protocol / 10-1

- PAP services / 10-4
- The protocol / 10-5
    - Connection establishment phase / 10-7
    - Data transfer phase / 10-9
    - Duplicate filtration / 10-11
    - Connection termination phase / 10-11
    - Status gathering / 10-12
- PAP packet formats / 10-12
- PAP function and result values / 10-16
- PAP client interface / 10-16
- PAP specifications for the Apple LaserWriter printer / 10-21

### 11 AppleTalk Session Protocol / 11-1

- What ASP does / 11-4
- What ASP does not do / 11-4
- ASP services and features / 11-5
  - Opening and closing sessions / 11-6
  - Session maintenance / 11-9
  - Commands on an open session / 11-10
  - Sequencing and duplicate filtration / 11-14
  - Getting service status information / 11-15
- ASP client interface / 11-16
  - Server-end calls / 11-16
  - Workstation-end calls / 11-23
- Packet formats and algorithms / 11-27
  - Opening a session / 11-27
  - Getting server status / 11-29
  - Sending a command request / 11-30
  - Sending a write request / 11-32
  - Maintaining the session / 11-35
  - Sending an attention request / 11-36
  - Closing a session / 11-36
  - Checking for reply size errors / 11-37
  - Timeouts and retry counts / 11-38
  - SPFunction values / 11-39

### 12 AppleTalk Data Stream Protocol / 12-1

- ADSP services / 12-4
- Connections / 12-4
  - Connection states / 12-5
  - Half-open connections and the connection timer / 12-5
  - Connection identifiers / 12-6
Data flow / 12-6
- Sequence numbers / 12-7
- Error recovery and acknowledgments / 12-7
- Flow control and windows / 12-8
- ADSP messages / 12-9
- Forward resets / 12-9
- Summary of sequencing variables / 12-10
Packet format / 12-12
Control packets / 12-14
Data-flow examples / 12-15
Attention messages / 12-19
Connection opening / 12-22
- Connection-opening dialog / 12-24
- Open-connection Control packet format / 12-27
- Error recovery in the connection-opening dialog / 12-30
- Connection opening outside of ADSP / 12-34
- Connection-listening sockets and servers / 12-35
- Connection-opening filters / 12-36
Connection closing / 12-38

## Part V End-User Services

### 13 AppleTalk Filing Protocol / 13-1

File system structure / 13-7
- File server / 13-8
- Volumes / 13-9
- Catalog node names / 13-13
- Directories and files / 13-15
- File forks / 13-22
Designating a path to a CNode / 13-23
AFP login / 13-27
File server security / 13-28
- User authentication methods / 13-28
- Volume passwords / 13-30
- Directory access control / 13-31
- File sharing modes / 13-35
  - Access modes and deny modes / 13-35
  - Synchronization rules / 13-36
- Desktop database / 13-37
- AFP's use of ASP / 13-38
- An overview of AFP calls / 13-39
  - Server calls / 13-40
  - Volume calls / 13-41
  - Directory calls / 13-42
  - File calls / 13-43
  - Combined directory-file calls / 13-43
  - Fork calls / 13-44
  - Desktop database calls / 13-45
- AFP calls / 13-46

### 14 Print Spooling Architecture / 14-1

- Printing without a spooler / 14-4
- Benefits of printing with a spooler / 14-5
- Background spoolers versus spooler/servers / 14-6
- Impact of the Macintosh on printing / 14-6
- Printing without a spooler / 14-7
- Printing with a spooler/server / 14-9
- Controlling printer access / 14-10
- User authentication dialog / 14-12
- Direct passthrough / 14-14
- Spooler/server queue management / 14-15
- About document structuring conventions / 14-18
  - About PostScript document files / 14-18
- About PostScript print jobs / 14-19
  - Comment format / 14-20
  - Syntax conventions / 14-21
- Comments in documents / 14-22
  - Prologue and script / 14-22
  - Pages / 14-23
  - Line length / 14-23
Structure comments / 14-23
- Header comments / 14-25
- Body comments / 14-28
Resource comments / 14-32
- Conventions for using resource comments / 14-32
- Definitions / 14-33
Query comments / 14-34
- Conventions for using query comments / 14-35
- Spooler responsibilities / 14-35
- Definitions / 14-36
Sample print streams / 14-41

## Appendix A LocalTalk Hardware Specifications / A-1
LocalTalk electrical characteristics / A-2
- Bit encoding and decoding / A-2
- Signal transmission and reception / A-3
- Carrier sense / A-3
Electrical/mechanical specification / A-3
- Connection module / A-4
- LocalTalk connector / A-5
- Cable connection / A-5
Transformer specifications / A-5
- Environmental conditions / A-7
- Mechanical strength and workmanship / A-8

## Appendix B LLAP Access Control Algorithms / B-1
Assumptions / B-2
Global constants, types, and variables / B-2
Hardware interface declarations / B-4
Interface procedures and functions / B-5
InitializeLLAP procedure / B-6
AcquireAddress procedure / B-7
TransmitPacket function / B-8
TransmitLinkMgmt function / B-8
TransmitFrame procedure / B-14
ReceivePacket procedure / B-15
ReceiveLinkMgmt function / B-15
ReceiveFrame function / B-17
Miscellaneous functions / B-19
SCC implementation / B-20
CRC-CCITT calculation / B-22

## Appendix C AppleTalk Parameters / C-1

LLAP parameters / C-2
AARP parameters / C-4
EtherTalk and TokenTalk parameters / C-4
DDP parameters / C-6
RTMP parameters / C-8
AEP parameters / C-9
NBP parameters / C-9
ZIP parameters / C-10
ATP parameters / C-10
PAP parameters / C-11
ASP parameters / C-12
ADSP parameters / C-13
AFP parameters / C-13

## Appendix D Character Codes / D-1

## Glossary / G-1

## Index / Index-1
### Figures and Tables

#### Introduction / I-1

Figure I-1 Network topology / I-8
Figure I-2 LocalTalk network / I-10
Figure I-3 AppleTalk internet / I-12
Figure I-4 Direct printing / I-16
Figure I-5 Printing with a spooler/server / I-17
Figure I-6 Access privileges / I-18
Figure I-7 AppleTalk protocol architecture / I-21
Figure I-8 Interfaces and protocols / I-22
Figure I-9 AppleTalk protocols and the ISO-OSI reference model / I-23

#### CHAPTER 1 LocalTalk Link Access Protocol / 1-1

Figure 1-1 Under dynamic node ID assignment, a new node tests its randomly assigned ID / 1-5
Figure 1-2 LLAP frame and packet format / 1-7
Figure 1-3 LLAP transmission dialogs / 1-12
Figure 1-4 RTS-CTS handshake during a directed data transmission / 1-14

#### CHAPTER 2 AppleTalk Address Resolution Protocol / 2-1

Figure 2-1 Multiple protocol stacks using a single link / 2-4
Figure 2-2 AARP packet formats / 2-12

#### CHAPTER 3 EtherTalk and TokenTalk Link Access Protocols / 3-1

Figure 3-1 SNAP packet format / 3-4
Figure 3-2 ELAP packet format / 3-5
Figure 3-3 TLAP packet format / 3-7
Figure 3-4 ELAP and TLAP multicast addresses / 3-10
Figure 3-5 AppleTalk-Ethernet or AppleTalk-token ring AARP packet formats / 3-12

---

#### CHAPTER 4 Datagram Delivery Protocol / 4-1

Figure 4-1 AppleTalk internet and internet routers (IRs) / 4-4
Figure 4-2 Socket terminology / 4-11
Figure 4-3 DDP packet format (short header) / 4-15
Figure 4-4 DDP packet format (extended header) / 4-16

#### CHAPTER 5 Routing Table Maintenance Protocol / 5-1

Figure 5-1 Router configurations / 5-5
Figure 5-2 Router model / 5-6
Figure 5-3 Example of a routing table / 5-9
Figure 5-4 Split horizon example / 5-11
Figure 5-5 RTMP Data packet formats / 5-14
Figure 5-6 RTMP Request and Response packet formats / 5-18
Figure 5-7 Datagram routing algorithm for a router / 5-26

#### CHAPTER 6 AppleTalk Echo Protocol / 6-1

Figure 6-1 AEP packet format / 6-3

#### CHAPTER 7 Name Binding Protocol / 7-1

Figure 7-1 NBP packet format / 7-14
Figure 7-2 NBP tuple / 7-16

#### CHAPTER 8 Zone Information Protocol / 8-1

Figure 8-1 ZIP Query and Reply packet formats / 8-12
Figure 8-2 GetZoneList and GetLocalZones request and reply
packets / 8-14
Figure 8-3 GetMyZone request and reply packets / 8-15
Figure 8-4 GetNetInfo request and supply packets / 8-17
Figure 8-5 ZIP Notify packet / 8-23

#### CHAPTER 9 AppleTalk Transaction Protocol / 9-1

Figure 9-1 Transaction terminology / 9-4
Figure 9-2 Automatic retry mechanism / 9-5
Figure 9-3 Exactly-once (XO) transactions / 9-7
Figure 9-4 Duplicate delivery of exactly-once (XO) mode / 9-8
Figure 9-5 Multipacket response example / 9-11
Figure 9-6 Use of STS / 9-13
Figure 9-7 ATP packet format / 9-14

#### CHAPTER 10 Printer Access Protocol / 10-1

Figure 10-1 Printing architecture / 10-3
Figure 10-2 Server states / 10-6
Figure 10-3 PAP OpenConn and OpenConnReply packet formats / 10-13
Figure 10-4 PAP SendData, Data, and Tickle packet formats / 10-14
Figure 10-5 PAP CloseConn and CloseConnReply packet formats / 10-14
Figure 10-6 PAP SendStatus and Status packet formats / 10-15

#### CHAPTER 11 AppleTalk Session Protocol / 11-1

Figure 11-1 ASP session-opening dialog / 11-6
Figure 11-2 Session-closing dialog initiated by the workstation / 11-7
Figure 11-3 Session-closing dialog initiated by the server / 11-8
Figure 11-4 Tickle packet dialog / 11-9
Figure 11-5 SPCommand dialog / 11-11
Figure 11-6 SPWrite dialog (error condition) / 11-12
Figure 11-7 SPWrite dialog (no error condition) / 11-13
Figure 11-8 SPAttention dialog / 11-14
Figure 11-9 SPGetStatus dialog / 11-15
Figure 11-10 ASP packet formats for OpenSess and CloseSess / 11-28
Figure 11-11 ASP packet formats for GetStatus / 11-30
Figure 11-12 ASP packet formats for Command / 11-31
Figure 11-13 ASP packet formats for Write / 11-33
Figure 11-14 ASP packet formats for WriteContinue / 11-34
Figure 11-15 ASP packet formats for Attention and Tickle / 11-35

#### CHAPTER 12 AppleTalk Data Stream Protocol / 12-1

Figure 12-1 Send and receive queues / 12-11
Figure 12-2 ADSP packet format / 12-13
Figure 12-3 ADSP data flow / 12-16
Figure 12-4 Recovery from a lost packet / 12-17
Figure 12-5 Idle connection state / 12-18
Figure 12-6 Connection torn down due to lost packets / 12-19
Figure 12-7 ADSP Attention packet format / 12-20
Figure 12-8 Connection-opening dialog initiated by one end / 12-25
Figure 12-9 Connection-opening dialog initiated by both ends / 12-26
Figure 12-10 Open-connection request denied / 12-27
Figure 12-11 Open-connection packet format / 12-29
Figure 12-12 Connection-opening dialog: packet lost / 12-30
Figure 12-13 Simultaneous connection-opening dialog: packet lost / 12-31
Figure 12-14 Connection-opening dialog: half-open connection / 12-32
Figure 12-15 Connection-opening dialog: data transmitted on half-open connection / 12-33
Figure 12-16 Connection-opening dialog: late-arriving duplicate / 12-34
Figure 12-17 Open-connection request made to connection-listening socket; alternate socket chosen for connection / 12-36
Figure 12-18 Connection-opening filters open connection denied / 12-37
Figure 12-19 Connection-opening filters with a connection-listening socket / 12-38

#### CHAPTER 13 AppleTalk Filing Protocol / 13-1

Figure 13-1 The AFP file access model / 13-5
Figure 13-2 AFP and the AppleTalk protocol architecture / 13-7
Figure 13-3 The volume catalog / 13-13
Figure 13-4 ProDOS information format / 13-18
Figure 13-5 CNode specification / 13-23
Figure 13-6 Example 1 of a volume catalog / 13-25
Table 13-1 Synchronization rules / 13-37

#### CHAPTER 14 Print Spooling Architecture / 14-1

Figure 14-1 Configuration for printing without a spooler / 14-4
Figure 14-2 Configuration for printing with a spooler/server / 14-7
Figure 14-3 Protocol architecture for printing without a spooler / 14-8
Figure 14-4 Protocol architecture for printing with a spooler/server / 14-9
Figure 14-5 Protocol architecture for alternate spooling environments / 14-11
Figure 14-6 Protocol architecture for spooler/server queue management / 14-17

#### APPENDIX A LocalTalk Hardware Specifications / A-1

Figure A-1 FM-0 encoding / A-2
Figure A-2 LocalTalk connection module / A-4
Figure A-3 Connector pin assignment (looking into the connector) / A-5
Figure A-4 Interconnecting cable connection / A-5
Figure A-5 Transformer specification / A-6
Figure A-6 Schematic and build detail / A-7

#### APPENDIX C AppleTalk Parameters / C-1

Figure C-1 LLAP type field values / C-3
Figure C-2 Zone multicast addresses / C-5
Figure C-3 DDP type field values / C-7
Figure C-4 DDP socket numbers / C-8

#### APPENDIX D Character Codes / D-1

Table D-1 Character set mapping used in AppleTalk / D-2
Table D-2 Lowercase-to-uppercase mapping in AppleTalk / D-3

## Acknowledgments

EVEN THOUGH *Inside AppleTalk* was published by Addison-Wesley as recently as early 1989, the needed evolution of technology has already made it necessary to produce a new edition! In fact, even while we were in the final editing and production stages of the first edition, our engineering teams were busy implementing a major extension of the network system, now known as AppleTalk® Phase 2. This extension was introduced in June of 1989, and its various components are now in users' hands. This second edition includes all changes made to the protocols to implement the enhanced capabilities of AppleTalk Phase 2.

It is my privilege to acknowledge the contributions of many of the finest networking engineers in the industry in this endeavour. Jim Mathis, who has been involved with network systems design since the advent of TCP (Transmission Control Protocol) in his university days at Stanford, worked with me on the early architectural design of Phase 2, critiquing and suggesting amendments to the design. The refinement and translation of that design into an actual implementation was done by a team under the leadership of Alan Oppenheimer, who is a co-author of this book. Major contributions were made by several members of Alan's staff—I would like to make special note of Sean Findley, Louise Laier, Kerry Lynn, and Mike Quinn. These engineers *par excellence* have built a new version of the system in the face of the enormous challenge of maintaining compatibility with existing AppleTalk applications. The results have been simply extraordinary. Whereas the original AppleTalk system had a size limitation of at most 254 devices connected to a single network, the new design extends this limit to approximately 16 million devices. The owner of the network system has enhanced flexibility in distributing these devices on the various networks that comprise the internet. Much care has been devoted to minimizing the use of network bandwidth for the system's internal coordination, such as routing table maintenance.

### Acknowledgments to First Edition

THE DEVELOPMENT of the AppleTalk network system spans more than a five-year period. Although the authors of *Inside AppleTalk* were the key players in the system's design, many others helped in numerous ways.

Without a doubt, the genesis of AppleTalk is to be found in the demanding and uncompromising questioning of Steve Jobs. In particular, at the National Computer Conference (NCC) in Anaheim in 1983, he asked me the key question: "Why has networking not caught on?" My awkward attempts to answer his question started us on this venture. Invention always has its instigator, and Steve played this role for AppleTalk as he has for many other wonderful products from Apple. I owe a great personal debt to him for first listening to my fervent but not yet fully formed vision of networks as empowering extensions of the personal computer and for later helping remove barriers from our developmental path.

Bob Belleville, former engineering director of the Macintosh® Division and ever a pragmatist, converted the vision into three succinct memos that put a stop to all argument on this issue at Apple. He provided a focus for this nascent activity, including the general goals for LocalTalk (then known as AppleBus), the LaserWriter® printer, and the system's file server. Although the actual products turned out considerably different from what he indicated in those memos, he summarized the target area with consummate simplicity.

The most exciting activity of the last quarter of 1983 and the first few months of 1984 was the development of the LocalTalk Link Access Protocol (LLAP). This protocol is the basis of LocalTalk and related connectivity implementations from several vendors, including PhoneNET from Farallon Computing and Fiber Optic Communication Card from Du Pont Electronics. I wish to acknowledge several colleagues at Apple who played key roles in this difficult design activity: Ron Hochsprung and Larry Kenyon for their very creative design participation, George Crow for the superb analog design of the LocalTalk hardware, and Jim Nichols for an uncompromising test harness that proved that the design was efficient and stable.

The AppleTalk protocol architecture almost did not happen. Bob Belleville proposed an external, device-interconnect bus for the then-closed Macintosh personal computer. Creating a network system was my somewhat clandestine idea; when I described the network architecture to Bob on January 24, 1984, about two hours after the Macintosh introduction, I did so with some trepidation. I am grateful to him for his forthright admission that I had made AppleTalk into something much more comprehensive than he had anticipated and for his full support!

In its early days, any new idea is tender and vulnerable. I am especially grateful to Ed Taft of Adobe Systems, one of the most widely known members of the networking community, for his very thorough review and his advice in late 1983 and early 1984. His extremely encouraging comments bolstered my own commitment to build this system; without his encouragement, compromises to "conventionalism" might have crept in.

It was all very well to have the approval of fellow designers of network systems, but the proverbial proof-is-in-the-pudding was still missing: How would users of the system respond to it? Stan Dunton and Rich Brown of Dartmouth College provided a crucial vote of confidence in early 1984 with their decision to install AppleTalk as their campus-wide system. I will be eternally grateful to Stan for standing up at the first AppleBus Developers' Conference and saying: "This is just the system we've been waiting for someone to design."

My biggest debt of gratitude is to Rich Andrews and Alan Oppenheimer, who have been my technical partners in this venture from the beginning. The credit for the outstanding reliability of the Macintosh AppleTalk drivers goes to Alan's meticulous attention to detail in writing them. They are a model of how an efficient and tight implementation of network protocols can be achieved in a difficult environment.

The elegant design of the AppleTalk Transaction Protocol (ATP) exactly-once packet exchange is the contribution of Rich Andrews. Rich listened to my somewhat unconventional ideas about not building a general stream protocol but relying instead on transactions. I then suggested at-least-once and exactly-once service. My exactly-once proposal, however, was considerably clumsier than Rich's modification, which has become integral to millions of Macintosh and LaserWriter ROMs.

One of the impressive services in the AppleTalk system is provided by the AppleShare® file server, which was many years in the making. Rich Andrews has been my partner in this venture throughout. I wish to thank him for his tremendous effort in the face of considerable adversity and public opprobrium. His persistent, dogged work toward the final AppleShare product has earned him the title of Apple Hero.

Rich and Alan join me in thanking all our colleagues in Apple's Network Systems Development (NSD) group; in particular, we would like to mention a few veterans: Pat Dirks, Bruce Gaya, Rick Hoiberg, and Gene Tyacke. Tim Warden and Steve Schwartz made significant contributions to the chapters on the AppleTalk Data Stream Protocol (ADSP) and the Printer Access Protocol (PAP), for which they have my appreciation and thanks.

Since 1985, the NSD group has enjoyed the support and encouragement of Ed Birss and Jean-Louis Gassée. Both have become strong converts to our dream of extending the power of the individual beyond the desk top.

The unsung key contributors to a system such as AppleTalk are the third-party developers who have risked their investment funds to add end-user value. They kept AppleTalk alive when many thought it was just a printer cable. I wish to acknowledge, as representative of this group, the following key entrepreneurs: Evan Solley of Infosphere for the first AppleTalk disk-server product; Andrew Singer, formerly of Think Technologies, for the InBox electronic mail service; Alex Gernert, formerly of Tri Data, for the Netway 1000 SNA connectivity server; Rob Ryan of Hayes Microcomputer Products, Inc. and Tim McCreery of Kinetics for their AppleTalk routers; Reese Jones of Farallon Computing for the PhoneNET implementation of LocalTalk service; and Bob Denny of Alisa Systems for the implementation of Apple's AppleTalk for VMS software.

Lest other good developer friends take umbrage at my not mentioning them specifically, I plead the impracticality of producing an exhaustive list; they know the depth of my gratitude—and that of the users—to all of them. This large body of third-party developers is a measure of the broad acceptance of the AppleTalk system.

Protocol specifications of the AppleTalk system have been provided to developers in several versions starting with the “AppleBus Developer's Handbook” of March 1984. It was my intention to publish it as a book, but we grossly underestimated the effort involved. It was not until August of 1988 that we assembled some of Apple’s finest editors, production editors, and desktop publishers to pull together all the pieces that comprise this book. I am indebted to Judy Bligh, editor; Judi Seip, art director; Sheila Mulligan; Ron Morton; Roy Zitting; Debbie McDaniel; Luann Rugebregt; and Patrick Ames.

Finally, I would like to dedicate this book to the patience and understanding of my wife, Elvira, who endured the many nights when I paced the floor while struggling with some protocol problem.

Gursharan S. Sidhu
November 1988

