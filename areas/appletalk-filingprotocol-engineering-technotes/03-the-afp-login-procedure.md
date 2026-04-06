---
title: "# The AFP Login Procedure"
source: "022_AppleTalkFilingProtocolEngineeringTechnicalNotes"
source_url: ""
pages: "25–26"
converted: "2026-04-04"
engine: "gemini-flash"
nav_order: 3
parent: "AFP Technical Notes"
layout: default
grand_parent: Areas
---
# # The AFP Login Procedure

| Field | Value |
|-------|-------|
| **Source** | 022_AppleTalkFilingProtocolEngineeringTechnicalNotes |
| **Chapter** | 3 |
| **Pages** | 25–26 |
| **Converted** | 2026-04-04 |
| **Engine** | gemini-flash |

---

# Chapter 3

# The AFP Login Procedure

This chapter discusses the process of discovering a file server and logging in to it.

This process consists of three steps: (i) discovering the file server, (ii) obtaining file server information, (iii) the actual log on step. Before discussing these three steps we need to establish two relevant concepts: AFP versions and user authentication methods.

## AFP Versions

As noted in the introduction, the AFP has been designed to be extensible. One of the techniques used towards this end is to associate one or more version descriptors, known as the AFPVersion with the protocol. These are strings of up to 16 characters which uniquely identify a particular version of the protocol. For instance for the version defined in the present document the AFPVersion string is "AFPVersion 1.1".

When logging in to a server the workstation must first find out which versions of AFP the server can handle. Then the workstation client of AFP selects the version it wants used on the session and indicates this in the session opening request.

## User Authentication Methods

As part of the login process, AFP optionally provides for user authentication by the server. This involves conveying to the server some information identifying and validating the user. This can be done in many different ways depending on the level of security desired.

The basic problem is to identify the user to the server (this can be done with a user name) and then verify that this is a valid user. This user verification/authentication step can be based for instance on establishing in some way that this user has a secret piece of information (we will call this a password).

For instance, the user can send the user name and the password in clear text to the server which compares them against its list of valid information. The problem with this method is that anyone listening on the network with a "peek" utility can pirate this user/password information and use it for accessing the server.

A more secure method would be to send the server just the user's name. The server then consults its data base of user authentication information and extracts from it the user password. Then it uses a scheme based on a random number modification/encoding by the password to verify if the user in fact knows this password. The password is never sent over the network; in fact the encoding is done in such a way that the password cannot be extracted from the information transmitted over the wire.

In the future we expect many other methods to be developed for authenticating users over a network. To make AFP extensible in this respect and to allow different servers to choose to implement any or all of these user authentication methods AFP expects the workstation client to obtain a list of all the user authentication methods the server handles, and then select one of these methods for the login step. The identification of user authentication methods is done by a string of up to 16 characters known as UAM. For AFP version 1.1 we describe three standard methods identified by UAM = "No User Authent", "Cleartxt passwrd", and "Randnum exchange". Details of these three methods are discussed in Appendix A.

## Discovering a File Server

As noted above, a file server implementing AFP must, upon being started up, open a session listening socket (SLS) and register its name on this socket. The name registered must have as its type part the string "AFPServer". [Note that server name string comparison is case insensitive].

Now a workstation trying to discover this or all file servers in the AppleTalk zone of interest must use NBP to lookup on the name =:AFPServer@<zone's name>. As a result of this call, the workstation client will receive, from NBP, a list of all active AFPServers in the zone together with the full internet address of the corresponding SLSs.

With this, the workstation has completed the discovery step of the login procedure. Note that so far there has been no need to open a session with any file server.

## Obtaining File Server Information

After the SLS address has been obtained in the previous step, the AFP client in the workstation issues an FPGetSrvrInfo call to obtain a variety of server information including the list of AFPVersion strings and list of UAM strings for the versions and user access methods that the server can handle.

## The Login Step

From the AFPVersion strings and UAM strings obtained in the previous step, the AFP client at this stage selects one AFPVersion string and one UAM string. These correspond to the AFP version and user authentication method the user wants the server to use. Then the user makes an FPLogin call to AFP to initiate the login step. The caller must provide the selected AFPVersion string and UAM string, and of course the internet address of the SLS of the desired file server. Further information may have to be provided depending on the user authentication method selected.

The FPLogin call causes the opening of an ASP session with the server and then an authentication of the user. If this proceeds to successful completion, then an AFP session is open with the server and futher AFP calls can be sent to the server over this session.

The server associates with the user a 32-bit User ID and one or more 32-bit Group IDs, indicating the user's membership in those groups. In addition, one Group ID may be specially marked as the user's Primary Group, to be described below.

