---
title: "Introduction"
source: "C0144LLA_AppleTalk_Phase_2_Protocol_Specification_Addendum_1989"
source_url: ""
pages: "7–8"
converted: "2026-04-04"
engine: "gemini-flash"
nav_order: 1
parent: "Phase 2 Addendum"
layout: default
grand_parent: Areas
---
# Introduction

| Field | Value |
|-------|-------|
| **Source** | C0144LLA_AppleTalk_Phase_2_Protocol_Specification_Addendum_1989 |
| **Chapter** | 1 |
| **Pages** | 7–8 |
| **Converted** | 2026-04-04 |
| **Engine** | gemini-flash |

---

# Chapter 1 Introduction

THIS DOCUMENT DESCRIBES the changes to AppleTalk® protocols that are defined by AppleTalk Phase 2. AppleTalk Phase 2 provides extensions to AppleTalk addressing and enhancements to AppleTalk routing and naming services. These changes are designed to support larger AppleTalk networks while remaining compatible with current AppleTalk network hardware and software. (AppleTalk routers, however, must be upgraded to support AppleTalk Phase 2.)

Apart from the changes in AppleTalk protocols described in this document, all other aspects of the AppleTalk protocol suite remain as defined in *Inside AppleTalk*, published by Addison-Wesley. The original AppleTalk protocol suite will hereafter be referred to as *AppleTalk Phase 1*.

Since many of the changes found in AppleTalk Phase 2 involve routing and related protocols, much of this document is concerned with the role of AppleTalk routers and the issues encountered by developers of such routers. Readers who are not developing routers may not require all of this information. ■

# Goals of AppleTalk Phase 2

AppleTalk Phase 2 was designed to meet four key design goals:

* the ability to address more nodes per network than the 254 node limit of AppleTalk Phase 1
* the ability to create multiple zones per network
* improved performance in a large, heterogeneous network environment
* a smooth upgrade path from AppleTalk Phase 1 with maximum compatiblity for users

◆ *LocalTalk™ is unchanged:* The changes in AppleTalk addressing and zones defined in this document are required only for EtherTalk™ and TokenTalk™ networks. LocalTalk networks are unchanged from AppleTalk Phase 1 (with the exception of changes in routers).

Some of the changes described in this document can optionally be implemented in LocalTalk nodes to fully conform to AppleTalk Phase 2. These changes are listed in the Appendix to this document, "Changes in LocalTalk Nodes."

