---
title: "# A Discussion of AFP Calls"
source: "022_AppleTalkFilingProtocolEngineeringTechnicalNotes"
source_url: ""
pages: "31–34"
converted: "2026-04-04"
engine: "gemini-flash"
nav_order: 5
parent: "AFP Technical Notes"
layout: default
grand_parent: Areas
---
# # A Discussion of AFP Calls

| Field | Value |
|-------|-------|
| **Source** | 022_AppleTalkFilingProtocolEngineeringTechnicalNotes |
| **Chapter** | 5 |
| **Pages** | 31–34 |
| **Converted** | 2026-04-04 |
| **Engine** | gemini-flash |

---

# Chapter 5

# A Discussion of AFP Calls

Now we provide an overall discussion of the various calls provided by AFP and how they can be used to access a file server. A completely detailed specification of each call is available in Chapter 7. For the purpose of this discussion we classify the calls into various groups.

## Server-Level Calls

A workstation client can use the following server-level AFP calls:

* FPGetSrvrInfo
* FPLogin
* FPLoginCont
* FPGetSrvrParms
* FPLogout
* FPMapID
* FPMapName.

To begin, a workstation uses the Name Binding Protocol to discover the server's session listening socket's network address (we call this the *SAddr*).

Next, the workstation must obtain server information by using the *FPGetSrvrInfo* call. This is done without opening a session to the server and it returns a block of server information containing the following server parameters:

* the server's name
* a string identifying the server's machine type
* a list of the AFP versions the file server can handle
* a list of the various user authentication methods the server can handle
* an icon to be used for displaying server volumes on the Macintosh.
* a bitmap of flags.

After making this call the workstation's AFP client selects one AFP version and one user authentication method. Using this selection it makes the *FPLogin* call to establish a session with the file server. A session is needed before any of the other calls can be made to the server. This login step involves authentication of the user; it returns an *SRefNum*, a session reference number to be used in all calls made over this session. Depending on the chosen authentication method, the entire authentication process may involve additional *FPLoginCont* (Login continue) calls to provide more information to the server.

After a session has been established with the server, the workstation must obtain a list of the volumes on the server. This is done by making the *FPGetSrvrParms* call, which returns a count of the number of such volumes, the names of these volumes, and an indication of whether or not these volumes are password-protected.

When a workstation no longer needs to communicate with a server it issues an *FPLogout* call to terminate the session.

The *FPMapID* and *FPMapName* calls relate to access controls issues. The *FPMapID* call is used to obtain the User or Group Name corresponding to a given User or Group ID. The *FPMapName* call provides the inverse functionality, mapping a User or Group Name into the corresponding User or Group ID.

## Volume-Level Calls

There are five volume-level AFP calls:

* *FPOpenVol*
* *FPCloseVol*
* *FPGetVolParms*
* *FPSetVolParms*
* *FPFlush.*

After obtaining the volume names through the *FPGetSrvrParms* call, the workstation client must make an *FPOpenVol* call for each volume it wishes to have access to. If the volume has a password attached to it, it must be supplied at this time. The call returns the volume parameters asked for in the call, the key one being the *VolID*. This *VolID* is used in all subsequent calls to identify the volume to which those calls apply.

The *VolID* remains a valid identifier either until the session is terminated or until an explicit *FPCloseVol* call is made. This call invalidates the *VolID*.

After obtaining a volume's *VolID* the workstation client can, at any time, obtain the volume's parameters by making an *FPGetVolParms* call. Likewise, the volume's parameters may be changed through an *FPSetVolParms* call.

A request may be made to the server to write out to its disk any data and control structures pertinent to a particular volume. This is done by making an *FPFlush* call.

## Directory-Level Calls

There are five directory-level AFP calls:

* *FPSetDirParms*
* *FPOpenDir*
* *FPCloseDir*
* *FPEnumerate*
* *FPCreateDir.*

The *FPSetDirParms* call allows the workstation client to modify a directory's parameters. The *FPGetFileDirParms* call (discussed below) is used to obtain a directory's parameters from the file server.

The *FPOpenDir* call is used to "open" a directory on a Variable-DirID volume and retrieve its *DirID*, which can then be used in subsequent calls to enumerate the directory or access its offspring. For Variable-DirID volumes, this is the only way to retrieve the *DirID* (using a *FPGetFileDirParms* or *FPEnumerate* call to retrieve the *DirID* on such volumes will return an error).

Note that it is not considered an error to make this call for directories on Fixed-DirID volumes (the fixed DirID will be returned), but this is not the preferred method. Use *FPGetFileDirParms* or *FPEnumerate* instead. Directories on variable DirID volumes can be "closed" by making an *FPCloseDir* call, which invalidates the corresponding DirID.

The *FPEnumerate* call is one of the most important AFP calls. It is used to enumerate (i.e., list) the objects (files and directories) contained within a specified directory. In reply to this call the server returns a list of directory and/or file parameters corresponding to these objects.

Directories are created through the *FPCreateDir* call.

Each of these calls requires the specification of the directory to which the call applies. This specification, in general, consists of the VolID, a DirID (of the directory or of an ancestor), and (if this DirID is of an ancestor, then) a pathname down to the specified directory. Remember that the DirID of the root of a volume is always equal to 2.

## File-Level Calls

There are three file-level calls:

* *FPSetFileParms*
* *FPCreateFile*
* *FPCopyFile*.

The *FPSetFileParms* call is used to modify a specified file's parameters. The *FPGetFileDirParms* call (discussed below) is used to obtain a specified file's parameters.

A file can be created through the *FPCreateFile* call.

A file that exists on a volume managed by a server can be copied to any other volume managed by that server with the *FPCopyFile* call.

## Combined Directory-File-Level Calls

AFP includes five calls that apply to files and directories:

* *FPGetFileDirParms*
* *FPSetFileDirParms*
* *FPRename*
* *FPDelete*
* *FPMove*.

The *FPGetFileDirParms* call is used to retrieve the parameters associated with a given object. Using this call, one need not know in advance whether the object is a file or a directory; indication of its type is returned from the call. Likewise, the *FPSetFileDirParms* call is used to set certain parameters associated with a given object, even if one does not know in advance whether the object is a file or directory. This call only allows the setting of those parameters that are common to both types of object.


The next two calls can be used to respectively rename or delete files and directories.  A file can be deleted only if it is not open; a directory can be deleted only if it is empty.

The *FPMove* call can be used to move a file or a directory from one parent directory to another on the same volume.  At the same time the object moved can be renamed.

# Fork-Level Calls

There are eight fork-level calls:

* *FPGetForkParms*
* *FPSetForkParms*
* *FPOpenFork*
* *FPCloseFork*
* *FPRead*
* *FPWrite*
* *FPFlushFork*
* *FPByteRangeLock*.

A fork's parameters can be read or modified by using the *FPGetForkParms* and *FPSetForkParms* calls.

The *FPOpenFork* call is used to open an existing file's fork (either one).  This call returns an OForkRefNum which is used in all calls that refer to this open fork.  This reference number stays valid until the fork is closed through the *FPCloseFork* call.

The four remaining calls can be used to manipulate a fork opened through a previously issued *FPOpenFork* call.  The contents of the fork can be read by making *FPRead* calls.  The client can write to a fork by using *FPWrite* calls.  The *FPFlushFork* call makes the server flush (write out to its disk) any of that fork's data that is in the server's internal buffers.

To allow for shared use of a file's open fork, a client can lock ranges of bytes in that fork.  If a client locks a particular byte range (through the *FPByteRangeLock* call) then that range of bytes is reserved for exclusive manipulation by the client placing the lock; other clients can neither read nor write within the locked range.

