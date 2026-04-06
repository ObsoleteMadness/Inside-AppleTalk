---
title: "Phase 2 Addendum"
source: "C0144LLA_AppleTalk_Phase_2_Protocol_Specification_Addendum_1989"
source_url: ""
pages: "1–6"
converted: "2026-04-04"
engine: "gemini-flash"
nav_order: 2
layout: default
has_children: true
parent: Areas
---
# Front Matter

| Field | Value |
|-------|-------|
| **Source** | C0144LLA_AppleTalk_Phase_2_Protocol_Specification_Addendum_1989 |
| **Chapter** | 0 |
| **Pages** | 1–6 |
| **Converted** | 2026-04-04 |
| **Engine** | gemini-flash |

---

![Apple Logo](images/p1-apple-logo.png)

# AppleTalk® Phase 2 Protocol Specification

## *An Addendum to Inside AppleTalk*

APDA™ # C0144LL/A

![Cover illustration featuring geometric shapes (cylinder, sphere, cone, and cube) with golden spiral overlay against a blue gradient background](images/p1-cover-illustration.png)

**Apple Computer, Inc.**
20525 Mariani Avenue
Cupertino, California 95014
(408) 996-1010
TLX 171-576

To reorder products, please call:
Apple Programmers and Developers Association
1-800-282-APDA

Copyright © 1989 by Apple Computer, Inc.
Inc.

All rights reserved. No part of this publication may be reproduced, stored in a retrieval system, or transmitted, in any form or by any means, mechanical, electronic, photocopying, recording, or otherwise, without prior written permission of Apple Computer, Inc. Printed in the United States of America.

© Apple Computer, Inc., 1989  
20525 Mariani Avenue  
Cupertino, CA 95014-6299  
(408) 996-1010

Apple, the Apple logo, AppleTalk, LaserWriter, and Macintosh are registered trademarks of Apple Computer, Inc.

EtherTalk, LocalTalk, and TokenTalk are trademarks of Apple Computer, Inc.

ITC Garamond and ITC Zapf Dingbats are registered trademarks of International Typeface Corporation.

Microsoft is a registered trademark of Microsoft Corporation.

PostScript is a registered trademark, and Illustrator is a trademark, of Adobe Systems Incorporated.

Varityper is a registered trademark, and VT600 is a trademark, of AM International, Inc.

Simultaneously published in the United States and Canada.

---

# Contents

## 1 Introduction / 1

* Goals of AppleTalk Phase 2 / 2

## 2 New Terms in AppleTalk Phase 2 / 3

* Extended AppleTalk network / 4
* Nonextended network / 4
* Provisional address / 4
* Network number startup range / 5
* Final address 5
* Network-wide broadcast / 5
* Zones list / 5
* Default zone / 5
* Zone multicast address / 5
* Zone-specific broadcast / 6
* IEEE 802.2 and SAP / 6
* SNAP / 6

## 3 Operational Overview / 7

* Obtaining a provisional address / 8
    * If no address was previously saved in pRAM / 8
    * If an address was saved in pRAM / 8
* Obtaining network information / 8
* Obtaining a valid address and zone / 9
* Operating without a router / 9
* If no router is present / 10
* When a router first comes up / 10
    * If the node's network number is in the startup range / 10
    * If the node's network number is not in the startup range / 10
    * If the node's network number is in the correct range / 11
    * If the node's network number is in neither the startup nor the correct range / 11
* When the last router goes down / 11
* Extended addressing in operation / 11

# 4 Protocol Details / 13

* AppleTalk data links / 14
  * ELAP and TLAP / 14
* AARP / 16
* DDP / 17
  * Sending packets to a router / 17
  * Support for zone multicasts / 18
  * Packet filtering / 18
  * DDP routing details / 20
  * Selecting the best router / 22
* The RTMP stub / 22
  * Aging router information / 22
  * Processing incoming RTMP packets / 22
* RTMP / 23
  * Packet formats / 23
  * Maintaining routing tables / 24
  * Split horizon / 25
  * Notify neighbor / 26
  * RTMP requests / 26
* NBP / 27
  * The THIS-ZONE variable / 27
  * Broadcast requests and forward requests / 27
  * Special characters / 28
* ATP / 28
* ZIP / 29
  * ZIP GetNetInfo and NetInfoReply / 29
  * Assignment of zone multicast addresses / 31
  * ZIP Query and Reply / 31
  * ZIP ATP requests / 33
  * Changing zone names / 33

# Appendix Changes in LocalTalk Nodes / 35
